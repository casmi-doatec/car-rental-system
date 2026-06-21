"use client";
import { useState } from "react";
import { Typography, Box, Paper, Grid, Card, CardContent, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Modal, Snackbar, Alert } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
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

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const generateAllDocs = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("COMPASS RENTAL CAR - Document Bundle", 20, 25);
    doc.setFontSize(10);
    doc.text("Generated: " + new Date().toLocaleDateString("ja-JP"), 20, 35);
    doc.text("Documents: Estimate, Order, Contract, Vehicle Check, Personal Info", 20, 45);
    doc.save("COMPASS_All_Documents.pdf");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>書類管理</Typography>
        <Button variant="contained" onClick={generateAllDocs} sx={{ bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50 }}>
          全書類一括生成
        </Button>
      </Box>

      {/* Document Type Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {documentTypes.map((dt) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={dt.id}>
            <Card
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                border: selectedType === dt.id ? `2px solid ${dt.color}` : "1px solid #E8E5E0",
                transition: "all 0.2s",
                "&:hover": { borderColor: dt.color },
              }}
              onClick={() => setSelectedType(selectedType === dt.id ? null : dt.id)}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 }, textAlign: "center" }}>
                <DescriptionIcon sx={{ color: dt.color, mb: 0.5 }} />
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, mb: 0.5 }}>{dt.title}</Typography>
                <Chip label={`${dt.count}件`} size="small" sx={{ bgcolor: `${dt.color}15`, color: dt.color, fontWeight: 600 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Documents */}
      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid #E8E5E0" }}>
          <Typography sx={{ fontWeight: 600 }}>最近の書類</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>書類ID</TableCell>
                <TableCell>種類</TableCell>
                <TableCell>顧客名</TableCell>
                <TableCell>作成日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentDocs.map((doc) => (
                <TableRow key={doc.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{doc.id}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.customer}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{doc.createdAt}</TableCell>
                  <TableCell><Chip label={statusMap[doc.status].label} color={statusMap[doc.status].color} size="small" /></TableCell>
                  <TableCell>
                    <Tooltip title="プレビュー"><IconButton size="small" onClick={() => setSnackbar({ open: true, message: `${doc.id} のプレビューを表示中...` })}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="ダウンロード"><IconButton size="small" onClick={() => { const d = new jsPDF(); d.text(`COMPASS - ${doc.type}`, 20, 25); d.text(`Customer: ${doc.customer}`, 20, 40); d.text(`Date: ${doc.createdAt}`, 20, 50); d.save(`COMPASS_${doc.id}.pdf`); setSnackbar({ open: true, message: `${doc.id} をダウンロードしました。` }); }}><DownloadIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="メール送信"><IconButton size="small" onClick={() => setSnackbar({ open: true, message: `${doc.customer}様に${doc.type}をメール送信しました。` })}><SendIcon fontSize="small" /></IconButton></Tooltip>
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
