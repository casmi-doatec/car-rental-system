"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const theme = createTheme({
  palette: {
    primary: { main: "#1a1a2e" },
    secondary: { main: "#e94560" },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
