"use client";
import { Box, Typography, Container, Grid, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <Box component="footer" sx={{ bgcolor: "#1A2A3A", color: "white", pt: 8, pb: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: "#2B4C7E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                C
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em" }}>COMPASS</Typography>
                <Typography sx={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>レンタカー</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280 }}>
              {t("contact.info.address")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              メニュー
            </Typography>
            {[
              { href: "/", label: t("nav.home") },
              { href: "/vehicles", label: t("nav.vehicles") },
              { href: "/booking", label: t("nav.booking") },
              { href: "/contact", label: t("nav.contact") },
            ].map((link) => (
              <Typography
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  display: "block",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  mb: 1.2,
                  fontSize: "0.9rem",
                  "&:hover": { color: "white" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              お問い合わせ
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}>
              {t("contact.info.phone")}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}>
              {t("contact.info.email")}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
              {t("contact.info.hours")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              SNS
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { name: "LINE", icon: <ChatIcon sx={{ fontSize: 18 }} /> },
                { name: "Instagram", icon: <InstagramIcon sx={{ fontSize: 18 }} /> },
                { name: "Facebook", icon: <FacebookIcon sx={{ fontSize: 18 }} /> },
              ].map((sns) => (
                <Box
                  key={sns.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 1.5,
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)", color: "white" },
                    cursor: "pointer",
                  }}
                >
                  {sns.icon}
                  {sns.name}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 4 }} />
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", textAlign: "center", fontSize: "0.8rem" }}>
          &copy; 2026 株式会社COMPASS All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
