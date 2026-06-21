"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const theme = createTheme({
  palette: {
    primary: { main: "#2D3A3A", light: "#4A5C5C", dark: "#1A2424" },
    secondary: { main: "#B8363B", light: "#D4575B", dark: "#8C2528" },
    background: { default: "#FAFAF7", paper: "#FFFFFF" },
    text: { primary: "#2D2D2D", secondary: "#6B6B6B" },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
    h1: { letterSpacing: "0.06em", fontWeight: 700 },
    h2: { letterSpacing: "0.05em", fontWeight: 700 },
    h3: { letterSpacing: "0.04em", fontWeight: 600 },
    h4: { letterSpacing: "0.03em", fontWeight: 600 },
    h5: { letterSpacing: "0.02em", fontWeight: 600 },
    h6: { letterSpacing: "0.02em", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500, borderRadius: 4, letterSpacing: "0.04em" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "none", border: "1px solid #E8E5E0" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
          <Navbar />
          <main className="flex-1">{children}</main>
          {!isAdmin && <Footer />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
