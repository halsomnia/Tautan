import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getCatalog } from "../data/catalogs"
import { demoInvite } from "../data/demoInvite"
import { revokePhoto } from "../lib/photos"
import HitamPutih from "../themes/hitam-putih/HitamPutih"
import Vintage from "../themes/vintage/Vintage"
import "./Studio.css"

const DRAFT_KEY = (id) => `tautan-draft-${id}`
const emptyPhotos = () => ({ cover: null, pria: null, wanita: null, gallery: [null, null, null, null] })
const themes = { "hitam-putih": HitamPutih, vintage: Vintage }

export default function Studio() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const tema = useMemo(() => getCatalog(id), [id])
  const previewRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [pick, setPick] = useState(null)
  const [orderOpen, setOrderOpen] = useState(false)
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
    } catch { /* ignore */ }
  }, [tema, params])

  useEffect(() => {
    if (!tema) return
    localStorage.setItem(DRAFT_KEY(tema.id), JSON.stringify({ invite, palette, font, song }))
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

  function setField(key, value) {
    setInvite((cur) => ({ ...cur, [key]: value }))
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
  }

  function pickPalette(i) {
    setPalette(i)
    setFont(tema.palettes[i].font ?? font)
    setPick(null)
  }

  function submitOrder() {
    if (!invite.pria.trim() || !invite.wanita.trim()) {
      setNote("Isi nama pasangan dulu. Tekan Edit.")
      return
    }
    if (!order.pemesan.trim() || !order.wa.trim()) {
      setNote("Isi nama pemesan dan WhatsApp.")
      return
    }
    setNote("Pesanan siap. Admin akan menghubungi via WA.")
  }

  function handleRsvp(key, value) {
    if (key === "kirim") {
      setRsvp((cur) => ({
        ...cur,
        note: cur.nama.trim() ? "Ucapan tersimpan di pratinjau." : "Isi nama dulu.",
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
  const ThemeView = themes[tema.id] || HitamPutih

  return (
    <div className="studio">
      <header className="studio-bar">
        <Link to="/" className="back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <span className="word">{tema.name}</span>
        <span className="bar-spacer" />
      </header>

      <div className="preview-wrap" ref={previewRef} style={themeStyle}>
        <ThemeView
          invite={invite}
          photos={photos}
          onPhoto={handlePhoto}
          onField={setField}
          open={open}
          onOpen={() => setOpen(true)}
          editing={editing}
          rsvp={rsvp}
          onRsvp={handleRsvp}
        />
      </div>

      <div className="studio-dock">
        {editing && pick && (
          <div className="float-picks">
            {pick === "warna" && tema.palettes.map((p, i) => (
              <button key={p.id} className={i === palette ? "pal on" : "pal"} type="button" onClick={() => pickPalette(i)}>
                <i style={{ background: p.colors.ink }} />
                <i style={{ background: p.colors.accent }} />
                <i style={{ background: p.colors.bg }} />
                <span>{p.name}</span>
              </button>
            ))}
            {pick === "huruf" && tema.fonts.map((f, i) => (
              <button key={f.id} className={i === font ? "pill on" : "pill"} type="button" onClick={() => { setFont(i); setPick(null) }}>
                {f.name}
              </button>
            ))}
            {pick === "lagu" && tema.songs.map((s, i) => (
              <button key={s.id} className={i === song ? "pill on" : "pill"} type="button" onClick={() => { setSong(i); setPick(null) }}>
                {s.name}
              </button>
            ))}
          </div>
        )}

        {editing && (
          <div className="tools">
            <button className={pick === "warna" ? "tool on" : "tool"} type="button" onClick={() => setPick(pick === "warna" ? null : "warna")}>
              <span className="material-symbols-outlined">palette</span>
            </button>
            <button className={pick === "huruf" ? "tool on" : "tool"} type="button" onClick={() => setPick(pick === "huruf" ? null : "huruf")}>
              <span className="material-symbols-outlined">title</span>
            </button>
            <button className={pick === "lagu" ? "tool on" : "tool"} type="button" onClick={() => setPick(pick === "lagu" ? null : "lagu")}>
              <span className="material-symbols-outlined">music_note</span>
            </button>
          </div>
        )}

        {orderOpen && !editing && (
          <div className="sheet">
            <div className="sheet-head">
              <span>Order · {price}</span>
              <button type="button" className="close" onClick={() => setOrderOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="sum">{tema.name} · {tema.palettes[palette].name} · {tema.fonts[font].name} · {tema.songs[song].name}</p>
            <input value={order.pemesan} onChange={(e) => setOrder((o) => ({ ...o, pemesan: e.target.value }))} placeholder="Nama pemesan" />
            <input value={order.wa} onChange={(e) => setOrder((o) => ({ ...o, wa: e.target.value }))} placeholder="Nomor WhatsApp" inputMode="tel" />
            <button type="button" className="order-send" onClick={submitOrder}>Kirim pesanan</button>
            {note && <p className="note">{note}</p>}
          </div>
        )}

        <div className="bar">
          <button
            type="button"
            className={editing ? "edit on" : "edit"}
            onClick={() => {
              if (editing) { setEditing(false); setPick(null) }
              else { setOpen(true); setOrderOpen(false); setEditing(true); setNote("") }
            }}
          >
            {editing ? "Selesai" : "Edit"}
          </button>
          <button
            type="button"
            className="order"
            disabled={editing}
            onClick={() => { setNote(""); setOrderOpen((v) => !v) }}
          >
            Order · {price}
          </button>
        </div>
      </div>
    </div>
  )
}
