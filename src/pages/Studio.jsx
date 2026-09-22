import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getCatalog } from "../data/catalogs"
import { demoInvite } from "../data/demoInvite"
import { revokePhoto } from "../lib/photos"
import HitamPutih from "../themes/hitam-putih/HitamPutih"
import "./Studio.css"

const DRAFT_KEY = (id) => `bersemi-draft-${id}`
const emptyPhotos = () => ({ cover: null, pria: null, wanita: null, gallery: [null, null, null, null] })

export default function Studio() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const tema = useMemo(() => getCatalog(id), [id])
  const audioRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [pick, setPick] = useState(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const [muted, setMuted] = useState(false)
  const [palette, setPalette] = useState(0)
  const [font, setFont] = useState(0)
  const [invite, setInvite] = useState(() => ({
    ...demoInvite,
    guest: params.get("to") || demoInvite.guest,
  }))
  const [photos, setPhotos] = useState(emptyPhotos)
  const [order, setOrder] = useState({ pemesan: "", wa: "" })
  const [note, setNote] = useState("")
  const [pop, setPop] = useState(null)
  const [draft, setDraft] = useState({})
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
      const d = JSON.parse(raw)
      if (d.invite) setInvite((cur) => ({ ...cur, ...d.invite, guest: params.get("to") || d.invite.guest || cur.guest }))
      if (typeof d.palette === "number") setPalette(d.palette)
      if (typeof d.font === "number") setFont(d.font)
    } catch { /* ignore */ }
  }, [tema, params])

  useEffect(() => {
    if (!tema) return
    localStorage.setItem(DRAFT_KEY(tema.id), JSON.stringify({ invite, palette, font }))
  }, [tema, invite, palette, font])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (open && !muted) a.play().catch(() => {})
    else a.pause()
  }, [open, muted])

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

  function handlePhoto(slot, file, index) {
    setPhotos((cur) => {
      if (slot === "gallery") {
        if (cur.gallery[index]) revokePhoto(cur.gallery[index])
        const gallery = [...cur.gallery]
        gallery[index] = file
        return { ...cur, gallery }
      }
      if (cur[slot]) revokePhoto(cur[slot])
      return { ...cur, [slot]: file }
    })
  }

  function openPop(spec) {
    const values = {}
    spec.fields.forEach((f) => { values[f.key] = invite[f.key] ?? "" })
    setDraft(values)
    setPop(spec)
  }

  function savePop() {
    setInvite((cur) => ({ ...cur, ...draft }))
    setPop(null)
  }

  function submitOrder() {
    if (!invite.pria.trim() || !invite.wanita.trim()) {
      setNote("Lengkapi nama pasangan lewat Edit.")
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
      setRsvp((cur) => ({ ...cur, note: cur.nama.trim() ? "Ucapan tersimpan di pratinjau." : "Isi nama dulu." }))
      return
    }
    setRsvp((cur) => ({ ...cur, [key]: value, note: "" }))
  }

  if (!tema) {
    return (
      <div className="studio missing">
        <p>Tema tidak ada.</p>
        <Link to="/">Kembali</Link>
      </div>
    )
  }

  const price = `${Math.round(tema.price / 1000)}rb`
  const musicSrc = `${import.meta.env.BASE_URL}music/hitam-putih.mp3`

  return (
    <div className="studio">
      <audio ref={audioRef} src={musicSrc} loop preload="none" />

      <Link to="/" className="float-back" aria-label="Kembali">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
      {open && (
        <button type="button" className="float-music" onClick={() => setMuted((m) => !m)} aria-label="Musik">
          <span className="material-symbols-outlined">{muted ? "volume_off" : "music_note"}</span>
        </button>
      )}

      <div className="preview-wrap" style={themeStyle}>
        <HitamPutih
          invite={invite}
          photos={photos}
          onPhoto={handlePhoto}
          onEdit={openPop}
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
              <button key={p.id} className={i === palette ? "pal on" : "pal"} type="button" onClick={() => { setPalette(i); setFont(p.font ?? font); setPick(null) }}>
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
            <p className="sum">{tema.name} · {tema.palettes[palette].name} · {tema.fonts[font].name}</p>
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
              if (editing) { setEditing(false); setPick(null); setPop(null) }
              else { setOpen(true); setOrderOpen(false); setEditing(true) }
            }}
          >
            {editing ? "Selesai" : "Edit"}
          </button>
          <button type="button" className="order" disabled={editing} onClick={() => { setNote(""); setOrderOpen((v) => !v) }}>
            Order
          </button>
        </div>
      </div>

      {pop && (
        <div className="pop-wrap">
          <button className="pop-dim" type="button" onClick={() => setPop(null)} />
          <div className="pop">
            <h3>{pop.title}</h3>
            {pop.fields.map((f) => (
              <label key={f.key}>
                {f.label}
                {f.type === "textarea" ? (
                  <textarea value={draft[f.key] || ""} onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))} rows={4} />
                ) : (
                  <input type={f.type || "text"} value={draft[f.key] || ""} onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))} />
                )}
              </label>
            ))}
            <button type="button" className="pop-save" onClick={savePop}>Simpan</button>
          </div>
        </div>
      )}
    </div>
  )
}
