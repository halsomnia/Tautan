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
    { id: "piano", name: "Piano malam" },
    { id: "gitar", name: "Gitar sore" },
    { id: "biola", name: "Biola tenang" },
  ],
}

export const catalogs = [
  {
    id: "hitam-putih",
    name: "Hitam Putih",
    category: "nikah",
    style: "editorial",
    desc: "Editorial monokrom. Tenang, rapi, mudah dibaca.",
    price: 89000,
    promoPrice: 119000,
    promo: true,
    active: true,
    ...editorialPack,
  },
]

export function getCatalog(id) {
  return catalogs.find((c) => c.id === id)
}
