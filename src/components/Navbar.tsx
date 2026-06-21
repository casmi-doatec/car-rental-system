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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/i18n/translations";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
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
      <AppBar position="sticky" sx={{ bgcolor: "#1a1a2e" }}>
        <Toolbar className="max-w-7xl mx-auto w-full">
          <DirectionsCarIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            COMPASS Rental
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{ color: "white", textTransform: "none" }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton color="inherit" onClick={(e) => setLangAnchor(e.currentTarget)}>
              <LanguageIcon />
            </IconButton>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            sx={{ display: { md: "none" } }}
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
            onClick={() => {
              setLocale(lang.code);
              setLangAnchor(null);
            }}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 2, pt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("common.language")}
            </Typography>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                fullWidth
                variant={locale === lang.code ? "contained" : "text"}
                sx={{ mb: 0.5, justifyContent: "flex-start" }}
                onClick={() => {
                  setLocale(lang.code);
                  setDrawerOpen(false);
                }}
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
