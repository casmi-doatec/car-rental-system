"use client";
import { useState } from "react";
import {
  Container, Typography, TextField, MenuItem, Button, Box, Paper, Grid, Card, CardMedia, CardContent, CardActions, Chip, Alert, Checkbox, FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles, scheduleEvents, rentalOptions } from "@/data/demo";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function AvailabilityPage() {
  const { t } = useLanguage();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");
  const [category, setCategory] = useState("全て");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState(vehicles);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const categories = ["全て", "コンパクト", "SUV", "バン"];

  const handleSearch = () => {
    if (!pickupDate || !returnDate) return;
    const available = vehicles.filter((v) => {
      if (category !== "全て" && v.category !== category) return false;
      if (!v.available) return false;
      const hasConflict = scheduleEvents.some((event) => {
        if (event.vehicleId !== v.id) return false;
        return event.date >= pickupDate && event.date <= returnDate;
      });
      return !hasConflict;
    });
    setResults(available);
    setSearched(true);
  };

  const days = pickupDate && returnDate ? Math.max(0, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000)) : 0;

  const optionsTotal = selectedOptions.reduce((sum, id) => {
    const opt = rentalOptions.find((o) => o.id === id);
    return sum + (opt ? opt.pricePerDay * days : 0);
  }, 0);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);
  };

  return (
    <>
      <Box sx={{ position: "relative", backgroundImage: "url(https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1920&h=600&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", color: "white", py: { xs: 5, md: 7 }, "&::before": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(45,58,58,0.92) 0%, rgba(45,58,58,0.85) 100%)" } }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>空車確認</Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>ご希望の日程と車種で空き状況をお調べいたします。</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: "1px solid #E8E5E0", mb: 4 }}>
          <Typography sx={{ fontWeight: 600, mb: 3, fontSize: "1.1rem" }}>ご利用条件を入力</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth type="date" label="受取日" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 6, sm: 2 }}><TextField fullWidth select label="受取時間" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>{timeSlots.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth type="date" label="返却日" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 6, sm: 2 }}><TextField fullWidth select label="返却時間" value={returnTime} onChange={(e) => setReturnTime(e.target.value)}>{timeSlots.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, sm: 2 }}><TextField fullWidth select label="車種" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>
          </Grid>

          {/* Options */}
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.95rem" }}>オプション品（任意）</Typography>
            <Grid container spacing={1}>
              {rentalOptions.filter((o) => o.available).map((opt) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={opt.id}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedOptions.includes(opt.id)} onChange={() => toggleOption(opt.id)} size="small" />}
                    label={<Typography variant="body2">{opt.name} <Typography component="span" variant="body2" sx={{ color: "#B8363B", fontWeight: 600 }}>¥{opt.pricePerDay.toLocaleString()}/日</Typography></Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Button variant="contained" size="large" startIcon={<SearchIcon />} onClick={handleSearch} disabled={!pickupDate || !returnDate} sx={{ mt: 3, bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31", transform: "translateY(-1px)" }, borderRadius: 50, px: 5, transition: "all 0.3s ease" }}>
            空き状況を確認する
          </Button>
        </Paper>

        {searched && (
          <>
            {results.length > 0 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>検索結果: {results.length}台の車両が利用可能</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {days > 0 && <Chip label={`${days}日間`} />}
                    <Chip label={`${pickupDate} ${pickupTime} 〜 ${returnDate} ${returnTime}`} variant="outlined" />
                  </Box>
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
                              <Typography variant="body2" sx={{ color: "#6B6B6B" }}>車両: ¥{(vehicle.pricePerDay * days).toLocaleString()}</Typography>
                              {optionsTotal > 0 && <Typography variant="body2" sx={{ color: "#6B6B6B" }}>オプション: ¥{optionsTotal.toLocaleString()}</Typography>}
                              <Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.2rem", mt: 0.5 }}>合計: ¥{(vehicle.pricePerDay * days + optionsTotal).toLocaleString()}</Typography>
                            </Box>
                          )}
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2 }}>
                          <Button component={Link} href={`/inquiry?vehicle=${vehicle.id}&pickup=${pickupDate}&return=${returnDate}&pickupTime=${pickupTime}&returnTime=${returnTime}&options=${selectedOptions.join(",")}`} fullWidth variant="contained" sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424", transform: "translateY(-1px)" }, borderRadius: 50, transition: "all 0.3s ease" }}>
                            お問い合わせに進む
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Alert severity="info" sx={{ borderRadius: 2 }}>申し訳ございません。ご指定の条件では空き車両が見つかりませんでした。日程やカテゴリを変更してもう一度お試しください。</Alert>
            )}
          </>
        )}
      </Container>
    </>
  );
}
