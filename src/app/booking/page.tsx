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
} from "@mui/material";
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

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700 }} gutterBottom>
        {t("booking.title")}
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ mt: 2, fontSize: "1.1rem" }}>
          {t("booking.success")}
        </Alert>
      ) : (
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label={t("booking.name")}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label={t("booking.email")}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label={t("booking.phone")}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  select
                  label={t("booking.vehicle")}
                  value={form.vehicleId}
                  onChange={(e) => update("vehicleId", e.target.value)}
                >
                  {vehicles
                    .filter((v) => v.available)
                    .map((v) => (
                      <MenuItem key={v.id} value={v.id}>
                        {v.name} - &yen;{v.pricePerDay.toLocaleString()}/day
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label={t("booking.startDate")}
                  value={form.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label={t("booking.endDate")}
                  value={form.endDate}
                  onChange={(e) => update("endDate", e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={t("booking.notes")}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Grid>
            </Grid>

            {estimate > 0 && (
              <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="h6">
                  {t("booking.estimate")}: <strong>&yen;{estimate.toLocaleString()}</strong>
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({days} days x &yen;{selectedVehicle?.pricePerDay.toLocaleString()})
                  </Typography>
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                bgcolor: "#e94560",
                "&:hover": { bgcolor: "#d63851" },
                textTransform: "none",
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              {t("booking.submit")}
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
