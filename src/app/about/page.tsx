"use client";
import { Container, Typography, Box, Paper, Grid, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Box sx={{ position: "relative", backgroundImage: "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", color: "white", py: { xs: 5, md: 7 }, "&::before": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(45,58,58,0.92) 0%, rgba(45,58,58,0.85) 100%)" } }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>会社案内</Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 500 }}>COMPASSレンタカーについてご紹介します。</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Company overview */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>COMPASSについて</Typography>
            <Typography sx={{ color: "#6B6B6B", lineHeight: 2, mb: 2 }}>
              株式会社COMPASSは、沖縄を拠点とするプレミアムレンタカーサービスです。
              国内外のお客様に、安心・安全・快適なドライブ体験をお届けすることをミッションとしています。
            </Typography>
            <Typography sx={{ color: "#6B6B6B", lineHeight: 2 }}>
              多言語対応のサービスを通じて、言葉の壁を超えた丁寧なおもてなしを実現しています。
              車両はすべて定期的に整備・清掃を行い、最高の状態でお客様にお届けいたします。
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: 300, borderRadius: 2, backgroundImage: "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }} />
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Box sx={{ width: 40, height: 2, bgcolor: "#B8363B", mx: "auto", mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>私たちの強み</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { icon: <GroupsIcon sx={{ fontSize: 32 }} />, title: "多言語対応", desc: "日本語・英語・中国語でお客様をサポート。外国からのお客様にも安心してご利用いただけます。" },
              { icon: <BusinessIcon sx={{ fontSize: 32 }} />, title: "地域密着", desc: "沖縄の道路事情を熟知したスタッフが、おすすめのドライブコースやスポットをご案内いたします。" },
              { icon: <LocationOnIcon sx={{ fontSize: 32 }} />, title: "アクセス便利", desc: "沖縄の主要エリアからアクセスしやすい立地で、受取・返却もスムーズです。" },
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Paper elevation={0} sx={{ p: 4, border: "1px solid #E8E5E0", borderRadius: 2, height: "100%", textAlign: "center" }}>
                  <Box sx={{ color: "#2D3A3A", mb: 2 }}>{item.icon}</Box>
                  <Typography sx={{ fontWeight: 600, mb: 1.5 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#6B6B6B", lineHeight: 1.8 }}>{item.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company info table */}
        <Paper elevation={0} sx={{ border: "1px solid #E8E5E0", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>会社概要</Typography>
          </Box>
          <Box sx={{ p: 0 }}>
            {[
              { label: "会社名", value: "株式会社COMPASS" },
              { label: "所在地", value: "沖縄県" },
              { label: "代表者", value: "代表取締役" },
              { label: "設立", value: "2024年" },
              { label: "事業内容", value: "レンタカー事業、車両管理、観光案内サービス" },
              { label: "対応言語", value: "日本語、英語、中国語" },
              { label: "営業時間", value: "8:00〜20:00（年中無休）" },
              { label: "電話番号", value: "+81-98-XXX-XXXX" },
              { label: "メール", value: "info@compass-rental.jp" },
            ].map((row, idx) => (
              <Box key={idx} sx={{ display: "flex", borderBottom: idx < 8 ? "1px solid #F0F0F0" : "none" }}>
                <Box sx={{ width: 160, flexShrink: 0, p: 2, bgcolor: "#FAFAF7", fontWeight: 500, fontSize: "0.9rem" }}>{row.label}</Box>
                <Box sx={{ p: 2, fontSize: "0.9rem", color: "#2D2D2D" }}>{row.value}</Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  );
}
