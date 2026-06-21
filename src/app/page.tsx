"use client";
import { Box, Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SecurityIcon from "@mui/icons-material/Security";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    { icon: <TranslateIcon sx={{ fontSize: 40 }} />, title: t("home.features.multilingual"), desc: t("home.features.multilingual.desc") },
    { icon: <AccessTimeIcon sx={{ fontSize: 40 }} />, title: t("home.features.flexible"), desc: t("home.features.flexible.desc") },
    { icon: <SupportAgentIcon sx={{ fontSize: 40 }} />, title: t("home.features.support"), desc: t("home.features.support.desc") },
    { icon: <SecurityIcon sx={{ fontSize: 40 }} />, title: t("home.features.insurance"), desc: t("home.features.insurance.desc") },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          py: { xs: 10, md: 16 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="div" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            {t("home.hero.title")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.85, fontWeight: 300 }}>
            {t("home.hero.subtitle")}
          </Typography>
          <Button
            component={Link}
            href="/vehicles"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#e94560",
              "&:hover": { bgcolor: "#d63851" },
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {t("home.hero.cta")}
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, textAlign: "center" }} gutterBottom>
          {t("home.features.title")}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Card
                elevation={0}
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  border: "1px solid #eee",
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Box sx={{ color: "#e94560", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600 }} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
