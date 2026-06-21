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
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <LocationOnIcon />, text: t("contact.info.address") },
    { icon: <PhoneIcon />, text: t("contact.info.phone") },
    { icon: <EmailIcon />, text: t("contact.info.email") },
    { icon: <AccessTimeIcon />, text: t("contact.info.hours") },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700 }} gutterBottom>
        {t("contact.title")}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          {submitted ? (
            <Alert severity="success" sx={{ fontSize: "1.1rem" }}>
              Message sent successfully! We will reply soon.
            </Alert>
          ) : (
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
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
                    <TextField fullWidth required multiline rows={5} label={t("contact.message")} />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 3, bgcolor: "#e94560", "&:hover": { bgcolor: "#d63851" }, textTransform: "none", py: 1.5 }}
                >
                  {t("contact.send")}
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: "#1a1a2e", color: "white" }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }} gutterBottom>
              {t("contact.info.title")}
            </Typography>
            <Box sx={{ mt: 3 }}>
              {contactInfo.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                  <Box sx={{ color: "#e94560" }}>{item.icon}</Box>
                  <Typography>{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
