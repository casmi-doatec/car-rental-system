"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles, scheduleEvents } from "@/data/demo";

export default function AvailabilityPage() {
  const { t } = useLanguage();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [category, setCategory] = useState("全て");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState(vehicles);

  const categories = ["全て", "コンパクト", "SUV", "バン"];

  const handleSearch = () => {
    if (!pickupDate || !returnDate) return;

    // Simulate availability check against schedule events
    const available = vehicles.filter((v) => {
      if (category !== "全て" && v.category !== category) return false;
      if (!v.available) return false;

      // Check if vehicle has bookings during requested period
      const hasConflict = scheduleEvents.some((event) => {
        if (event.vehicleId !== v.id) return false;
        return event.date >= pickupDate && event.date <= returnDate;
      });
      return !hasConflict;
    });

    setResults(available);
    setSearched(true);
  };

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const diff = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1920&h=600&fit=crop)",
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
            空車確認
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            ご希望の日程と車種で空き状況をお調べいたします。
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search Panel */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: "1px solid #E8E5E0", mb: 4 }}>
          <Typography sx={{ fontWeight: 600, mb: 3, fontSize: "1.1rem" }}>ご利用条件を入力</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="受取日"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="返却日"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                select
                label="車種カテゴリ"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={!pickupDate || !returnDate}
            sx={{
              mt: 3,
              bgcolor: "#B8363B",
              "&:hover": { bgcolor: "#9C2D31", transform: "translateY(-1px)" },
              borderRadius: 50,
              px: 5,
              transition: "all 0.3s ease",
            }}
          >
            空き状況を確認する
          </Button>
        </Paper>

        {/* Results */}
        {searched && (
          <>
            {results.length > 0 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                    検索結果: {results.length}台の車両が利用可能
                  </Typography>
                  {days > 0 && (
                    <Chip label={`${days}日間`} sx={{ bgcolor: "rgba(45,58,58,0.06)", fontWeight: 600 }} />
                  )}
                </Box>
                <Grid container spacing={3}>
                  {results.map((vehicle) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
                      <Card elevation={0} sx={{ border: "1px solid #E8E5E0", borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardMedia component="img" height="180" image={vehicle.image} alt={vehicle.name} sx={{ objectFit: "cover" }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography sx={{ fontWeight: 600, mb: 1 }}>{vehicle.name}</Typography>
                          <Box sx={{ display: "flex", gap: 1, color: "#6B6B6B", mb: 1 }}>
                            <PeopleIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{vehicle.seats}人乗り | {vehicle.transmission} | {vehicle.fuelType}</Typography>
                          </Box>
                          {days > 0 && (
                            <Box sx={{ mt: 1, p: 1.5, bgcolor: "#FAFAF7", borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ color: "#6B6B6B" }}>
                                {days}日間の見積り:
                              </Typography>
                              <Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.2rem" }}>
                                &yen;{(vehicle.pricePerDay * days).toLocaleString()}
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2 }}>
                          <Button
                            component={Link}
                            href={`/inquiry?vehicle=${vehicle.id}&pickup=${pickupDate}&return=${returnDate}`}
                            fullWidth
                            variant="contained"
                            sx={{
                              bgcolor: "#2D3A3A",
                              "&:hover": { bgcolor: "#1A2424", transform: "translateY(-1px)" },
                              borderRadius: 50,
                              transition: "all 0.3s ease",
                            }}
                          >
                            お問い合わせに進む
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                申し訳ございません。ご指定の条件では空き車両が見つかりませんでした。
                日程やカテゴリを変更してもう一度お試しください。
              </Alert>
            )}
          </>
        )}
      </Container>
    </>
  );
}
