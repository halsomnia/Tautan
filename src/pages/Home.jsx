import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { catalogs } from "../data/catalogs"
import "./Home.css"

const chips = ["Semua", "Nikah", "Lamaran", "Ultah", "Syukuran"]
const categories = chips.slice(1)
const WA = "https://wa.me/6285163501302"

function formatPrice(n) {
  return `${Math.round(n / 1000)}rb`
}

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState("")
  const [chip, setChip] = useState("Semua")
  const [menu, setMenu] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light"
    localStorage.setItem("theme", theme)
  }, [theme])

  const counts = useMemo(() => {
    const out = {}
    catalogs.filter((c) => c.active).forEach((c) => {
      out[c.category] = (out[c.category] || 0) + 1
    })
    return out
  }, [])

  const items = useMemo(() => {
    const key = q.trim().toLowerCase()
    const chipKey = chip.toLowerCase()
    return catalogs.filter((c) => {
      if (!c.active) return false
      const hay = `${c.name} ${c.desc} ${c.category} ${c.style}`.toLowerCase()
      if (key && !hay.includes(key)) return false
      if (chipKey !== "semua" && c.category !== chipKey) return false
      return true
    })
  }, [q, chip])

  function pickCategory(name) {
    setChip(name)
    setMenu(false)
  }

  return (
    <div className="home">
      <header className="home-head">
        <div className="word">tautan</div>
        <button className="burger" type="button" onClick={() => setMenu(true)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>
      <p className="tag">Pilih tema. Isi data. Kami kirim tautannya.</p>
      <input
        className="search"
        placeholder="Cari tema, kategori, gaya…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="chips">
        {chips.map((c) => (
          <button key={c} className={chip === c ? "chip on" : "chip"} onClick={() => setChip(c)} type="button">
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {items.map((c) => (
          <article key={c.id} className="card" onClick={() => navigate(`/studio/${c.id}`)}>
            <div className="thumb" style={{ background: c.thumb }} />
            <div className="meta">
              <div className="row1">
                <span className="name">{c.name}</span>
                <span className="cat">{c.category}</span>
              </div>
              <p className="desc">{c.desc}</p>
              <div className="price">
                {c.promoPrice ? <span className="old">{formatPrice(c.promoPrice)}</span> : null}
                <span className="now">{formatPrice(c.price)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {menu && (
        <div className="nav">
          <button className="nav-dim" type="button" onClick={() => setMenu(false)} />
          <aside className="drawer">
            <div className="word">tautan</div>
            <p className="h">Kategori</p>
            {categories.map((name) => (
              <button
                key={name}
                className={chip === name ? "nav-item on" : "nav-item"}
                type="button"
                onClick={() => pickCategory(name)}
              >
                {name}
                <span>{counts[name.toLowerCase()] || 0}</span>
              </button>
            ))}
            <p className="h">Bantuan</p>
            <a className="wa" href={WA} target="_blank" rel="noreferrer">Chat WhatsApp</a>
            <p className="h">Tentang</p>
            <p className="about">Pilih tema, isi data, kami kirim tautan setelah bayar.</p>
            <div className="nav-foot">
              <span>{theme === "dark" ? "Tampilan gelap" : "Tampilan terang"}</span>
              <button
                className={theme === "dark" ? "tog on" : "tog"}
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Ganti tampilan"
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}