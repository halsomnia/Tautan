const editorialPack = {
  layout: "editorial",
  palettes: [
    {
      id: "salju",
      name: "Salju",
      font: 0,
      colors: {
        bg: "#f6f3ee",
        surface: "#fffcf8",
        ink: "#161412",
        accent: "#161412",
        mute: "#7a736c",
        line: "#ded6cc",
        overlay: "rgba(22, 20, 18, 0.38)",
      },
    },
    {
      id: "arang",
      name: "Arang",
      font: 0,
      colors: {
        bg: "#1a1918",
        surface: "#242220",
        ink: "#f3eee7",
        accent: "#f3eee7",
        mute: "#a39b93",
        line: "#3a3632",
        overlay: "rgba(0, 0, 0, 0.45)",
      },
    },
    {
      id: "malam",
      name: "Malam",
      font: 1,
      colors: {
        bg: "#0e0d0c",
        surface: "#171615",
        ink: "#f6f1ea",
        accent: "#f6f1ea",
        mute: "#9a938b",
        line: "#2a2826",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
    },
    {
      id: "segel",
      name: "Segel",
      font: 0,
      colors: {
        bg: "#f4efe8",
        surface: "#fffcf8",
        ink: "#161412",
        accent: "#b33434",
        mute: "#7a736c",
        line: "#e0d7cd",
        overlay: "rgba(22, 20, 18, 0.4)",
      },
    },
  ],
  fonts: [
    { id: "editorial", name: "Editorial", display: "Pinyon Script", title: "Cormorant Garamond", body: "Jost" },
    { id: "modern", name: "Modern", display: "Bodoni Moda", title: "Bodoni Moda", body: "DM Sans" },
    { id: "klasik", name: "Klasik", display: "Allura", title: "Playfair Display", body: "Lora" },
  ],
  songs: [
    { id: "piano", name: "Piano" },
    { id: "gitar", name: "Gitar" },
    { id: "biola", name: "Biola" },
  ],
}

const vintagePack = {
  layout: "vintage",
  palettes: [
    {
      id: "krem",
      name: "Krem",
      font: 0,
      colors: {
        bg: "#f3e6d8",
        surface: "#fbf3e8",
        ink: "#6b3a2f",
        accent: "#c4a574",
        mute: "#a4846a",
        line: "#e2d0bc",
        overlay: "rgba(80, 48, 36, 0.35)",
      },
    },
    {
      id: "mawar",
      name: "Mawar",
      font: 0,
      colors: {
        bg: "#f4ede6",
        surface: "#fff8f2",
        ink: "#4a3b34",
        accent: "#b23a3a",
        mute: "#8a736c",
        line: "#e6d8ce",
        overlay: "rgba(74, 59, 52, 0.38)",
      },
    },
    {
      id: "daun",
      name: "Daun",
      font: 1,
      colors: {
        bg: "#efe8dc",
        surface: "#f7f4ec",
        ink: "#3f4a3c",
        accent: "#6b7f5a",
        mute: "#7e8a74",
        line: "#d8d3c4",
        overlay: "rgba(63, 74, 60, 0.36)",
      },
    },
  ],
  fonts: [
    { id: "romantika", name: "Romantika", display: "Great Vibes", title: "Cormorant Garamond", body: "Lora" },
    { id: "surat", name: "Surat", display: "Allura", title: "Playfair Display", body: "Source Serif 4" },
    { id: "tinta", name: "Tinta", display: "Pinyon Script", title: "Libre Baskerville", body: "Lora" },
  ],
  songs: [
    { id: "sore", name: "Sore" },
    { id: "piano", name: "Piano" },
    { id: "gending", name: "Gending" },
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
    id: "vintage",
    name: "Vintage",
    category: "nikah",
    style: "vintage",
    desc: "Kertas tua, bunga kering.",
    price: 79000,
    promoPrice: 99000,
    promo: true,
    active: true,
    thumb: "vintage",
    ...vintagePack,
  },
]

export function getCatalog(id) {
  return catalogs.find((c) => c.id === id)
}
