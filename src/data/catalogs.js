const editorialPack = {
  layout: "editorial",
  music: "/music/hitam-putih.mp3",
  palettes: [
    { id: "salju", name: "Salju", font: 0, colors: { bg: "#f6f3ee", surface: "#fffcf8", ink: "#161412", accent: "#161412", mute: "#7a736c", line: "#ded6cc", overlay: "rgba(22, 20, 18, 0.38)" } },
    { id: "arang", name: "Arang", font: 0, colors: { bg: "#1a1918", surface: "#242220", ink: "#f3eee7", accent: "#f3eee7", mute: "#a39b93", line: "#3a3632", overlay: "rgba(0, 0, 0, 0.45)" } },
    { id: "malam", name: "Malam", font: 1, colors: { bg: "#0e0d0c", surface: "#171615", ink: "#f6f1ea", accent: "#f6f1ea", mute: "#9a938b", line: "#2a2826", overlay: "rgba(0, 0, 0, 0.5)" } },
    { id: "segel", name: "Segel", font: 0, colors: { bg: "#f4efe8", surface: "#fffcf8", ink: "#161412", accent: "#b33434", mute: "#7a736c", line: "#e0d7cd", overlay: "rgba(22, 20, 18, 0.4)" } },
  ],
  fonts: [
    { id: "editorial", name: "Editorial", display: "Pinyon Script", title: "Cormorant Garamond", body: "Jost" },
    { id: "modern", name: "Modern", display: "Bodoni Moda", title: "Bodoni Moda", body: "DM Sans" },
    { id: "klasik", name: "Klasik", display: "Allura", title: "Playfair Display", body: "Lora" },
  ],
}

const tema2Pack = {
  layout: "tema-2",
  music: "/music/tema-2.mp3",
  palettes: [
    { id: "gading", name: "Gading", font: 0, colors: { bg: "#e9dcc8", surface: "#f6ecdc", ink: "#5c3d2e", accent: "#b0895a", mute: "#8b6f55", line: "#d4c2a8", overlay: "rgba(70, 48, 32, 0.28)" } },
    { id: "teak", name: "Jati", font: 0, colors: { bg: "#d9c4a6", surface: "#efe0c8", ink: "#4a2f22", accent: "#8b5a2b", mute: "#7a5c45", line: "#cbb392", overlay: "rgba(50, 32, 20, 0.32)" } },
    { id: "senja", name: "Senja", font: 1, colors: { bg: "#e7d3c4", surface: "#f7ebe3", ink: "#6a3a32", accent: "#c17a62", mute: "#9a7468", line: "#dcc3b4", overlay: "rgba(80, 40, 32, 0.28)" } },
  ],
  fonts: [
    { id: "naskah", name: "Naskah", display: "Great Vibes", title: "Cormorant Garamond", body: "Cormorant Garamond" },
    { id: "surat", name: "Surat", display: "Allura", title: "Playfair Display", body: "Lora" },
    { id: "emas", name: "Emas", display: "Pinyon Script", title: "Cinzel", body: "Cormorant Garamond" },
  ],
  songs: [
    { id: "sinden", name: "Sinden", file: "music/tema-2.mp3" },
    { id: "kecapi", name: "Kecapi", file: "music/tema-2.mp3" },
    { id: "piano", name: "Piano", file: "music/hitam-putih.mp3" },
  ],
}

export const catalogs = [
  {
    id: "hitam-putih",
    name: "Hitam Putih",
    category: "nikah",
    style: "editorial",
    desc: "Editorial monokrom.",
    price: 89000,
    promoPrice: 119000,
    promo: true,
    active: true,
    thumb: "editorial",
    ...editorialPack,
  },
  {
    id: "tema-2",
    name: "Tema 2",
    category: "nikah",
    style: "klasik",
    desc: "Oval gading, ukiran, naskah.",
    price: 89000,
    promoPrice: 119000,
    promo: true,
    active: true,
    thumb: "tema2",
    ...tema2Pack,
  },
]

export function getCatalog(id) {
  return catalogs.find((c) => c.id === id)
}
