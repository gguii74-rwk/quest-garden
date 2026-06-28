import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest Garden",
  description: "숙제와 독서를 정원 성장 게임처럼 즐기는 아이용 미션 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
