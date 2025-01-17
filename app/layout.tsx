import "./globals.css";
export const metadata = {
  title: "MAC Obs.",
  description: "MAC Observer",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
