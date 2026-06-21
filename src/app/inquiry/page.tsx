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
  Grid,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles } from "@/data/demo";

export default function InquiryPage() {
  return (
    <Suspense>
      <InquiryForm />
    </Suspense>
  );
}

function InquiryForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicle") || "";
  const pickupDate = searchParams.get("pickup") || "";
  const returnDate = searchParams.get("return") || "";

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    language: "日本語",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "氏名を入力してください";
    if (!form.email.trim()) newErrors.email = "メールアドレスを入力してください";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "有効なメールアドレスを入力してください";
    if (!form.phone.trim()) newErrors.phone = "電話番号を入力してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const update = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const days = pickupDate && returnDate
    ? Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <>
      {/* Header */}
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
            background: "linear-gradient(160deg, rgba(45,58,58,0.92) 0%, rgba(45,58,58,0.85) 100%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            お問い合わせフォーム
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            お客様の情報をご入力ください。確認後、お見積りをお送りいたします。
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {submitted ? (
          <Paper elevation={0} sx={{ p: 5, border: "1px solid #E8E5E0", borderRadius: 2, textAlign: "center", maxWidth: 600, mx: "auto" }}>
            <CheckCircleOutlinedIcon sx={{ fontSize: 64, color: "#10b981", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              お問い合わせを受け付けました
            </Typography>
            <Typography sx={{ color: "#6B6B6B", mb: 3, lineHeight: 1.8 }}>
              ご入力いただいたメールアドレスに確認メールをお送りいたしました。
              担当者より折り返しお見積りをお送りいたしますので、しばらくお待ちください。
            </Typography>
            <Alert severity="info" sx={{ textAlign: "left", borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>お問い合わせ番号: INQ-2026-0016</Typography>
              <Typography variant="body2">この番号は今後のお問い合わせ時にご利用ください。</Typography>
            </Alert>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Form */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={0} sx={{ p: 4, border: "1px solid #E8E5E0", borderRadius: 2 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography sx={{ fontWeight: 600, mb: 3 }}>お客様情報</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="氏名"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label="メールアドレス"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="電話番号"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        select
                        label="ご希望の対応言語"
                        value={form.language}
                        onChange={(e) => update("language", e.target.value)}
                      >
                        {["日本語", "English", "中文"].map((lang) => (
                          <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="ご要望・ご質問（任意）"
                        value={form.requests}
                        onChange={(e) => update("requests", e.target.value)}
                        placeholder="チャイルドシート希望、空港送迎希望など"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: "#B8363B",
                      "&:hover": { bgcolor: "#9C2D31", transform: "translateY(-1px)" },
                      borderRadius: 50,
                      py: 1.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    お問い合わせを送信する
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
              {/* Selected vehicle info */}
              {selectedVehicle && (
                <Paper elevation={0} sx={{ p: 3, border: "1px solid #E8E5E0", borderRadius: 2, mb: 3 }}>
                  <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.9rem", color: "#6B6B6B" }}>ご選択の車両</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 0.5 }}>{selectedVehicle.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#6B6B6B", mb: 1 }}>
                    {selectedVehicle.category} | {selectedVehicle.seats}人乗り | {selectedVehicle.transmission}
                  </Typography>
                  {pickupDate && returnDate && (
                    <>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body2" sx={{ color: "#6B6B6B" }}>受取日: {pickupDate}</Typography>
                      <Typography variant="body2" sx={{ color: "#6B6B6B" }}>返却日: {returnDate}</Typography>
                      {days > 0 && (
                        <Box sx={{ mt: 1.5, p: 1.5, bgcolor: "#FAFAF7", borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ color: "#6B6B6B" }}>見積り金額（税込）</Typography>
                          <Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.3rem" }}>
                            &yen;{(selectedVehicle.pricePerDay * days).toLocaleString()}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            ({days}日 x &yen;{selectedVehicle.pricePerDay.toLocaleString()})
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Paper>
              )}

              {/* Flow */}
              <Paper elevation={0} sx={{ p: 3, border: "1px solid #E8E5E0", borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.9rem", color: "#6B6B6B" }}>ご予約の流れ</Typography>
                <Stepper orientation="vertical" activeStep={0}>
                  {[
                    "お問い合わせ送信",
                    "お見積りの確認",
                    "予約フォーム記入",
                    "車両受取・お支払い",
                  ].map((step, idx) => (
                    <Step key={idx} active={idx === 0} completed={false}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
