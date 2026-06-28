"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Divider,
  Alert,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Link from "next/link";
import { vehicles } from "@/data/demo";

// Simulated quote data
const demoQuotes: Record<string, { customerName: string; vehicleId: string; pickupDate: string; returnDate: string; totalAmount: number; createdAt: string; }> = {
  "QT-2026-001": { customerName: "田中 健太", vehicleId: "v1", pickupDate: "2026-06-25", returnDate: "2026-06-28", totalAmount: 15000, createdAt: "2026-06-22" },
  "QT-2026-002": { customerName: "佐藤 美咲", vehicleId: "v8", pickupDate: "2026-06-27", returnDate: "2026-07-02", totalAmount: 60000, createdAt: "2026-06-22" },
  "QT-2026-003": { customerName: "山本 悠希", vehicleId: "v13", pickupDate: "2026-07-01", returnDate: "2026-07-05", totalAmount: 52000, createdAt: "2026-06-22" },
};

export default function QuotePage() {
  const params = useParams();
  const quoteId = params.id as string;
  const [status, setStatus] = useState<"viewing" | "confirmed" | "cancelled">("viewing");

  const quote = demoQuotes[quoteId];

  if (!quote) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>お見積りが見つかりません</Typography>
        <Typography sx={{ color: "#6B6B6B" }}>URLをご確認ください。</Typography>
      </Container>
    );
  }

  const vehicle = vehicles.find((v) => v.id === quote.vehicleId);
  const days = Math.ceil((new Date(quote.returnDate).getTime() - new Date(quote.pickupDate).getTime()) / (1000 * 60 * 60 * 24));

  if (status === "confirmed") {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <CheckCircleOutlinedIcon sx={{ fontSize: 72, color: "#10b981", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>お見積りを承認しました</Typography>
        <Typography sx={{ color: "#6B6B6B", mb: 3, lineHeight: 1.8 }}>
          ありがとうございます。担当者より予約フォームのご案内をメールでお送りいたします。
        </Typography>
        <Alert severity="success" sx={{ textAlign: "left", borderRadius: 2, mb: 3 }}>
          <Typography variant="body2">見積番号: {quoteId}</Typography>
          <Typography variant="body2">次のステップ: 予約フォームにご記入ください。</Typography>
        </Alert>
        <Button component={Link} href={`/booking-form?vehicle=${quote.vehicleId}`} variant="contained" size="large" sx={{ bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50, px: 5 }}>
          予約フォームに進む
        </Button>
      </Container>
    );
  }

  if (status === "cancelled") {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <CancelOutlinedIcon sx={{ fontSize: 72, color: "#B8363B", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>お見積りをキャンセルしました</Typography>
        <Typography sx={{ color: "#6B6B6B", lineHeight: 1.8 }}>
          ご利用いただきありがとうございました。またのご利用をお待ちしております。
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ border: "1px solid #E8E5E0", borderRadius: 2, overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ p: 4, bgcolor: "#2D3A3A", color: "white" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography sx={{ fontSize: "0.8rem", opacity: 0.6, letterSpacing: "0.1em", mb: 0.5 }}>COMPASS レンタカー</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>御見積書</Typography>
            </Box>
            <Chip label={quoteId} sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "white" }} />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <Typography sx={{ fontWeight: 600, mb: 2 }}>{quote.customerName} 様</Typography>
          <Typography variant="body2" sx={{ color: "#6B6B6B", mb: 3, lineHeight: 1.8 }}>
            この度はお問い合わせいただきありがとうございます。
            下記の内容でお見積りをお送りいたします。ご確認の上、よろしければ「承認する」ボタンを押してください。
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "0.9rem", color: "#6B6B6B" }}>見積内容</Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0, width: 140 }}>車両</TableCell>
                <TableCell sx={{ border: "none" }}>{vehicle?.name || quote.vehicleId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0 }}>カテゴリ</TableCell>
                <TableCell sx={{ border: "none" }}>{vehicle?.category} / {vehicle?.seats}人乗り / {vehicle?.transmission}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0 }}>受取日</TableCell>
                <TableCell sx={{ border: "none" }}>{quote.pickupDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0 }}>返却日</TableCell>
                <TableCell sx={{ border: "none" }}>{quote.returnDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0 }}>日数</TableCell>
                <TableCell sx={{ border: "none" }}>{days}日間</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, border: "none", pl: 0 }}>日額料金</TableCell>
                <TableCell sx={{ border: "none" }}>&yen;{vehicle?.pricePerDay.toLocaleString()}/日</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>合計金額（税込）</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", color: "#B8363B" }}>
              &yen;{quote.totalAmount.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#999" }}>
            ※ ETC高速道路料金は返却時に別途精算いたします。
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" sx={{ color: "#6B6B6B", mb: 1 }}>
            発行日: {quote.createdAt}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B6B6B", mb: 3 }}>
            お支払方法: 車両受取時に現金でお支払い
          </Typography>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => setStatus("confirmed")}
                sx={{
                  bgcolor: "#2D3A3A",
                  "&:hover": { bgcolor: "#1A2424", transform: "translateY(-1px)" },
                  borderRadius: 50,
                  py: 1.5,
                  transition: "all 0.3s ease",
                }}
              >
                承認する
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => setStatus("cancelled")}
                sx={{
                  borderColor: "#E8E5E0",
                  color: "#6B6B6B",
                  "&:hover": { borderColor: "#B8363B", color: "#B8363B" },
                  borderRadius: 50,
                  py: 1.5,
                  transition: "all 0.3s ease",
                }}
              >
                キャンセル
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
