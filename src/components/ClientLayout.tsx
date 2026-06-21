"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const theme = createTheme({
  palette: {
    primary: { main: "#2B4C7E", light: "#5A7FB5", dark: "#1A3154" },
    secondary: { main: "#C23B22", light: "#D4654F", dark: "#8B2A18" },
    background: { default: "#FAF8F5", paper: "#FFFFFF" },
    text: { primary: "#1C1C1C", secondary: "#5A5A5A" },
  },
  typography: {
    fontFamily: "'Noto Sans JP', 'Inter', sans-serif",
    h1: { letterSpacing: "0.04em" },
    h2: { letterSpacing: "0.03em" },
    h3: { letterSpacing: "0.02em" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
      },
    },
  },
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
