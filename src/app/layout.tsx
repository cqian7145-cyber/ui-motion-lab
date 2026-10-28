import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "UI Motion Lab — Interactive Component Studio",
  description: "An independent laboratory for beautiful, reusable, accessible React motion components.",
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="zh-CN"><body>{children}</body></html>;
}
