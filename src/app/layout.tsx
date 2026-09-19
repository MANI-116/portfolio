import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuroraBackground } from "@/components/aurora-background";
import { TerminalProvider } from "@/components/tui/terminal-provider";
import { CvProvider } from "@/components/cv/cv-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manikantha.dev"),
  title: {
    default: "Manikantha — Software Engineer & Distributed Systems",
    template: "%s — Manikantha",
  },
  description:
    "Software engineer building distributed systems, high-throughput backend services, and end-to-end full stack web applications with resilient architecture and low-latency performance.",
  keywords: [
    "Software Engineer",
    "Distributed Systems",
    "NestJS",
    "TypeScript",
    "Node.js",
    "Backend Engineer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Vathala Manikantha Narapa Reddy" }],
  openGraph: {
    title: "Manikantha — Software Engineer & Distributed Systems",
    description:
      "Distributed systems, high-throughput backend services, and full stack web applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manikantha — Software Engineer & Distributed Systems",
    description:
      "Distributed systems, high-throughput backend services, and full stack web applications.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-body-md text-body-md bg-canvas-bg text-on-surface min-h-screen relative">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var a=localStorage.getItem('accent');if(a)document.documentElement.dataset.accent=a}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`[data-reveal],[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <AuroraBackground />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary focus:text-body-sm"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TooltipProvider>
            <CvProvider>
              <TerminalProvider>{children}</TerminalProvider>
            </CvProvider>
          </TooltipProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
