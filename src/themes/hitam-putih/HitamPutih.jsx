import Countdown from "../../components/Countdown"
import InlineText from "../../components/InlineText"
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
  open,
  onOpen,
  onField = () => {},
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
            <PhotoSlot
              label="Ganti foto sampul"
              ratio="3 / 4"
              photo={photos.cover}
              onChange={(file) => onPhoto("cover", file)}
              hint="Foto sampul"
            />
          </div>
        )}
        <div className="hp-cover-inner">
          <p className="hp-kicker">The wedding of</p>
          <h1 className="hp-script">
            <InlineText editing={editing} value={invite.wanita} onChange={(v) => onField("wanita", v)} placeholder="Alya" />
            <span className="hp-amp">&</span>
            <InlineText editing={editing} value={invite.pria} onChange={(v) => onField("pria", v)} placeholder="Raka" />
          </h1>
          <p className="hp-date">{tanggal}</p>
          <p className="hp-to">
            Kepada Yth.
            <b>
              <InlineText editing={editing} value={invite.guest} onChange={(v) => onField("guest", v)} placeholder="Tamu Undangan" />
            </b>
          </p>
          {!open && (
            <button type="button" className="hp-open" onClick={onOpen}>
              Buka undangan
            </button>
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
                <PhotoSlot
                  label="Foto mempelai wanita"
                  photo={photos.wanita}
                  onChange={(file) => onPhoto("wanita", file)}
                />
              ) : photos.wanita?.url ? (
                <div className="hp-photo"><img src={photos.wanita.url} alt={invite.wanitaLengkap} /></div>
              ) : (
                <div className="hp-photo empty">Foto</div>
              )}
              <p className="hp-role">Mempelai wanita</p>
              <h2>
                <InlineText editing={editing} value={invite.wanitaLengkap} onChange={(v) => onField("wanitaLengkap", v)} />
              </h2>
              <p className="hp-parents">
                Putri dari
                <br />
                <InlineText editing={editing} value={invite.ayahWanita} onChange={(v) => onField("ayahWanita", v)} />
                <br />
                &amp; <InlineText editing={editing} value={invite.ibuWanita} onChange={(v) => onField("ibuWanita", v)} />
              </p>
            </div>
            <div className="hp-person">
              {editing ? (
                <PhotoSlot
                  label="Foto mempelai pria"
                  photo={photos.pria}
                  onChange={(file) => onPhoto("pria", file)}
                />
              ) : photos.pria?.url ? (
                <div className="hp-photo"><img src={photos.pria.url} alt={invite.priaLengkap} /></div>
              ) : (
                <div className="hp-photo empty">Foto</div>
              )}
              <p className="hp-role">Mempelai pria</p>
              <h2>
                <InlineText editing={editing} value={invite.priaLengkap} onChange={(v) => onField("priaLengkap", v)} />
              </h2>
              <p className="hp-parents">
                Putra dari
                <br />
                <InlineText editing={editing} value={invite.ayahPria} onChange={(v) => onField("ayahPria", v)} />
                <br />
                &amp; <InlineText editing={editing} value={invite.ibuPria} onChange={(v) => onField("ibuPria", v)} />
              </p>
            </div>
          </section>

          <section className="hp-count-wrap" data-section="hitung">
            <p className="hp-label">Menghitung hari</p>
            <Countdown iso={invite.tanggal} />
          </section>

          <section className="hp-events" data-section="acara">
            <div className="hp-event">
              <b>Akad nikah</b>
              <h3>{invite.waktuAkad}</h3>
              <p>
                {tanggal}
                <br />
                {invite.tempatAkad}
                <br />
                {invite.alamatAkad}
              </p>
              <div className="hp-event-actions">
                <a className="hp-link" href={mapsUrl(invite.tempatAkad, invite.alamatAkad)} target="_blank" rel="noreferrer">Lihat peta</a>
                <a className="hp-link" href={calendarUrl(invite)} target="_blank" rel="noreferrer">Simpan kalender</a>
              </div>
            </div>
            <div className="hp-event">
              <b>Resepsi</b>
              <h3>{invite.waktuResepsi}</h3>
              <p>
                {tanggal}
                <br />
                {invite.tempatResepsi}
                <br />
                {invite.alamatResepsi}
              </p>
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
                    <PhotoSlot
                      key={i}
                      compact
                      ratio="1 / 1"
                      label={`Foto ${i + 1}`}
                      photo={photos.gallery[i]}
                      onChange={(file) => onPhoto("gallery", file, i)}
                    />
                  ) : photos.gallery[i]?.url ? (
                    <div key={i} className="hp-photo">
                      <img src={photos.gallery[i].url} alt="" />
                    </div>
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
              <h3>Tanda kasih</h3>
              <p className="hp-lead">Doa restu Anda adalah hadiah terindah. Jika berkenan mengirim tanda kasih:</p>
              <p className="hp-rek">
                {invite.bankNama}
                <br />
                <strong>{invite.bankRek}</strong>
                <br />
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
              <input
                value={rsvp.nama}
                onChange={(e) => onRsvp("nama", e.target.value)}
                placeholder="Nama Anda"
              />
              <textarea
                value={rsvp.ucapan}
                onChange={(e) => onRsvp("ucapan", e.target.value)}
                placeholder="Ucapan dan doa"
              />
              <button type="button" className="hp-send" onClick={() => onRsvp("kirim")}>
                Kirim ucapan
              </button>
              {rsvp.note && <p className="hp-note">{rsvp.note}</p>}
            </section>
          )}

          <section className="hp-end" data-section="penutup">
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
