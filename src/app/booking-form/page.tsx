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
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { vehicles } from "@/data/demo";

export default function BookingFormPage() {
  return (
    <Suspense>
      <BookingFormContent />
    </Suspense>
  );
}

function BookingFormContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicle") || "v1";
  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    dob: "",
    licenseNumber: "",
    licenseExpiry: "",
    passportNumber: "",
    phone: "",
    email: "",
    emergencyContact: "",
    emergencyPhone: "",
    pickupTime: "10:00",
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.lastName) e.lastName = "姓を入力してください";
    if (!form.firstName) e.firstName = "名を入力してください";
    if (!form.dob) e.dob = "生年月日を入力してください";
    if (!form.licenseNumber) e.licenseNumber = "免許証番号を入力してください";
    if (!form.licenseExpiry) e.licenseExpiry = "免許証有効期限を入力してください";
    if (!form.phone) e.phone = "電話番号を入力してください";
    if (!form.email) e.email = "メールアドレスを入力してください";
    if (!form.emergencyContact) e.emergencyContact = "緊急連絡先を入力してください";
    if (!form.emergencyPhone) e.emergencyPhone = "緊急連絡先電話番号を入力してください";
    if (!form.termsAccepted) e.termsAccepted = "利用規約に同意してください";
    if (!form.privacyAccepted) e.privacyAccepted = "個人情報の取り扱いに同意してください";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const update = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <CheckCircleOutlinedIcon sx={{ fontSize: 72, color: "#10b981", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          予約フォームを受け付けました
        </Typography>
        <Typography sx={{ color: "#6B6B6B", mb: 3, lineHeight: 1.8 }}>
          ご入力いただいた内容を確認し、注文書をメールでお送りいたします。
          内容をご確認の上、車両受取日にお越しください。
        </Typography>
        <Alert severity="info" sx={{ textAlign: "left", borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>予約番号: BK-2026-0042</Typography>
          <Typography variant="body2">担当者より確認のご連絡を差し上げます。</Typography>
        </Alert>
        <Alert severity="warning" sx={{ textAlign: "left", borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>お支払いについて</Typography>
          <Typography variant="body2">車両代金は受取時に現金でお支払いいただきます。</Typography>
        </Alert>
      </Container>
    );
  }

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
            予約フォーム
          </Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>
            お客様の詳細情報をご入力ください。すべての項目は必須です。
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: 4, border: "1px solid #E8E5E0", borderRadius: 2 }}>
              <Box component="form" onSubmit={handleSubmit}>
                {/* Personal Info */}
                <Typography sx={{ fontWeight: 600, mb: 2 }}>基本情報</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth required label="姓" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} error={!!errors.lastName} helperText={errors.lastName} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth required label="名" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} error={!!errors.firstName} helperText={errors.firstName} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth label="姓（カナ）" value={form.lastNameKana} onChange={(e) => update("lastNameKana", e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth label="名（カナ）" value={form.firstNameKana} onChange={(e) => update("firstNameKana", e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required type="date" label="生年月日" value={form.dob} onChange={(e) => update("dob", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} error={!!errors.dob} helperText={errors.dob} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required type="email" label="メールアドレス" value={form.email} onChange={(e) => update("email", e.target.value)} error={!!errors.email} helperText={errors.email} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required label="電話番号" value={form.phone} onChange={(e) => update("phone", e.target.value)} error={!!errors.phone} helperText={errors.phone} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* License Info */}
                <Typography sx={{ fontWeight: 600, mb: 2 }}>運転免許証情報</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required label="免許証番号" value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} error={!!errors.licenseNumber} helperText={errors.licenseNumber} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required type="date" label="免許証有効期限" value={form.licenseExpiry} onChange={(e) => update("licenseExpiry", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} error={!!errors.licenseExpiry} helperText={errors.licenseExpiry} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="パスポート番号（外国籍の方）" value={form.passportNumber} onChange={(e) => update("passportNumber", e.target.value)} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Emergency Contact */}
                <Typography sx={{ fontWeight: 600, mb: 2 }}>緊急連絡先</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required label="緊急連絡先氏名" value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} error={!!errors.emergencyContact} helperText={errors.emergencyContact} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth required label="緊急連絡先電話番号" value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} error={!!errors.emergencyPhone} helperText={errors.emergencyPhone} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Pickup preference */}
                <Typography sx={{ fontWeight: 600, mb: 2 }}>受取希望時間</Typography>
                <TextField
                  select
                  fullWidth
                  value={form.pickupTime}
                  onChange={(e) => update("pickupTime", e.target.value)}
                  sx={{ maxWidth: 200 }}
                >
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                  ))}
                </TextField>

                <Divider sx={{ my: 4 }} />

                {/* Consent */}
                <Typography sx={{ fontWeight: 600, mb: 2 }}>同意事項</Typography>
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={form.termsAccepted} onChange={(e) => update("termsAccepted", e.target.checked)} />}
                    label="利用規約に同意します"
                  />
                  {errors.termsAccepted && <Typography variant="caption" color="error" sx={{ display: "block", ml: 4 }}>{errors.termsAccepted}</Typography>}
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={form.privacyAccepted} onChange={(e) => update("privacyAccepted", e.target.checked)} />}
                    label="個人情報の取り扱いについて同意します"
                  />
                  {errors.privacyAccepted && <Typography variant="caption" color="error" sx={{ display: "block", ml: 4 }}>{errors.privacyAccepted}</Typography>}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 4,
                    bgcolor: "#B8363B",
                    "&:hover": { bgcolor: "#9C2D31", transform: "translateY(-1px)" },
                    borderRadius: 50,
                    py: 1.5,
                    fontSize: "1.05rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  予約を確定する
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {selectedVehicle && (
              <Paper elevation={0} sx={{ p: 3, border: "1px solid #E8E5E0", borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.9rem", color: "#6B6B6B" }}>ご予約車両</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 0.5 }}>{selectedVehicle.name}</Typography>
                <Typography variant="body2" sx={{ color: "#6B6B6B" }}>
                  {selectedVehicle.category} | {selectedVehicle.seats}人乗り | {selectedVehicle.transmission}
                </Typography>
                <Typography sx={{ fontWeight: 700, color: "#B8363B", mt: 1.5, fontSize: "1.2rem" }}>
                  &yen;{selectedVehicle.pricePerDay.toLocaleString()}/日
                </Typography>
              </Paper>
            )}

            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E8E5E0", borderRadius: 2, mt: 3 }}>
              <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.9rem", color: "#6B6B6B" }}>必要書類（当日持参）</Typography>
              {["運転免許証（原本）", "パスポート（外国籍の方）", "現金（車両代金）"].map((doc) => (
                <Typography key={doc} variant="body2" sx={{ color: "#2D2D2D", mb: 1, pl: 1, borderLeft: "2px solid #B8363B" }}>
                  {doc}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
