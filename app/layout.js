import "./globals.css";

export const metadata = {
  title: "Bintang Danuarta — UI/UX Designer",
  description:
    "Bintang Danuarta’s UI/UX design portfolio: interfaces, user flows, and design systems with people in mind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
