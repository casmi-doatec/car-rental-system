"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles } from "@/data/demo";

export default function VehiclesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Compact", "SUV", "Van"];
  const categoryKeys: Record<string, string> = {
    All: "vehicles.filter.all",
    Compact: "vehicles.filter.compact",
    SUV: "vehicles.filter.suv",
    Van: "vehicles.filter.van",
  };

  const filtered = filter === "All" ? vehicles : vehicles.filter((v) => v.category === filter);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700 }} gutterBottom>
        {t("vehicles.title")}
      </Typography>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, val) => val && setFilter(val)}
        sx={{ mb: 4 }}
      >
        {categories.map((cat) => (
          <ToggleButton key={cat} value={cat} sx={{ textTransform: "none", px: 3 }}>
            {t(categoryKeys[cat])}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Grid container spacing={3}>
        {filtered.map((vehicle) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={vehicle.image}
                alt={vehicle.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {vehicle.name}
                  </Typography>
                  <Chip
                    label={vehicle.available ? t("vehicles.available") : t("vehicles.unavailable")}
                    color={vehicle.available ? "success" : "default"}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {vehicle.category} | {vehicle.transmission} | {vehicle.fuelType}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PeopleIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.seats} {t("vehicles.seats")}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {vehicle.features.map((f) => (
                    <Chip key={f} label={f} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Typography variant="h6" component="div" color="secondary" sx={{ fontWeight: 700 }}>
                  &yen;{vehicle.pricePerDay.toLocaleString()}
                  <Typography component="span" variant="body2" color="text.secondary">
                    {t("vehicles.perDay")}
                  </Typography>
                </Typography>
                <Button
                  component={Link}
                  href={`/booking?vehicle=${vehicle.id}`}
                  variant="contained"
                  size="small"
                  disabled={!vehicle.available}
                  sx={{ bgcolor: "#e94560", "&:hover": { bgcolor: "#d63851" }, textTransform: "none" }}
                >
                  {t("vehicles.book")}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
