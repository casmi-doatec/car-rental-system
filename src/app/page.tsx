"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Rating,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SecurityIcon from "@mui/icons-material/Security";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { vehicles } from "@/data/demo";

const testimonials = [
  { name: "Emily R.", country: "USA", rating: 5, text: "Excellent service! The car was spotless and the staff spoke perfect English. Made our Okinawa trip so much easier.", avatar: "E" },
  { name: "佐藤 美咲", country: "Japan", rating: 5, text: "初めてのレンタカーでしたが、スタッフの方が丁寧に説明してくれて安心できました。車も新しくて快適でした。", avatar: "佐" },
  { name: "Wang L.", country: "China", rating: 4, text: "车辆很新很干净，服务人员态度很好。中文沟通完全没有问题，推荐给来冲绳旅游的朋友。", avatar: "W" },
  { name: "Suzuki T.", country: "Japan", rating: 5, text: "車がとても綺麗で、料金も分かりやすかったです。外国の友人にも安心して勧められるサービスです。", avatar: "S" },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | false>(false);

  const features = [
    { icon: <TranslateIcon sx={{ fontSize: 32 }} />, title: t("home.features.multilingual"), desc: t("home.features.multilingual.desc") },
    { icon: <AccessTimeIcon sx={{ fontSize: 32 }} />, title: t("home.features.flexible"), desc: t("home.features.flexible.desc") },
    { icon: <SupportAgentIcon sx={{ fontSize: 32 }} />, title: t("home.features.support"), desc: t("home.features.support.desc") },
    { icon: <SecurityIcon sx={{ fontSize: 32 }} />, title: t("home.features.insurance"), desc: t("home.features.insurance.desc") },
    { icon: <CleaningServicesIcon sx={{ fontSize: 32 }} />, title: t("home.features.clean"), desc: t("home.features.clean.desc") },
    { icon: <PriceCheckIcon sx={{ fontSize: 32 }} />, title: t("home.features.price"), desc: t("home.features.price.desc") },
  ];

  const steps = [
    { icon: <DirectionsCarIcon sx={{ fontSize: 36 }} />, num: "01", title: t("home.howItWorks.step1.title"), desc: t("home.howItWorks.step1.desc") },
    { icon: <DescriptionIcon sx={{ fontSize: 36 }} />, num: "02", title: t("home.howItWorks.step2.title"), desc: t("home.howItWorks.step2.desc") },
    { icon: <VerifiedUserIcon sx={{ fontSize: 36 }} />, num: "03", title: t("home.howItWorks.step3.title"), desc: t("home.howItWorks.step3.desc") },
    { icon: <EmojiTransportationIcon sx={{ fontSize: 36 }} />, num: "04", title: t("home.howItWorks.step4.title"), desc: t("home.howItWorks.step4.desc") },
  ];

  const faqs = [
    { q: t("home.faq.q1"), a: t("home.faq.a1") },
    { q: t("home.faq.q2"), a: t("home.faq.a2") },
    { q: t("home.faq.q3"), a: t("home.faq.a3") },
    { q: t("home.faq.q4"), a: t("home.faq.a4") },
    { q: t("home.faq.q5"), a: t("home.faq.a5") },
  ];

  const popularVehicles = vehicles.filter((v) => v.available).slice(0, 3);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=900&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: { xs: 10, md: 16 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(26,49,84,0.92) 0%, rgba(43,76,126,0.85) 50%, rgba(58,107,165,0.8) 100%)",
            zIndex: 0,
          },
        }}
      >

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              {/* Accent bar */}
              <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mb: 3, borderRadius: 2 }} />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                  lineHeight: 1.3,
                  mb: 3,
                  letterSpacing: "0.02em",
                }}
              >
                {t("home.hero.title")}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  opacity: 0.85,
                  lineHeight: 1.8,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                {t("home.hero.subtitle")}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  href="/vehicles"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#C23B22",
                    "&:hover": { bgcolor: "#A33018" },
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: 2,
                  }}
                >
                  {t("home.hero.cta")}
                </Button>
                <Button
                  href="#how-it-works"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: 2,
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  {t("home.hero.secondary")}
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  p: 4,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  {[
                    { label: t("admin.stats.vehicles"), value: "26+" },
                    { label: t("admin.stats.totalBookings"), value: "500+" },
                  ].map((stat) => (
                    <Box key={stat.label} sx={{ textAlign: "center" }}>
                      <Typography sx={{ fontSize: "2rem", fontWeight: 800 }}>{stat.value}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", opacity: 0.7 }}>{stat.label}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", pt: 2, mt: 1 }}>
                  <Typography sx={{ fontSize: "0.8rem", opacity: 0.6, textAlign: "center" }}>
                    多言語対応：日本語 / English / 中文
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== FEATURES SECTION ===== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.features.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.features.subtitle")}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #EDEDED",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      borderColor: "#2B4C7E",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "rgba(43,76,126,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2B4C7E",
                        mb: 2.5,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, color: "#1C1C1C" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5A5A5A", lineHeight: 1.8 }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== POPULAR VEHICLES SECTION ===== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FAF8F5" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.popular.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.popular.subtitle")}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {popularVehicles.map((vehicle) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
                <Card
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
                  elevation={0}
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
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {vehicle.name}
                      </Typography>
                      <Chip label={vehicle.category} size="small" sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5A5A5A" }}>
                      <PeopleIcon fontSize="small" />
                      <Typography variant="body2">{vehicle.seats} {t("vehicles.seats")}</Typography>
                      <Typography variant="body2">|</Typography>
                      <Typography variant="body2">{vehicle.transmission}</Typography>
                      <Typography variant="body2">|</Typography>
                      <Typography variant="body2">{vehicle.fuelType}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    <Typography sx={{ fontWeight: 700, color: "#C23B22", fontSize: "1.2rem" }}>
                      &yen;{vehicle.pricePerDay.toLocaleString()}
                      <Typography component="span" variant="body2" sx={{ color: "#999", ml: 0.3 }}>
                        {t("vehicles.perDay")}
                      </Typography>
                    </Typography>
                    <Button
                      component={Link}
                      href={`/booking?vehicle=${vehicle.id}`}
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: "#2B4C7E", "&:hover": { bgcolor: "#1A3154" } }}
                    >
                      {t("vehicles.book")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              component={Link}
              href="/vehicles"
              variant="outlined"
              size="large"
              sx={{ borderColor: "#2B4C7E", color: "#2B4C7E", px: 5, borderRadius: 2 }}
            >
              {t("home.popular.viewAll")}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.howItWorks.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.howItWorks.subtitle")}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Box sx={{ textAlign: "center", position: "relative" }}>
                  <Typography sx={{ fontSize: "3rem", fontWeight: 800, color: "rgba(43,76,126,0.08)", lineHeight: 1 }}>
                    {step.num}
                  </Typography>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "#2B4C7E",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      mt: -2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5A5A5A", lineHeight: 1.8 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== PRICING SECTION ===== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FAF8F5" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.pricing.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.pricing.subtitle")}
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {[
              { name: t("home.pricing.daily"), price: "4,000", badge: "", includes: [t("home.pricing.insurance"), t("home.pricing.roadside"), t("home.pricing.multilingual")] },
              { name: t("home.pricing.weekly"), price: "25,200", badge: t("home.pricing.discount.weekly"), includes: [t("home.pricing.insurance"), t("home.pricing.roadside"), t("home.pricing.unlimited"), t("home.pricing.multilingual")] },
              { name: t("home.pricing.monthly"), price: "90,000", badge: t("home.pricing.discount.monthly"), includes: [t("home.pricing.insurance"), t("home.pricing.roadside"), t("home.pricing.unlimited"), t("home.pricing.multilingual")] },
            ].map((plan, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 3,
                    border: idx === 1 ? "2px solid #2B4C7E" : "1px solid #EDEDED",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" },
                  }}
                >
                  {plan.badge && (
                    <Chip
                      label={plan.badge}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "#C23B22",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2B4C7E", mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography component="span" sx={{ fontSize: "0.9rem", color: "#999" }}>
                      {t("home.pricing.from")}
                    </Typography>
                    <Typography component="span" sx={{ fontSize: "2.2rem", fontWeight: 800, color: "#1C1C1C", mx: 0.5 }}>
                      &yen;{plan.price}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "#999", display: "block", mb: 2 }}>
                    {t("home.pricing.includes")}:
                  </Typography>
                  {plan.includes.map((item) => (
                    <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: "#2B4C7E" }} />
                      <Typography variant="body2" sx={{ color: "#5A5A5A" }}>{item}</Typography>
                    </Box>
                  ))}
                  <Button
                    component={Link}
                    href="/booking"
                    fullWidth
                    variant={idx === 1 ? "contained" : "outlined"}
                    sx={{
                      mt: 3,
                      py: 1.2,
                      ...(idx === 1
                        ? { bgcolor: "#2B4C7E", "&:hover": { bgcolor: "#1A3154" } }
                        : { borderColor: "#2B4C7E", color: "#2B4C7E" }),
                    }}
                  >
                    {t("home.cta.button")}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.testimonials.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.testimonials.subtitle")}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((review, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #EDEDED",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Avatar sx={{ bgcolor: "#2B4C7E", width: 40, height: 40, fontSize: 16 }}>
                        {review.avatar}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>{review.name}</Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>{review.country}</Typography>
                      </Box>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" sx={{ color: "#5A5A5A", lineHeight: 1.8 }}>
                      {review.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== FAQ SECTION ===== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FAF8F5" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ width: 48, height: 3, bgcolor: "#C23B22", mx: "auto", mb: 2, borderRadius: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: "#1C1C1C" }}>
              {t("home.faq.title")}
            </Typography>
            <Typography sx={{ color: "#5A5A5A", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              {t("home.faq.subtitle")}
            </Typography>
          </Box>

          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === `faq-${idx}`}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? `faq-${idx}` : false)}
              elevation={0}
              sx={{
                mb: 1.5,
                border: "1px solid #EDEDED",
                borderRadius: "12px !important",
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 0.5 }}>
                <Typography sx={{ fontWeight: 600, color: "#1C1C1C" }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ borderTop: "1px solid #EDEDED" }}>
                <Typography sx={{ color: "#5A5A5A", lineHeight: 1.8 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* ===== CTA SECTION ===== */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(160deg, #1A3154 0%, #2B4C7E 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            {t("home.cta.title")}
          </Typography>
          <Typography sx={{ opacity: 0.8, mb: 4, lineHeight: 1.8, maxWidth: 500, mx: "auto" }}>
            {t("home.cta.subtitle")}
          </Typography>
          <Button
            component={Link}
            href="/booking"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#C23B22",
              "&:hover": { bgcolor: "#A33018" },
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 2,
            }}
          >
            {t("home.cta.button")}
          </Button>
        </Container>
      </Box>
    </>
  );
}
