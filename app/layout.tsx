import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
const notoSans = Noto_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Helix — Clarity for how your team works",
    template: "%s — Helix",
  },
  description:
    "Helix is an AI-native workspace that turns team conversations into clarity, decisions, and action — without the noise.",
  applicationName: "Helix",
  metadataBase: new URL("https://usehelix.com"),
  keywords: [
    "AI workspace",
    "team communication",
    "B2B collaboration",
    "Slack alternative",
    "AI for teams",
    "workplace AI",
    "async work",
  ],
  authors: [{ name: "Helix" }],
  creator: "Helix",
  publisher: "Helix",

  openGraph: {
    type: "website",
    title: "Helix — Clarity for how your team works",
    description:
      "An AI-native workspace that transforms conversations into shared intelligence.",
    url: "https://usehelix.com",
    siteName: "Helix",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Helix — AI Workspace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Helix — Clarity for how your team works",
    description:
      "An AI-native workspace that turns conversations into decisions and action.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={notoSans.variable} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
