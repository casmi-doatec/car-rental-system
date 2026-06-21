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
    <Box component="footer" sx={{ bgcolor: "#2D3A3A", color: "white", pt: 8, pb: 5, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "1rem", letterSpacing: "0.08em" }}>COMPASS</Typography>
              <Typography sx={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", mt: 0.3 }}>レンタカー</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 2, maxWidth: 260 }}>
              沖縄のプレミアムレンタカーサービス。
              お客様に安心と快適をお届けします。
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 500, mb: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
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
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  mb: 1.2,
                  fontSize: "0.85rem",
                  letterSpacing: "0.02em",
                  "&:hover": { color: "white" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
              お問い合わせ
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", mb: 1, letterSpacing: "0.02em" }}>
              {t("contact.info.phone")}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", mb: 1, letterSpacing: "0.02em" }}>
              {t("contact.info.email")}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
              {t("contact.info.hours")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
              SNS
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {[
                { icon: <ChatIcon sx={{ fontSize: 18 }} />, label: "LINE" },
                { icon: <InstagramIcon sx={{ fontSize: 18 }} />, label: "Instagram" },
                { icon: <FacebookIcon sx={{ fontSize: 18 }} />, label: "Facebook" },
              ].map((sns) => (
                <Box
                  key={sns.label}
                  sx={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    "&:hover": { borderColor: "rgba(255,255,255,0.4)", color: "white" },
                  }}
                >
                  {sns.icon}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 4 }} />
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.25)", textAlign: "center", fontSize: "0.75rem", letterSpacing: "0.03em" }}>
          &copy; 2026 株式会社COMPASS All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
