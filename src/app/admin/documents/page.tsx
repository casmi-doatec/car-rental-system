"use client";
import { useState } from "react";
import { Typography, Box, Paper, Grid, Card, CardContent, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import jsPDF from "jspdf";

const documentTypes = [
  { id: "estimate", title: "見積書", count: 12, color: "#3b82f6" },
  { id: "order", title: "注文書（発注書）", count: 8, color: "#10b981" },
  { id: "contract", title: "賃貸契約書", count: 8, color: "#8b5cf6" },
  { id: "vehicle_check", title: "車両確認書", count: 6, color: "#f59e0b" },
  { id: "personal_info", title: "個人情報確認書", count: 10, color: "#ec4899" },
  { id: "receipt", title: "請求書・領収書", count: 15, color: "#06b6d4" },
];

const recentDocs = [
  { id: "DOC-001", type: "見積書", customer: "田中 健太", booking: "b1", createdAt: "2026-06-22", status: "sent" },
  { id: "DOC-002", type: "注文書", customer: "佐藤 美咲", booking: "b2", createdAt: "2026-06-21", status: "sent" },
  { id: "DOC-003", type: "賃貸契約書", customer: "田中 健太", booking: "b1", createdAt: "2026-06-22", status: "pending" },
  { id: "DOC-004", type: "車両確認書", customer: "伊藤 大輔", booking: "b4", createdAt: "2026-06-10", status: "signed" },
  { id: "DOC-005", type: "個人情報確認書", customer: "高橋 あかり", booking: "b6", createdAt: "2026-06-20", status: "signed" },
  { id: "DOC-006", type: "見積書", customer: "中村 蓮", booking: "b7", createdAt: "2026-06-22", status: "draft" },
];

const statusMap: Record<string, { label: string; color: "default" | "info" | "success" | "warning" }> = {
  draft: { label: "下書き", color: "default" },
  pending: { label: "未署名", color: "warning" },
  sent: { label: "送付済", color: "info" },
  signed: { label: "署名済", color: "success" },
};

function generateDocPDF(docType: string, customer: string, bookingId: string) {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("ja-JP");
  const headers: Record<string, { title: string; lines: string[] }> = {
    "見積書": { title: "ESTIMATE", lines: ["This document serves as an official estimate.", `Customer: ${customer}`, `Booking: ${bookingId}`, `Date: ${date}`, "", "Vehicle: Toyota Aqua", "Period: 2026-06-25 ~ 2026-06-28 (3 days)", "Daily Rate: JPY 5,000", "", "Subtotal: JPY 15,000", "Tax (10%): JPY 1,500", "Total: JPY 16,500", "", "Payment: Cash at pickup", "Valid for 14 days from issue date."] },
    "注文書": { title: "ORDER SHEET", lines: ["This document confirms the rental order.", `Customer: ${customer}`, `Booking: ${bookingId}`, `Date: ${date}`, "", "Vehicle: Toyota Aqua (AT / Hybrid / 5 seats)", "Pickup: 2026-06-25 10:00", "Return: 2026-06-28 10:00", "", "Total: JPY 16,500 (tax included)", "Payment: Cash at pickup", "", "ETC tolls settled separately at return."] },
    "賃貸契約書": { title: "RENTAL CONTRACT", lines: ["RENTAL AGREEMENT", `Customer: ${customer}`, `Booking: ${bookingId}`, `Date: ${date}`, "", "1. The Renter agrees to use the vehicle solely for lawful purposes.", "2. The Renter is responsible for all traffic violations.", "3. Insurance coverage is included as per the rental plan.", "4. The vehicle must be returned in the same condition.", "5. Late return fees: JPY 3,000 per hour.", "6. Fuel: Return with full tank or pay refueling fee.", "", "Renter Signature: _________________", "Staff Signature: _________________"] },
    "車両確認書": { title: "VEHICLE INSPECTION", lines: ["VEHICLE CONDITION CHECK", `Customer: ${customer}`, `Booking: ${bookingId}`, `Date: ${date}`, "", "Vehicle: Toyota Aqua", "License Plate: OKI 123-4567", "Mileage at pickup: 23,456 km", "Fuel level: Full", "", "Exterior: [ ] No damage  [ ] Scratches noted", "Interior: [ ] Clean  [ ] Issues noted", "Tires: [ ] Good condition", "Lights: [ ] All working", "", "Customer Signature: _________________", "Staff Signature: _________________"] },
    "個人情報確認書": { title: "PERSONAL INFO VERIFICATION", lines: ["IDENTITY VERIFICATION FORM", `Customer: ${customer}`, `Booking: ${bookingId}`, `Date: ${date}`, "", "Full Name: _______________", "Date of Birth: _______________", "License No: _______________", "License Expiry: _______________", "Passport No: _______________", "Phone: _______________", "Emergency Contact: _______________", "", "I confirm the above information is accurate.", "", "Customer Signature: _________________", "Date: _________________"] },
  };

  const h = headers[docType] || { title: docType, lines: [`Document for ${customer}`] };
  doc.setFontSize(18); doc.text("COMPASS RENTAL CAR", 20, 20);
  doc.setFontSize(14); doc.text(h.title, 20, 32);
  doc.setDrawColor(200); doc.line(20, 36, 190, 36);
  doc.setFontSize(10);
  h.lines.forEach((line, i) => { doc.text(line, 20, 46 + i * 8); });
  doc.setFontSize(7); doc.text("COMPASS Co., Ltd. | Okinawa, Japan | info@compass-rental.jp", 20, 280);
  return doc;
}

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const generateAllDocs = (customer = "田中 健太", bookingId = "b1") => {
    const types = ["見積書", "注文書", "賃貸契約書", "車両確認書", "個人情報確認書"];
    types.forEach((type) => {
      const doc = generateDocPDF(type, customer, bookingId);
      doc.save(`COMPASS_${type}_${bookingId}.pdf`);
    });
    setSnackbar({ open: true, message: `5件の書類を一括生成しました。` });
  };

  const downloadDoc = (docType: string, customer: string, bookingId: string, docId: string) => {
    const doc = generateDocPDF(docType, customer, bookingId);
    doc.save(`COMPASS_${docId}.pdf`);
    setSnackbar({ open: true, message: `${docId} をダウンロードしました。` });
  };

  const previewDoc = (docType: string, customer: string, bookingId: string) => {
    const doc = generateDocPDF(docType, customer, bookingId);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>書類管理</Typography>
        <Button variant="contained" onClick={() => generateAllDocs()} sx={{ bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50 }}>
          全書類一括生成（5件）
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {documentTypes.map((dt) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={dt.id}>
            <Card sx={{ borderRadius: 2, cursor: "pointer", border: selectedType === dt.id ? `2px solid ${dt.color}` : "1px solid #E8E5E0", transition: "all 0.2s", "&:hover": { borderColor: dt.color } }} onClick={() => setSelectedType(selectedType === dt.id ? null : dt.id)}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 }, textAlign: "center" }}>
                <DescriptionIcon sx={{ color: dt.color, mb: 0.5 }} />
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, mb: 0.5 }}>{dt.title}</Typography>
                <Chip label={`${dt.count}件`} size="small" sx={{ bgcolor: `${dt.color}15`, color: dt.color, fontWeight: 600 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid #E8E5E0" }}>
          <Typography sx={{ fontWeight: 600 }}>最近の書類</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead><TableRow>
              <TableCell>書類ID</TableCell><TableCell>種類</TableCell><TableCell>顧客名</TableCell><TableCell>作成日</TableCell><TableCell>ステータス</TableCell><TableCell>操作</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {recentDocs.map((d) => (
                <TableRow key={d.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{d.id}</TableCell>
                  <TableCell>{d.type}</TableCell>
                  <TableCell>{d.customer}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{d.createdAt}</TableCell>
                  <TableCell><Chip label={statusMap[d.status].label} color={statusMap[d.status].color} size="small" /></TableCell>
                  <TableCell>
                    <Tooltip title="プレビュー"><IconButton size="small" onClick={() => previewDoc(d.type, d.customer, d.booking)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="ダウンロード"><IconButton size="small" onClick={() => downloadDoc(d.type, d.customer, d.booking, d.id)}><DownloadIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="メール送信"><IconButton size="small" onClick={() => setSnackbar({ open: true, message: `${d.customer}様に${d.type}をメール送信しました。` })}><SendIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
