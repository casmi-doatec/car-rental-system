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
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
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
    <>
      {/* Page Header */}
      <Box sx={{ bgcolor: "#2B4C7E", color: "white", py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mb: 2, borderRadius: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            {t("vehicles.title")}
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            {t("vehicles.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Filters */}
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && setFilter(val)}
          sx={{ mb: 4 }}
        >
          {categories.map((cat) => (
            <ToggleButton
              key={cat}
              value={cat}
              sx={{
                px: 3,
                py: 1,
                borderColor: "#DEDEDE",
                "&.Mui-selected": { bgcolor: "#2B4C7E", color: "white", "&:hover": { bgcolor: "#1A3154" } },
              }}
            >
              {t(categoryKeys[cat])}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Vehicle grid */}
        <Grid container spacing={3}>
          {filtered.map((vehicle) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid #EDEDED",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={vehicle.image}
                    alt={vehicle.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <Chip
                    label={vehicle.available ? t("vehicles.available") : t("vehicles.unavailable")}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                      ...(vehicle.available
                        ? { bgcolor: "rgba(16,185,129,0.9)", color: "white" }
                        : { bgcolor: "rgba(0,0,0,0.6)", color: "white" }),
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {vehicle.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 2, color: "#5A5A5A" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <PeopleIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2">{vehicle.seats}{t("vehicles.seats")}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <SettingsIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2">{vehicle.transmission}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LocalGasStationIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2">{vehicle.fuelType}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {vehicle.features.map((f) => (
                      <Chip key={f} label={f} size="small" variant="outlined" sx={{ borderColor: "#DEDEDE", color: "#5A5A5A", fontSize: "0.75rem" }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2.5, pb: 2.5 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "#C23B22", fontSize: "1.3rem", lineHeight: 1 }}>
                      &yen;{vehicle.pricePerDay.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {t("vehicles.perDay")}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    href={`/booking?vehicle=${vehicle.id}`}
                    variant="contained"
                    disabled={!vehicle.available}
                    sx={{ bgcolor: "#2B4C7E", "&:hover": { bgcolor: "#1A3154" }, px: 3 }}
                  >
                    {t("vehicles.book")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
