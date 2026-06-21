"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ChatIcon from "@mui/icons-material/Chat";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <LocationOnIcon />, label: "所在地", text: t("contact.info.address") },
    { icon: <PhoneIcon />, label: "電話番号", text: t("contact.info.phone") },
    { icon: <EmailIcon />, label: "メール", text: t("contact.info.email") },
    { icon: <AccessTimeIcon />, label: "営業時間", text: t("contact.info.hours") },
  ];

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: { xs: 5, md: 7 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(45,58,58,0.92) 0%, rgba(45,58,58,0.85) 100%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            {t("contact.title")}
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            {t("contact.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            {submitted ? (
              <Paper elevation={0} sx={{ p: 5, borderRadius: 3, border: "1px solid #EDEDED", textAlign: "center" }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 64, color: "#10b981", mb: 2 }} />
                <Alert severity="success" sx={{ fontSize: "1.05rem", justifyContent: "center" }}>
                  {t("contact.success")}
                </Alert>
              </Paper>
            ) : (
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #EDEDED" }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required label={t("contact.name")} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required type="email" label={t("contact.email")} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth required label={t("contact.subject")} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth required multiline rows={6} label={t("contact.message")} />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 3, bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31", transform: "translateY(-1px)" }, py: 1.5, borderRadius: 50, transition: "all 0.3s ease" }}
                  >
                    {t("contact.send")}
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Contact Info & Map */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: "#2D3A3A", color: "white", mb: 3 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                {t("contact.info.title")}
              </Typography>
              {contactInfo.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
                  <Box sx={{ color: "#B8363B", mt: 0.3 }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block", mb: 0.3 }}>
                      {item.label}
                    </Typography>
                    <Typography>{item.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Map placeholder */}
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #EDEDED" }}>
              <Box sx={{ p: 2, borderBottom: "1px solid #EDEDED" }}>
                <Typography sx={{ fontWeight: 600, color: "#2D3A3A" }}>
                  {t("contact.map.title")}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 220,
                  bgcolor: "#E8E4DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ textAlign: "center", color: "#999" }}>
                  <LocationOnIcon sx={{ fontSize: 40, mb: 1, color: "#B8363B" }} />
                  <Typography variant="body2">沖縄県</Typography>
                  <Typography variant="caption" sx={{ color: "#BBB" }}>Google Maps 連携予定</Typography>
                </Box>
              </Box>
            </Paper>

            {/* SNS */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #EDEDED", mt: 3 }}>
              <Typography sx={{ fontWeight: 600, color: "#2D3A3A", mb: 2 }}>
                {t("contact.sns.title")}
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {[
                  { name: "LINE", icon: <ChatIcon sx={{ fontSize: 20 }} />, color: "#06C755" },
                  { name: "Instagram", icon: <InstagramIcon sx={{ fontSize: 20 }} />, color: "#E4405F" },
                  { name: "Facebook", icon: <FacebookIcon sx={{ fontSize: 20 }} />, color: "#1877F2" },
                ].map((sns) => (
                  <Box
                    key={sns.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: "1px solid #EDEDED",
                      fontSize: "0.85rem",
                      color: "#5A5A5A",
                      cursor: "pointer",
                      "&:hover": { borderColor: sns.color, color: sns.color },
                    }}
                  >
                    {sns.icon}
                    {sns.name}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
