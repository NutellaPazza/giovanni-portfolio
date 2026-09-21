import type { LinkItem } from "../types";

export const profile = {
  name: "Giovanni De Stasio",
  initials: "G.",
  descriptor:
    "Finance student interested in financial markets, venture capital, quantitative finance, and technology.",
  introduction: "",
  currentArea: "",
  interests: ["Financial Markets", "Venture Capital", "Quantitative Finance", "Technology", "AI"],
  location: "Milan, Italy",
  email: "mailto:gdestasio922@gmail.com",
  bocconiEmail: "mailto:giovanni.destasio@studunibocconi.it",
  cvPath: "/DeStasio_Giovanni_CV_Tech_Startup_Quant.pdf",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gds-/" },
    { label: "GitHub", href: "https://github.com/NutellaPazza" },
    { label: "Instagram", href: "https://www.instagram.com/destasio.giovanni/" },
    { label: "Email", href: "mailto:gdestasio922@gmail.com" },
    { label: "Bocconi Email", href: "mailto:giovanni.destasio@studunibocconi.it" },
  ] satisfies LinkItem[],
};
