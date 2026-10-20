import "./globals.css";

export const metadata = {
  title: "Bintang Danuarta — UI/UX Designer",
  description:
    "Bintang Danuarta’s UI/UX design portfolio: interfaces, user flows, and design systems with people in mind.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme-preference");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
