import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import PhotoSlot from "../components/PhotoSlot"
import { getCatalog } from "../data/catalogs"
import { ayatOptions, demoInvite } from "../data/demoInvite"
import { revokePhoto } from "../lib/photos"
import HitamPutih from "../themes/hitam-putih/HitamPutih"
import "./Studio.css"

const DRAFT_KEY = (id) => `tautan-draft-${id}`

const emptyPhotos = () => ({ cover: null, pria: null, wanita: null, gallery: [null, null, null, null] })

export default function Studio() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const tema = useMemo(() => getCatalog(id), [id])
  const previewRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState(null)
  const [tab, setTab] = useState("tampilan")
  const [palette, setPalette] = useState(0)
  const [font, setFont] = useState(0)
  const [song, setSong] = useState(0)
  const [invite, setInvite] = useState(() => ({
    ...demoInvite,
    guest: params.get("to") || demoInvite.guest,
  }))
  const [photos, setPhotos] = useState(emptyPhotos)
  const [order, setOrder] = useState({ pemesan: "", wa: "" })
  const [note, setNote] = useState("")
  const [rsvp, setRsvp] = useState({ hadir: null, nama: "", ucapan: "", note: "" })

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    document.documentElement.dataset.theme = saved === "dark" ? "dark" : "light"
  }, [])

  useEffect(() => {
    if (!tema) return
    const raw = localStorage.getItem(DRAFT_KEY(tema.id))
    if (!raw) return
    try {
      const draft = JSON.parse(raw)
      if (draft.invite) setInvite((cur) => ({ ...cur, ...draft.invite, guest: params.get("to") || draft.invite.guest || cur.guest }))
      if (typeof draft.palette === "number") setPalette(draft.palette)
      if (typeof draft.font === "number") setFont(draft.font)
      if (typeof draft.song === "number") setSong(draft.song)
    } catch {
      /* draft rusak, abaikan */
    }
  }, [tema, params])

  useEffect(() => {
    if (!tema) return
    localStorage.setItem(DRAFT_KEY(tema.id), JSON.stringify({
      invite,
      palette,
      font,
      song,
    }))
  }, [tema, invite, palette, font, song])

  const pal = tema?.palettes[palette] ?? tema?.palettes[0]
  const fn = tema?.fonts[font] ?? tema?.fonts[0]

  const themeStyle = useMemo(() => {
    if (!pal || !fn) return undefined
    return {
      "--bg": pal.colors.bg,
      "--surface": pal.colors.surface,
      "--ink": pal.colors.ink,
      "--accent": pal.colors.accent,
      "--mute": pal.colors.mute,
      "--line": pal.colors.line,
      "--overlay": pal.colors.overlay,
      "--display": fn.display,
      "--title": fn.title,
      "--body": fn.body,
    }
  }, [pal, fn])

  function scrollTo(section) {
    const root = previewRef.current
    if (!root) return
    const el = root.querySelector(`[data-section="${section}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function setField(key, value) {
    setInvite((cur) => ({ ...cur, [key]: value }))
  }

  function setFeature(key, value) {
    setInvite((cur) => ({ ...cur, features: { ...cur.features, [key]: value } }))
  }

  function setAyat(type) {
    if (type === "none") {
      setFeature("ayat", false)
      return
    }
    const pack = ayatOptions[type]
    setInvite((cur) => ({
      ...cur,
      ayatType: type,
      features: { ...cur.features, ayat: true },
      ayatRef: pack.ref,
      ayat: pack.text,
    }))
    scrollTo("ayat")
  }

  function handlePhoto(slot, file, index) {
    setPhotos((cur) => {
      if (slot === "gallery") {
        const prev = cur.gallery[index]
        if (prev) revokePhoto(prev)
        const gallery = [...cur.gallery]
        gallery[index] = file
        return { ...cur, gallery }
      }
      if (cur[slot]) revokePhoto(cur[slot])
      return { ...cur, [slot]: file }
    })
    if (slot === "cover") scrollTo("cover")
    if (slot === "pria" || slot === "wanita") scrollTo("mempelai")
    if (slot === "gallery") scrollTo("galeri")
  }

  function openPanel(name) {
    setNote("")
    setPanel(name)
    if (name === "edit") setOpen(true)
  }

  function submitOrder() {
    if (!invite.pria.trim() || !invite.wanita.trim()) {
      setNote("Isi nama pasangan dulu.")
      setPanel("edit")
      setTab("isi")
      return
    }
    if (!order.pemesan.trim() || !order.wa.trim()) {
      setNote("Isi nama pemesan dan WhatsApp.")
      setPanel("order")
      return
    }
    setNote("Pesanan disimpan di draf. Kirim ke server menyusul bersama Supabase.")
  }

  function handleRsvp(key, value) {
    if (key === "kirim") {
      setRsvp((cur) => ({
        ...cur,
        note: cur.nama.trim() ? "Ucapan tersimpan di pratinjau. Pengiriman menyusul." : "Isi nama dulu.",
      }))
      return
    }
    setRsvp((cur) => ({ ...cur, [key]: value, note: "" }))
  }

  if (!tema) {
    return (
      <div className="studio missing">
        <p>Tema tidak ada.</p>
        <Link to="/">Kembali ke katalog</Link>
      </div>
    )
  }

  const price = `${Math.round(tema.price / 1000)}rb`
  const ThemeView = tema.id === "hitam-putih" ? HitamPutih : HitamPutih

  return (
    <div className="studio">
      <header className="studio-bar">
        <Link to="/" className="back">← Katalog</Link>
        <span className="word">{tema.name}</span>
      </header>

      <div className="preview-wrap" ref={previewRef} style={themeStyle}>
        <ThemeView
          invite={invite}
          photos={photos}
          onPhoto={handlePhoto}
          open={open}
          onOpen={() => setOpen(true)}
          editing={panel === "edit"}
          rsvp={rsvp}
          onRsvp={handleRsvp}
        />
      </div>

      <div className="studio-dock">
        {panel === "edit" && (
          <div className="sheet">
            <div className="sheet-head">
              <span>Personalisasi</span>
              <button type="button" className="close" onClick={() => setPanel(null)} aria-label="Tutup">Tutup</button>
            </div>
            <div className="tabs">
              {[
                ["tampilan", "Tampilan"],
                ["isi", "Isi"],
                ["fitur", "Fitur"],
              ].map(([key, label]) => (
                <button key={key} className={tab === key ? "tab on" : "tab"} type="button" onClick={() => setTab(key)}>
                  {label}
                </button>
              ))}
            </div>

            {tab === "tampilan" && (
              <div className="sheet-body">
                <p className="lbl">Warna</p>
                <div className="pals">
                  {tema.palettes.map((p, i) => (
                    <button
                      key={p.id}
                      className={i === palette ? "pal on" : "pal"}
                      type="button"
                      onClick={() => setPalette(i)}
                    >
                      <i style={{ background: p.colors.ink }} />
                      <i style={{ background: p.colors.accent }} />
                      <i style={{ background: p.colors.bg }} />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
                <p className="lbl">Huruf</p>
                <div className="pills">
                  {tema.fonts.map((f, i) => (
                    <button key={f.id} className={i === font ? "pill on" : "pill"} type="button" onClick={() => setFont(i)}>
                      {f.name}
                    </button>
                  ))}
                </div>
                <p className="lbl">Lagu</p>
                <div className="pills">
                  {tema.songs.map((s, i) => (
                    <button key={s.id} className={i === song ? "pill on" : "pill"} type="button" onClick={() => setSong(i)}>
                      {s.name}
                    </button>
                  ))}
                </div>
                <p className="hint">Pemutar lagu menyusul. Pilihan ini tersimpan di draf.</p>
              </div>
            )}

            {tab === "isi" && (
              <div className="sheet-body fields">
                <p className="lbl">Nama di sampul</p>
                <input value={invite.wanita} onChange={(e) => { setField("wanita", e.target.value); scrollTo("cover") }} placeholder="Nama wanita" />
                <input value={invite.pria} onChange={(e) => { setField("pria", e.target.value); scrollTo("cover") }} placeholder="Nama pria" />
                <input value={invite.guest} onChange={(e) => setField("guest", e.target.value)} placeholder="Nama tamu" />
                <p className="lbl">Mempelai</p>
                <input value={invite.wanitaLengkap} onChange={(e) => { setField("wanitaLengkap", e.target.value); scrollTo("mempelai") }} placeholder="Nama lengkap wanita" />
                <input value={invite.ayahWanita} onChange={(e) => setField("ayahWanita", e.target.value)} placeholder="Ayah wanita" />
                <input value={invite.ibuWanita} onChange={(e) => setField("ibuWanita", e.target.value)} placeholder="Ibu wanita" />
                <input value={invite.priaLengkap} onChange={(e) => { setField("priaLengkap", e.target.value); scrollTo("mempelai") }} placeholder="Nama lengkap pria" />
                <input value={invite.ayahPria} onChange={(e) => setField("ayahPria", e.target.value)} placeholder="Ayah pria" />
                <input value={invite.ibuPria} onChange={(e) => setField("ibuPria", e.target.value)} placeholder="Ibu pria" />
                <p className="lbl">Acara</p>
                <input type="date" value={invite.tanggal} onChange={(e) => { setField("tanggal", e.target.value); scrollTo("acara") }} />
                <input value={invite.hariLabel} onChange={(e) => setField("hariLabel", e.target.value)} placeholder="Hari, misalnya Sabtu" />
                <input value={invite.waktuAkad} onChange={(e) => setField("waktuAkad", e.target.value)} placeholder="Waktu akad" />
                <input value={invite.tempatAkad} onChange={(e) => setField("tempatAkad", e.target.value)} placeholder="Tempat akad" />
                <input value={invite.alamatAkad} onChange={(e) => setField("alamatAkad", e.target.value)} placeholder="Alamat akad" />
                <input value={invite.waktuResepsi} onChange={(e) => setField("waktuResepsi", e.target.value)} placeholder="Waktu resepsi" />
                <input value={invite.tempatResepsi} onChange={(e) => setField("tempatResepsi", e.target.value)} placeholder="Tempat resepsi" />
                <input value={invite.alamatResepsi} onChange={(e) => setField("alamatResepsi", e.target.value)} placeholder="Alamat resepsi" />
              </div>
            )}

            {tab === "fitur" && (
              <div className="sheet-body">
                <p className="lbl">Foto sampul</p>
                <PhotoSlot
                  label="Foto sampul"
                  ratio="4 / 5"
                  photo={photos.cover}
                  onChange={(file) => handlePhoto("cover", file)}
                  hint="Dipampatkan di perangkat. Unggah server menyusul."
                />
                <p className="lbl">Ayat</p>
                <div className="pills">
                  {[
                    ["islami", "Islami"],
                    ["kristiani", "Kristiani"],
                    ["umum", "Umum"],
                    ["none", "Sembunyikan"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className={(key === "none" ? !invite.features.ayat : invite.features.ayat && invite.ayatType === key) ? "pill on" : "pill"}
                      onClick={() => setAyat(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <label className="switch">
                  <input type="checkbox" checked={invite.features.gallery} onChange={(e) => setFeature("gallery", e.target.checked)} />
                  Galeri
                </label>
                <label className="switch">
                  <input type="checkbox" checked={invite.features.envelope} onChange={(e) => setFeature("envelope", e.target.checked)} />
                  Amplop digital
                </label>
                <label className="switch">
                  <input type="checkbox" checked={invite.features.rsvp} onChange={(e) => setFeature("rsvp", e.target.checked)} />
                  RSVP &amp; ucapan
                </label>
                {invite.features.envelope && (
                  <>
                    <p className="lbl">Rekening</p>
                    <div className="fields">
                      <input value={invite.bankNama} onChange={(e) => setField("bankNama", e.target.value)} placeholder="Bank" />
                      <input value={invite.bankRek} onChange={(e) => setField("bankRek", e.target.value)} placeholder="Nomor rekening" />
                      <input value={invite.bankAn} onChange={(e) => setField("bankAn", e.target.value)} placeholder="Atas nama" />
                    </div>
                  </>
                )}
                <p className="hint">Foto belum dikirim ke server. Setelah Supabase siap, slot ini yang dipakai.</p>
              </div>
            )}
          </div>
        )}

        {panel === "order" && (
          <div className="sheet">
            <div className="sheet-head">
              <span>Order · {price}</span>
              <button type="button" className="close" onClick={() => setPanel(null)} aria-label="Tutup">Tutup</button>
            </div>
            <div className="sheet-body fields">
              <p className="sum">{tema.name} · {tema.palettes[palette].name} · {tema.fonts[font].name} · {tema.songs[song].name}</p>
              <input value={order.pemesan} onChange={(e) => setOrder((o) => ({ ...o, pemesan: e.target.value }))} placeholder="Nama pemesan" />
              <input value={order.wa} onChange={(e) => setOrder((o) => ({ ...o, wa: e.target.value }))} placeholder="Nomor WhatsApp" inputMode="tel" />
              <button type="button" className="order-send" onClick={submitOrder}>Simpan pesanan</button>
              {note && <p className="note">{note}</p>}
            </div>
          </div>
        )}

        <div className="bar">
          <button type="button" className={panel === "edit" ? "ghost on" : "ghost"} onClick={() => openPanel(panel === "edit" ? null : "edit")}>
            Personalisasi
          </button>
          <button type="button" className="order" onClick={() => openPanel(panel === "order" ? null : "order")}>
            Order · {price}
          </button>
        </div>
      </div>
    </div>
  )
}
