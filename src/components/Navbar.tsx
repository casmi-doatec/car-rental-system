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
];

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/vehicles", label: t("nav.vehicles") },
    { href: "/availability", label: "空車確認" },
    { href: "/contact", label: t("nav.contact") },
    { href: "/admin", label: t("nav.admin") },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid #E8E5E0",
        }}
      >
        <Toolbar className="max-w-7xl mx-auto w-full" sx={{ minHeight: { xs: 56, md: 64 } }}>
          <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", flexGrow: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#2D3A3A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              C
            </Box>
            <Box>
              <Typography sx={{ color: "#2D2D2D", fontWeight: 600, fontSize: "1rem", lineHeight: 1.2, letterSpacing: "0.08em" }}>
                COMPASS
              </Typography>
              <Typography sx={{ color: "#999", fontSize: "0.55rem", letterSpacing: "0.2em" }}>
                レンタカー
              </Typography>
            </Box>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: "#2D2D2D",
                  fontSize: "0.85rem",
                  px: 2,
                  py: 1,
                  minWidth: "auto",
                  letterSpacing: "0.04em",
                  "&:hover": { bgcolor: "transparent", color: "#B8363B" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Divider orientation="vertical" flexItem sx={{ mx: 1.5, borderColor: "#E8E5E0" }} />
            <Button
              startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
              onClick={(e) => setLangAnchor(e.currentTarget)}
              sx={{ color: "#6B6B6B", fontSize: "0.8rem", minWidth: "auto" }}
            >
              {languages.find((l) => l.code === locale)?.label}
            </Button>
          </Box>

          <IconButton
            sx={{ display: { md: "none" }, color: "#2D2D2D" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={locale === lang.code}
            onClick={() => { setLocale(lang.code); setLangAnchor(null); }}
            sx={{ fontSize: "0.9rem" }}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 4 }}>
          <Box sx={{ px: 3, mb: 3 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#2D3A3A", letterSpacing: "0.08em" }}>COMPASS</Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#999", letterSpacing: "0.15em" }}>レンタカー</Typography>
          </Box>
          <Divider sx={{ borderColor: "#E8E5E0" }} />
          <List sx={{ px: 1 }}>
            {navLinks.map((link) => (
              <ListItem
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.5, "&:hover": { bgcolor: "#FAFAF7" } }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: "#E8E5E0", mx: 2 }} />
          <Box sx={{ px: 2, pt: 2 }}>
            <Typography variant="caption" sx={{ color: "#999", mb: 1, display: "block", letterSpacing: "0.05em" }}>
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
                  ...(locale === lang.code && { bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" } }),
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
