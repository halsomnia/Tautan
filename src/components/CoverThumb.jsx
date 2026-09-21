import "./CoverThumb.css"

export default function CoverThumb({ name = "Hitam Putih", couple = "Alya & Raka" }) {
  return (
    <div className="thumb-cover" aria-hidden="true">
      <span className="thumb-kicker">The wedding of</span>
      <strong>{couple}</strong>
      <em>{name}</em>
      <span className="thumb-frame" />
    </div>
  )
}
