"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles } from "@/data/demo";

export default function BookingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}

function BookingForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("vehicle") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    vehicleId: preselected,
    startDate: "",
    endDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const calculateDays = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const estimate = selectedVehicle ? days * selectedVehicle.pricePerDay : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const flowSteps = [
    t("booking.flow.step1"),
    t("booking.flow.step2"),
    t("booking.flow.step3"),
    t("booking.flow.step4"),
  ];

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&h=600&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          color: "white",
          py: { xs: 5, md: 7 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(26,49,84,0.92) 0%, rgba(43,76,126,0.87) 100%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mb: 2, borderRadius: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            {t("booking.title")}
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            {t("booking.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            {submitted ? (
              <Paper elevation={0} sx={{ p: 5, borderRadius: 3, border: "1px solid #EDEDED", textAlign: "center" }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 64, color: "#10b981", mb: 2 }} />
                <Alert severity="success" sx={{ fontSize: "1.05rem", justifyContent: "center" }}>
                  {t("booking.success")}
                </Alert>
              </Paper>
            ) : (
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #EDEDED" }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required label={t("booking.name")} value={form.name} onChange={(e) => update("name", e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required type="email" label={t("booking.email")} value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required label={t("booking.phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label={t("booking.nationality")} value={form.nationality} onChange={(e) => update("nationality", e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        required
                        select
                        label={t("booking.vehicle")}
                        value={form.vehicleId}
                        onChange={(e) => update("vehicleId", e.target.value)}
                      >
                        {vehicles.filter((v) => v.available).map((v) => (
                          <MenuItem key={v.id} value={v.id}>
                            {v.name} - &yen;{v.pricePerDay.toLocaleString()}{t("vehicles.perDay")}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required type="date" label={t("booking.startDate")} value={form.startDate} onChange={(e) => update("startDate", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth required type="date" label={t("booking.endDate")} value={form.endDate} onChange={(e) => update("endDate", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth multiline rows={3} label={t("booking.notes")} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                    </Grid>
                  </Grid>

                  {/* Estimate */}
                  {estimate > 0 && (
                    <Box sx={{ mt: 3, p: 3, bgcolor: "rgba(43,76,126,0.04)", borderRadius: 2, border: "1px solid rgba(43,76,126,0.1)" }}>
                      <Typography sx={{ fontWeight: 600, color: "#1C1C1C", mb: 0.5 }}>
                        {t("booking.estimate")}
                      </Typography>
                      <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#C23B22" }}>
                        &yen;{estimate.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#999" }}>
                        {days} days x &yen;{selectedVehicle?.pricePerDay.toLocaleString()} ({selectedVehicle?.name})
                      </Typography>
                    </Box>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 3, bgcolor: "#C23B22", "&:hover": { bgcolor: "#A33018" }, py: 1.5, fontSize: "1.05rem" }}
                  >
                    {t("booking.submit")}
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Sidebar - Reservation flow */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #EDEDED" }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3, color: "#2B4C7E" }}>
                {t("booking.flow.title")}
              </Typography>
              <Stepper orientation="vertical" activeStep={0}>
                {flowSteps.map((step, idx) => (
                  <Step key={idx} active={idx === 0} completed={false}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            {/* Selected vehicle info */}
            {selectedVehicle && (
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #EDEDED", mt: 3 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>{selectedVehicle.name}</Typography>
                <Typography variant="body2" sx={{ color: "#5A5A5A", mb: 0.5 }}>
                  {selectedVehicle.category} | {selectedVehicle.seats}{t("vehicles.seats")} | {selectedVehicle.transmission}
                </Typography>
                <Typography sx={{ fontWeight: 700, color: "#C23B22", mt: 1 }}>
                  &yen;{selectedVehicle.pricePerDay.toLocaleString()}{t("vehicles.perDay")}
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
