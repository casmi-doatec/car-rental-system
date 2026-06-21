"use client";
import { Box, Typography, Container, Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#1a1a2e", color: "white", py: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }} gutterBottom>
              COMPASS Rental
            </Typography>
            <Typography variant="body2" color="grey.400">
              Premium car rental service in Okinawa, Japan.
              Multilingual support available.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }} gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="grey.400">
              Okinawa, Japan
            </Typography>
            <Typography variant="body2" color="grey.400">
              +81-98-XXX-XXXX
            </Typography>
            <Typography variant="body2" color="grey.400">
              info@compass-rental.jp
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }} gutterBottom>
              Hours
            </Typography>
            <Typography variant="body2" color="grey.400">
              Monday - Sunday
            </Typography>
            <Typography variant="body2" color="grey.400">
              8:00 AM - 8:00 PM
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="grey.500" sx={{ mt: 4, textAlign: "center" }}>
          &copy; 2026 COMPASS Co., Ltd. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
