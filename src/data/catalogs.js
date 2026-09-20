const vintagePack = {
  palettes: [
    { id: "hangat", name: "Hangat", font: 0, colors: { bg: "#F3E6D8", surface: "#FFF8F1", ink: "#6B3A2F", accent: "#C4A574", mute: "#A4846A" } },
    { id: "daun", name: "Daun", font: 0, colors: { bg: "#EFE8DC", surface: "#F7F4EC", ink: "#3F4A3C", accent: "#6B7F5A", mute: "#7E8A74" } },
    { id: "hati", name: "Hati", font: 1, colors: { bg: "#F4EDE6", surface: "#FFFCF8", ink: "#4A3B34", accent: "#B23A3A", mute: "#8A736C" } },
  ],
  fonts: [
    { id: "klasik", name: "Klasik", title: "Cormorant Garamond", body: "DM Sans" },
    { id: "tinta", name: "Tinta", title: "Playfair Display", body: "Source Sans 3" },
    { id: "halus", name: "Halus", title: "Libre Baskerville", body: "Lora" },
  ],
  songs: [
    { id: "a", name: "Sore" },
    { id: "b", name: "Tenang" },
    { id: "c", name: "Piano" },
  ],
}

export const catalogs = [
  { id: "seruni", name: "Seruni", category: "nikah", style: "vintage", desc: "Kertas tua, bunga kering.", price: 79000, promoPrice: 99000, active: true, thumb: "#cbb7ad", layout: "cover-scroll", ...vintagePack },
  { id: "kawung", name: "Kawung", category: "nikah", style: "adat", desc: "Batik halus, maroon hangat.", price: 79000, active: true, thumb: "#b89a8c", layout: "cover-scroll",
    palettes: [
      { id: "batik", name: "Batik", font: 0, colors: { bg: "#F4EDE6", surface: "#FFF8F1", ink: "#5C2A2A", accent: "#C4A574", mute: "#A4846A" } },
      { id: "soga", name: "Soga", font: 0, colors: { bg: "#EFE8DC", surface: "#F6F0E6", ink: "#4A3B34", accent: "#A67C52", mute: "#8A7368" } },
      { id: "malam", name: "Malam", font: 1, colors: { bg: "#E8DFD4", surface: "#F3ECE4", ink: "#2C2420", accent: "#8C3A3A", mute: "#7A6A62" } },
    ],
    fonts: vintagePack.fonts,
    songs: [{ id: "a", name: "Gending" }, { id: "b", name: "Sore" }, { id: "c", name: "Piano" }],
  },
  { id: "sajadah", name: "Sajadah", category: "nikah", style: "islami", desc: "Tenang, nuansa syar’i.", price: 79000, active: true, thumb: "#c5c1b6", layout: "cover-scroll",
    palettes: [
      { id: "gading", name: "Gading", font: 0, colors: { bg: "#F4F1EC", surface: "#FFFcf8", ink: "#3D4A3C", accent: "#C4B7A0", mute: "#7A736C" } },
      { id: "tinta", name: "Tinta", font: 1, colors: { bg: "#F4F1EC", surface: "#FFFcf8", ink: "#1F1C19", accent: "#7A736C", mute: "#8A8680" } },
      { id: "zamrud", name: "Zamrud", font: 0, colors: { bg: "#F0EBE3", surface: "#F7F4EC", ink: "#2F4A40", accent: "#6B8F7A", mute: "#6E7F76" } },
    ],
    fonts: vintagePack.fonts,
    songs: [{ id: "a", name: "Nasyid" }, { id: "b", name: "Tenang" }, { id: "c", name: "Piano" }],
  },
  { id: "senyap", name: "Senyap", category: "lamaran", style: "minimal", desc: "Minim, cream, tipografi bersih.", price: 49000, promoPrice: 79000, active: true, thumb: "#d2c6b8", layout: "cover-scroll",
    palettes: [
      { id: "cream", name: "Cream", font: 2, colors: { bg: "#F4F1EC", surface: "#FFFcf8", ink: "#1F1C19", accent: "#C4B7A0", mute: "#7A736C" } },
      { id: "batu", name: "Batu", font: 2, colors: { bg: "#EEEAE4", surface: "#F7F5F1", ink: "#3A342F", accent: "#A39B93", mute: "#8A8680" } },
      { id: "hati", name: "Hati", font: 0, colors: { bg: "#F4EDE6", surface: "#FFFcf8", ink: "#1F1C19", accent: "#B23A3A", mute: "#8A736C" } },
    ],
    fonts: [
      { id: "klasik", name: "Klasik", title: "Cormorant Garamond", body: "DM Sans" },
      { id: "tinta", name: "Tinta", title: "Playfair Display", body: "Source Sans 3" },
      { id: "bersih", name: "Bersih", title: "DM Sans", body: "DM Sans" },
    ],
    songs: vintagePack.songs,
  },
  { id: "ranting", name: "Ranting", category: "ultah", style: "vintage", desc: "Hangat, untuk pesta rumahan.", price: 59000, active: true, thumb: "#c4b0a4", layout: "cover-scroll", ...vintagePack },
]