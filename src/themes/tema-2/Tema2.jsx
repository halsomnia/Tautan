import Countdown from "../../components/Countdown"
import EditDot from "../../components/EditDot"
import PhotoSlot from "../../components/PhotoSlot"
import { formatTanggalPanjang } from "../../data/demoInvite"
import "./Tema2.css"

function mapsUrl(place, address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} ${address}`)}`
}

function igUrl(handle) {
  const h = (handle || "").replace(/^@/, "")
  return h ? `https://instagram.com/${h}` : "#"
}

function Slot({ editing, photo, onChange, label, className, ratio = "3 / 4" }) {
  if (editing) {
    return <PhotoSlot label={label} photo={photo} onChange={onChange} ratio={ratio} />
  }
  if (photo?.url) {
    return <div className={className}><img src={photo.url} alt="" /></div>
  }
  return <div className={`${className} empty`}>{label}</div>
}

export default function Tema2({
  invite,
  photos,
  onPhoto,
  onEdit = () => {},
  open,
  onOpen,
  editing = false,
  rsvp,
  onRsvp,
  wishes = [],
  wishForm,
  onWish,
}) {
  const tanggal = formatTanggalPanjang(invite.tanggal, invite.hariLabel)
  const g = photos.gallery || []

  return (
    <article className="t2">
      <section className="t2-cover">
        <div className="t2-arch" aria-hidden="true" />
        <p className="t2-kicker">The Wedding of</p>
        <div className="t2-cover-mid" />
        <div className="t2-cover-bottom">
          <p className="t2-to">Kepada Yth.</p>
          <p className="t2-guest">{invite.guest || "Tamu Undangan"}</p>
          {!open && (
            <button type="button" className="t2-open" onClick={onOpen}>Buka undangan</button>
          )}
        </div>
      </section>

      {open && (
        <>
          <section className="t2-names">
            {editing && (
              <div className="t2-slot-mini">
                <PhotoSlot label="Latar nama" photo={photos.names} onChange={(f) => onPhoto("names", f)} ratio="3 / 4" />
              </div>
            )}
            <div className="t2-oval" style={photos.names?.url ? { backgroundImage: `url(${photos.names.url})` } : undefined}>
              <p className="t2-kicker sm">The Wedding of</p>
              <h1 className="t2-script">
                {invite.wanita}
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Nama",
                  fields: [
                    { key: "wanita", label: "Wanita" },
                    { key: "pria", label: "Pria" },
                  ],
                })} />
              </h1>
              <p className="t2-and">AND</p>
              <h1 className="t2-script">{invite.pria}</h1>
            </div>
            <div className="t2-flowers" aria-hidden="true" />
          </section>

          <section className="t2-ayat">
            <Slot editing={editing} photo={photos.ayat} onChange={(f) => onPhoto("ayat", f)} label="Foto ayat" className="t2-photo wide" ratio="4 / 3" />
            <blockquote>
              “{invite.ayat}”
              <cite>{invite.ayatRef}</cite>
            </blockquote>
          </section>

          <section className="t2-couple">
            <div className="t2-person">
              <Slot editing={editing} photo={photos.wanita} onChange={(f) => onPhoto("wanita", f)} label="Foto wanita" className="t2-photo" />
              <p className="t2-role">Mempelai wanita</p>
              <h2>
                {invite.wanitaLengkap}
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Mempelai wanita",
                  fields: [
                    { key: "wanitaLengkap", label: "Nama lengkap" },
                    { key: "ayahWanita", label: "Ayah" },
                    { key: "ibuWanita", label: "Ibu" },
                    { key: "igWanita", label: "Instagram" },
                  ],
                })} />
              </h2>
              <p className="t2-parents">Putri dari<br />{invite.ayahWanita}<br />&amp; {invite.ibuWanita}</p>
              {invite.igWanita && (
                <a className="t2-ig" href={igUrl(invite.igWanita)} target="_blank" rel="noreferrer">@{invite.igWanita.replace(/^@/, "")}</a>
              )}
            </div>
            <div className="t2-person">
              <Slot editing={editing} photo={photos.pria} onChange={(f) => onPhoto("pria", f)} label="Foto pria" className="t2-photo" />
              <p className="t2-role">Mempelai pria</p>
              <h2>
                {invite.priaLengkap}
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Mempelai pria",
                  fields: [
                    { key: "priaLengkap", label: "Nama lengkap" },
                    { key: "ayahPria", label: "Ayah" },
                    { key: "ibuPria", label: "Ibu" },
                    { key: "igPria", label: "Instagram" },
                  ],
                })} />
              </h2>
              <p className="t2-parents">Putra dari<br />{invite.ayahPria}<br />&amp; {invite.ibuPria}</p>
              {invite.igPria && (
                <a className="t2-ig" href={igUrl(invite.igPria)} target="_blank" rel="noreferrer">@{invite.igPria.replace(/^@/, "")}</a>
              )}
            </div>
          </section>

          <section className="t2-save">
            <Slot editing={editing} photo={photos.save} onChange={(f) => onPhoto("save", f)} label="Foto hari-H" className="t2-photo wide" ratio="16 / 10" />
            <p className="t2-kicker">Save the date</p>
            <p className="t2-date">
              {tanggal}
              <EditDot editing={editing} onClick={() => onEdit({
                title: "Tanggal",
                fields: [
                  { key: "tanggal", label: "Tanggal", type: "date" },
                  { key: "hariLabel", label: "Hari" },
                ],
              })} />
            </p>
            <Countdown iso={invite.tanggal} />
          </section>

          <section className="t2-events">
            <article className="t2-card">
              <p className="t2-role">
                Akad nikah
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Akad nikah",
                  fields: [
                    { key: "waktuAkad", label: "Pukul" },
                    { key: "tempatAkad", label: "Kediaman / tempat" },
                    { key: "alamatAkad", label: "Alamat" },
                  ],
                })} />
              </p>
              <h3>{invite.waktuAkad}</h3>
              <p>{invite.tempatAkad}</p>
              <p>{invite.alamatAkad}</p>
              <a className="t2-map" href={mapsUrl(invite.tempatAkad, invite.alamatAkad)} target="_blank" rel="noreferrer">Buka peta</a>
            </article>
            <article className="t2-card">
              <p className="t2-role">
                Resepsi
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Resepsi",
                  fields: [
                    { key: "waktuResepsi", label: "Pukul" },
                    { key: "tempatResepsi", label: "Kediaman / tempat" },
                    { key: "alamatResepsi", label: "Alamat" },
                  ],
                })} />
              </p>
              <h3>{invite.waktuResepsi}</h3>
              <p>{invite.tempatResepsi}</p>
              <p>{invite.alamatResepsi}</p>
              <a className="t2-map" href={mapsUrl(invite.tempatResepsi, invite.alamatResepsi)} target="_blank" rel="noreferrer">Buka peta</a>
            </article>
          </section>

          <section className="t2-gallery">
            <p className="t2-kicker">Galeri</p>
            <div className="t2-grid">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Slot
                  key={i}
                  editing={editing}
                  photo={g[i]}
                  onChange={(f) => onPhoto("gallery", f, i)}
                  label={`${i + 1}`}
                  className="t2-photo"
                  ratio="1 / 1"
                />
              ))}
            </div>
          </section>

          <section className="t2-gift">
            <p className="t2-kicker">Wedding Gift</p>
            <p className="t2-copy">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
              memberi kado secara cashless atau kirim kado, dengan klik tombol di bawah ini.
            </p>
            <div className="t2-card">
              <p className="t2-role">
                Transfer
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Rekening",
                  fields: [
                    { key: "bankNama", label: "Bank" },
                    { key: "bankRek", label: "Nomor rekening" },
                    { key: "bankAn", label: "Atas nama" },
                  ],
                })} />
              </p>
              <p>{invite.bankNama}</p>
              <strong>{invite.bankRek}</strong>
              <p>a.n. {invite.bankAn}</p>
            </div>
            <div className="t2-card">
              <p className="t2-role">
                Kirim kado
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Alamat kado",
                  fields: [{ key: "alamatKado", label: "Alamat", type: "textarea" }],
                })} />
              </p>
              <p>{invite.alamatKado}</p>
            </div>
          </section>

          <section className="t2-rsvp">
            <p className="t2-kicker">RSVP</p>
            <div className="t2-row">
              <button type="button" className={rsvp.hadir === true ? "on" : ""} onClick={() => onRsvp("hadir", true)}>Hadir</button>
              <button type="button" className={rsvp.hadir === false ? "on" : ""} onClick={() => onRsvp("hadir", false)}>Berhalangan</button>
            </div>
            <input value={rsvp.nama} onChange={(e) => onRsvp("nama", e.target.value)} placeholder="Nama Anda" />
            <button type="button" className="t2-send" onClick={() => onRsvp("kirim")}>Kirim konfirmasi</button>
            {rsvp.note && <p className="t2-note">{rsvp.note}</p>}
          </section>

          <section className="t2-wishes">
            <p className="t2-kicker">Ucapan</p>
            <input value={wishForm.nama} onChange={(e) => onWish("nama", e.target.value)} placeholder="Nama" />
            <textarea value={wishForm.teks} onChange={(e) => onWish("teks", e.target.value)} placeholder="Doa dan ucapan" rows={4} />
            <button type="button" className="t2-send" onClick={() => onWish("kirim")}>Kirim ucapan</button>
            {wishForm.note && <p className="t2-note">{wishForm.note}</p>}
            <ul className="t2-wish-list">
              {wishes.map((w, i) => (
                <li key={i}><b>{w.nama}</b><span>{w.teks}</span></li>
              ))}
            </ul>
          </section>

          <section className="t2-end">
            <Slot editing={editing} photo={photos.close} onChange={(f) => onPhoto("close", f)} label="Foto penutup" className="t2-photo wide" ratio="4 / 3" />
            <p className="t2-copy">Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
            <p className="t2-script sm">{invite.wanita} &amp; {invite.pria}</p>
          </section>

          <footer className="t2-foot">
            <span>Dibuat dengan</span>
            <strong>Bersemi</strong>
          </footer>
        </>
      )}
    </article>
  )
}
