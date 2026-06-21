import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "COMPASS レンタカー | 沖縄のプレミアムレンタカー",
  description: "沖縄のプレミアムレンタカーサービス。多言語対応（日本語・英語・中国語・韓国語）。車両予約・お見積り・お問い合わせはこちら。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
