import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { catalogs } from "../data/catalogs"
import "./Studio.css"

export default function Studio() {
  const { id } = useParams()
  const tema = catalogs.find((c) => c.id === id)

  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("warna")
  const [palette, setPalette] = useState(0)
  const [font, setFont] = useState(0)
  const [song, setSong] = useState(0)
  const [panel, setPanel] = useState("opsi")
  const [note, setNote] = useState("")
  const [form, setForm] = useState({
    pria: "Yudi",
    wanita: "Sari",
    tanggal: "Sabtu, 12 Desember 2026",
    akad: "10.00 WIB · Masjid",
    resepsi: "12.00 WIB · Gedung",
    pemesan: "",
    wa: "",
  })

  if (!tema) {
    return (
      <div className="studio">
        <p>Tema tidak ada.</p>
        <Link to="/">Kembali</Link>
      </div>
    )
  }

  const pal = tema.palettes[palette]
  const fn = tema.fonts[font]
  const price = `${Math.round(tema.price / 1000)}rb`

  const themeStyle = useMemo(
    () => ({
      "--bg": pal.colors.bg,
      "--surface": pal.colors.surface,
      "--ink": pal.colors.ink,
      "--accent": pal.colors.accent,
      "--mute": pal.colors.mute,
      "--title": fn.title,
      "--body": fn.body,
    }),
    [pal, fn]
  )

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function pickPalette(i) {
    setPalette(i)
    setFont(tema.palettes[i].font ?? 0)
  }

  function submitOrder() {
    if (!form.pria.trim() || !form.wanita.trim()) {
      setNote("Isi nama pasangan dulu.")
      setPanel("isi")
      return
    }
    if (!form.pemesan.trim() || !form.wa.trim()) {
      setNote("Isi nama pemesan dan WhatsApp.")
      setPanel("order")
      return
    }
    setNote("Pesanan siap. Nanti masuk admin.")
  }

  return (
    <div className="studio" style={themeStyle}>
      <header className="studio-bar">
        <Link to="/" className="back">← {tema.name}</Link>
        <span className="word">tautan</span>
      </header>

      {!open ? (
        <div className="cover">
          <p className="to">Kepada Yth. Bapak/Ibu</p>
          <h1>{form.pria} &amp; {form.wanita}</h1>
          <button type="button" className="open" onClick={() => setOpen(true)}>
            Buka undangan
          </button>
        </div>
      ) : (
        <div className={"invite" + (panel === "mini" ? " tall" : "")}>
          <p className="kicker">The wedding of</p>
          <h2>{form.pria} &amp; {form.wanita}</h2>
          <p>{form.tanggal}</p>
          <div className="block">
            <b>Akad</b>
            <p>{form.akad}</p>
          </div>
          <div className="block">
            <b>Resepsi</b>
            <p>{form.resepsi}</p>
          </div>
          <p className="song">Lagu: {tema.songs[song].name}</p>
        </div>
      )}

      {open && (
        <div className={"dock" + (panel === "mini" ? " mini" : "")}>
          <button className="chev" type="button" onClick={() => setPanel(panel === "mini" ? "opsi" : "mini")}>
            {panel === "mini" ? "▴" : "▾"}
          </button>

          {panel !== "mini" && (
            <>
              <div className="opts">
                <button className={tab === "warna" ? "opt on" : "opt"} onClick={() => { setTab("warna"); setPanel("opsi") }}>Warna</button>
                <button className={tab === "huruf" ? "opt on" : "opt"} onClick={() => { setTab("huruf"); setPanel("opsi") }}>Huruf</button>
                <button className={tab === "lagu" ? "opt on" : "opt"} onClick={() => { setTab("lagu"); setPanel("opsi") }}>Lagu</button>
              </div>

              {panel === "opsi" && tab === "warna" && (
                <div className="pals">
                  {tema.palettes.map((p, i) => (
                    <button key={p.id} className={i === palette ? "pal on" : "pal"} onClick={() => pickPalette(i)} type="button" title={p.name}>
                      <i style={{ background: p.colors.ink }} />
                      <i style={{ background: p.colors.accent }} />
                      <i style={{ background: p.colors.bg }} />
                    </button>
                  ))}
                </div>
              )}

              {panel === "opsi" && tab === "huruf" && (
                <div className="pals">
                  {tema.fonts.map((f, i) => (
                    <button key={f.id} className={i === font ? "pill on" : "pill"} onClick={() => setFont(i)} type="button">
                      {f.name}
                    </button>
                  ))}
                </div>
              )}

              {panel === "opsi" && tab === "lagu" && (
                <div className="pals">
                  {tema.songs.map((s, i) => (
                    <button key={s.id} className={i === song ? "pill on" : "pill"} onClick={() => setSong(i)} type="button">
                      {s.name}
                    </button>
                  ))}
                </div>
              )}

              {panel === "isi" && (
                <div className="fields">
                  <input value={form.pria} onChange={(e) => setField("pria", e.target.value)} placeholder="Nama pria" />
                  <input value={form.wanita} onChange={(e) => setField("wanita", e.target.value)} placeholder="Nama wanita" />
                  <input value={form.tanggal} onChange={(e) => setField("tanggal", e.target.value)} placeholder="Tanggal" />
                  <input value={form.akad} onChange={(e) => setField("akad", e.target.value)} placeholder="Akad" />
                  <input value={form.resepsi} onChange={(e) => setField("resepsi", e.target.value)} placeholder="Resepsi" />
                </div>
              )}

              {panel === "order" && (
                <div className="fields">
                  <input value={form.pemesan} onChange={(e) => setField("pemesan", e.target.value)} placeholder="Nama pemesan" />
                  <input value={form.wa} onChange={(e) => setField("wa", e.target.value)} placeholder="Nomor WhatsApp" />
                </div>
              )}

              {note && <p className="note">{note}</p>}
            </>
          )}

          <div className="actions">
            <button className={panel === "isi" ? "ghost on" : "ghost"} type="button" onClick={() => setPanel(panel === "isi" ? "opsi" : "isi")}>
              Isi
            </button>
            <button className="order" type="button" onClick={() => { setNote(""); panel === "order" ? submitOrder() : setPanel("order") }}>
              {panel === "order" ? "Kirim · " + price : "Order · " + price}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}