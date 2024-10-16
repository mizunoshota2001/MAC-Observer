import "./globals.css";
import { Suspense } from "react";
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
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
