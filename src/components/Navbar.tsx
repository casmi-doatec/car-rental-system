"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/i18n/translations";

const languages: { code: Locale; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/vehicles", label: t("nav.vehicles") },
    { href: "/booking", label: t("nav.booking") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/admin", label: t("nav.admin") },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar className="max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", flexGrow: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "#2B4C7E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              C
            </Box>
            <Box>
              <Typography sx={{ color: "#1C1C1C", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.2, letterSpacing: "0.05em" }}>
                COMPASS
              </Typography>
              <Typography sx={{ color: "#5A5A5A", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                レンタカー
              </Typography>
            </Box>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: "#1C1C1C",
                  fontSize: "0.9rem",
                  px: 2,
                  "&:hover": { bgcolor: "rgba(43,76,126,0.06)" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Button
              startIcon={<LanguageIcon sx={{ fontSize: 18 }} />}
              onClick={(e) => setLangAnchor(e.currentTarget)}
              sx={{ color: "#5A5A5A", fontSize: "0.85rem" }}
            >
              {languages.find((l) => l.code === locale)?.label}
            </Button>
          </Box>

          {/* Mobile */}
          <IconButton
            sx={{ display: { md: "none" }, color: "#1C1C1C" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Language menu */}
      <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={locale === lang.code}
            onClick={() => { setLocale(lang.code); setLangAnchor(null); }}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 3 }}>
          <Box sx={{ px: 3, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#2B4C7E" }}>COMPASS</Typography>
            <Typography sx={{ fontSize: "0.65rem", color: "#999", letterSpacing: "0.1em" }}>レンタカー</Typography>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.5, "&:hover": { bgcolor: "rgba(43,76,126,0.04)" } }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ px: 2, pt: 2 }}>
            <Typography variant="caption" sx={{ color: "#999", mb: 1, display: "block" }}>
              {t("common.language")}
            </Typography>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                fullWidth
                variant={locale === lang.code ? "contained" : "text"}
                sx={{
                  mb: 0.5,
                  justifyContent: "flex-start",
                  ...(locale === lang.code && { bgcolor: "#2B4C7E", "&:hover": { bgcolor: "#1A3154" } }),
                }}
                onClick={() => { setLocale(lang.code); setDrawerOpen(false); }}
              >
                {lang.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
