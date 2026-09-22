import Countdown from "../../components/Countdown"
import EditDot from "../../components/EditDot"
import PhotoSlot from "../../components/PhotoSlot"
import { formatTanggalPanjang } from "../../data/demoInvite"
import "./HitamPutih.css"

function mapsUrl(place, address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} ${address}`)}`
}

function calendarUrl(invite) {
  const start = (invite.tanggal || "").replaceAll("-", "")
  if (!start) return "#"
  const text = `Akad ${invite.pria} & ${invite.wanita}`
  const details = `${invite.tempatAkad} · ${invite.alamatAkad}`
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${start}/${start}&details=${encodeURIComponent(details)}`
}

export default function HitamPutih({
  invite,
  photos,
  onPhoto,
  onEdit = () => {},
  open,
  onOpen,
  editing = false,
  rsvp,
  onRsvp,
}) {
  const tanggal = formatTanggalPanjang(invite.tanggal, invite.hariLabel)

  return (
    <article className="hp">
      <section className="hp-cover" data-section="cover">
        <div className="hp-cover-media">
          {photos.cover?.url ? <img src={photos.cover.url} alt="" /> : null}
        </div>
        <div className="hp-cover-shade" />
        {editing && (
          <div className="hp-cover-edit">
            <PhotoSlot label="Foto sampul" ratio="3 / 4" photo={photos.cover} onChange={(file) => onPhoto("cover", file)} hint="Unggah" />
          </div>
        )}
        <div className="hp-cover-inner">
          <p className="hp-kicker">The wedding of</p>
          <h1 className="hp-script">
            {invite.wanita}
            <span className="hp-amp">&</span>
            {invite.pria}
            <EditDot editing={editing} light onClick={() => onEdit({
              title: "Nama di sampul",
              fields: [
                { key: "wanita", label: "Nama wanita" },
                { key: "pria", label: "Nama pria" },
              ],
            })} />
          </h1>
          <p className="hp-date">
            {tanggal}
            <EditDot editing={editing} light onClick={() => onEdit({
              title: "Tanggal",
              fields: [
                { key: "tanggal", label: "Tanggal", type: "date" },
                { key: "hariLabel", label: "Hari" },
              ],
            })} />
          </p>
          <p className="hp-to">
            Kepada Yth.
            <b>{invite.guest || "Tamu Undangan"}</b>
          </p>
          {!open && (
            <button type="button" className="hp-open" onClick={onOpen}>Buka undangan</button>
          )}
        </div>
      </section>

      {open && (
        <>
          <section className="hp-page" data-section="pembuka">
            <div className="hp-rule" />
            <p className="hp-arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            <p className="hp-lead">
              Assalamu’alaikum Warahmatullahi Wabarakatuh.
              Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
              untuk hadir dalam acara pernikahan kami.
            </p>
          </section>

          {invite.features.ayat && (
            <section className="hp-quote" data-section="ayat">
              <p>“{invite.ayat}”</p>
              <cite>{invite.ayatRef}</cite>
            </section>
          )}

          <section className="hp-couple" data-section="mempelai">
            <div className="hp-person">
              {editing ? (
                <PhotoSlot label="Foto wanita" photo={photos.wanita} onChange={(file) => onPhoto("wanita", file)} />
              ) : photos.wanita?.url ? (
                <div className="hp-photo"><img src={photos.wanita.url} alt="" /></div>
              ) : (
                <div className="hp-photo empty">Foto</div>
              )}
              <p className="hp-role">Mempelai wanita</p>
              <h2>
                {invite.wanitaLengkap}
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Mempelai wanita",
                  fields: [
                    { key: "wanitaLengkap", label: "Nama lengkap" },
                    { key: "ayahWanita", label: "Ayah" },
                    { key: "ibuWanita", label: "Ibu" },
                  ],
                })} />
              </h2>
              <p className="hp-parents">
                Putri dari<br />
                {invite.ayahWanita}<br />
                &amp; {invite.ibuWanita}
              </p>
            </div>
            <div className="hp-person">
              {editing ? (
                <PhotoSlot label="Foto pria" photo={photos.pria} onChange={(file) => onPhoto("pria", file)} />
              ) : photos.pria?.url ? (
                <div className="hp-photo"><img src={photos.pria.url} alt="" /></div>
              ) : (
                <div className="hp-photo empty">Foto</div>
              )}
              <p className="hp-role">Mempelai pria</p>
              <h2>
                {invite.priaLengkap}
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Mempelai pria",
                  fields: [
                    { key: "priaLengkap", label: "Nama lengkap" },
                    { key: "ayahPria", label: "Ayah" },
                    { key: "ibuPria", label: "Ibu" },
                  ],
                })} />
              </h2>
              <p className="hp-parents">
                Putra dari<br />
                {invite.ayahPria}<br />
                &amp; {invite.ibuPria}
              </p>
            </div>
          </section>

          <section className="hp-count-wrap">
            <p className="hp-label">Menghitung hari</p>
            <Countdown iso={invite.tanggal} />
          </section>

          <section className="hp-events" data-section="acara">
            <div className="hp-event">
              <b>Akad nikah <EditDot editing={editing} onClick={() => onEdit({
                title: "Akad nikah",
                fields: [
                  { key: "waktuAkad", label: "Waktu" },
                  { key: "tempatAkad", label: "Tempat" },
                  { key: "alamatAkad", label: "Alamat" },
                ],
              })} /></b>
              <h3>{invite.waktuAkad}</h3>
              <p>{tanggal}<br />{invite.tempatAkad}<br />{invite.alamatAkad}</p>
              <div className="hp-event-actions">
                <a className="hp-link" href={mapsUrl(invite.tempatAkad, invite.alamatAkad)} target="_blank" rel="noreferrer">Lihat peta</a>
                <a className="hp-link" href={calendarUrl(invite)} target="_blank" rel="noreferrer">Simpan kalender</a>
              </div>
            </div>
            <div className="hp-event">
              <b>Resepsi <EditDot editing={editing} onClick={() => onEdit({
                title: "Resepsi",
                fields: [
                  { key: "waktuResepsi", label: "Waktu" },
                  { key: "tempatResepsi", label: "Tempat" },
                  { key: "alamatResepsi", label: "Alamat" },
                ],
              })} /></b>
              <h3>{invite.waktuResepsi}</h3>
              <p>{tanggal}<br />{invite.tempatResepsi}<br />{invite.alamatResepsi}</p>
              <div className="hp-event-actions">
                <a className="hp-link" href={mapsUrl(invite.tempatResepsi, invite.alamatResepsi)} target="_blank" rel="noreferrer">Lihat peta</a>
                <a className="hp-link" href={calendarUrl(invite)} target="_blank" rel="noreferrer">Simpan kalender</a>
              </div>
            </div>
          </section>

          {invite.features.gallery && (
            <section data-section="galeri">
              <div className="hp-page" style={{ paddingBottom: 8 }}>
                <p className="hp-label">Galeri</p>
              </div>
              <div className="hp-gallery">
                {[0, 1, 2, 3].map((i) => (
                  editing ? (
                    <PhotoSlot key={i} compact ratio="1 / 1" label={`Foto ${i + 1}`} photo={photos.gallery[i]} onChange={(file) => onPhoto("gallery", file, i)} />
                  ) : photos.gallery[i]?.url ? (
                    <div key={i} className="hp-photo"><img src={photos.gallery[i].url} alt="" /></div>
                  ) : (
                    <div key={i} className="hp-photo empty">Galeri</div>
                  )
                ))}
              </div>
            </section>
          )}

          {invite.features.envelope && (
            <section className="hp-gift" data-section="amplop">
              <p className="hp-label">Amplop digital</p>
              <h3>
                Tanda kasih
                <EditDot editing={editing} onClick={() => onEdit({
                  title: "Rekening",
                  fields: [
                    { key: "bankNama", label: "Bank" },
                    { key: "bankRek", label: "Nomor rekening" },
                    { key: "bankAn", label: "Atas nama" },
                  ],
                })} />
              </h3>
              <p className="hp-lead">Doa restu Anda adalah hadiah terindah. Jika berkenan mengirim tanda kasih:</p>
              <p className="hp-rek">
                {invite.bankNama}<br />
                <strong>{invite.bankRek}</strong><br />
                a.n. {invite.bankAn}
              </p>
            </section>
          )}

          {invite.features.rsvp && (
            <section className="hp-rsvp" data-section="rsvp">
              <p className="hp-label">Konfirmasi</p>
              <h3>RSVP &amp; ucapan</h3>
              <div className="hp-rsvp-row">
                <button type="button" className={rsvp.hadir === true ? "on" : ""} onClick={() => onRsvp("hadir", true)}>Hadir</button>
                <button type="button" className={rsvp.hadir === false ? "on" : ""} onClick={() => onRsvp("hadir", false)}>Berhalangan</button>
              </div>
              <input value={rsvp.nama} onChange={(e) => onRsvp("nama", e.target.value)} placeholder="Nama Anda" />
              <textarea value={rsvp.ucapan} onChange={(e) => onRsvp("ucapan", e.target.value)} placeholder="Ucapan dan doa" />
              <button type="button" className="hp-send" onClick={() => onRsvp("kirim")}>Kirim ucapan</button>
              {rsvp.note && <p className="hp-note">{rsvp.note}</p>}
            </section>
          )}

          <section className="hp-end">
            <div className="hp-rule" />
            <p className="hp-lead">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
            <p className="hp-script">{invite.wanita} &amp; {invite.pria}</p>
            <p>Wassalamu’alaikum Warahmatullahi Wabarakatuh</p>
          </section>
        </>
      )}
    </article>
  )
}
