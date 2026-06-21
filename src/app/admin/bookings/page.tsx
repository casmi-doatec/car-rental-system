"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Button, Modal, Grid, Divider, TextField, MenuItem, ToggleButtonGroup, ToggleButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { bookings, vehicles, Booking } from "@/data/demo";
import jsPDF from "jspdf";

const statusLabels: Record<string, string> = { pending: "保留中", confirmed: "確認済", active: "利用中", completed: "完了", cancelled: "キャンセル" };
const statusColors: Record<string, "warning" | "info" | "success" | "default" | "error"> = { pending: "warning", confirmed: "info", active: "success", completed: "default", cancelled: "error" };

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 600 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function BookingsPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const getVehicleName = (id: string) => vehicles.find((v) => v.id === id)?.name || id;

  const generatePDF = (b: Booking) => {
    const doc = new jsPDF();
    const v = vehicles.find((veh) => veh.id === b.vehicleId);
    doc.setFontSize(18);
    doc.text("COMPASS RENTAL CAR", 20, 25);
    doc.setFontSize(10);
    doc.text("Booking: " + b.id, 20, 35);
    doc.line(20, 38, 190, 38);
    doc.text(b.customerName, 20, 50);
    doc.text(b.customerEmail, 20, 58);
    doc.text(b.customerPhone, 20, 66);
    doc.text((v?.name || b.vehicleId) + " / " + (v?.category || ""), 20, 80);
    doc.text(b.startDate + " ~ " + b.endDate, 20, 90);
    doc.setFontSize(14);
    doc.text("Total: JPY " + b.totalAmount.toLocaleString(), 20, 108);
    doc.save(`COMPASS_${b.id}.pdf`);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>予約管理</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>
          手動予約作成
        </Button>
      </Box>

      {/* Filters */}
      <ToggleButtonGroup value={filter} exclusive onChange={(_, v) => v && setFilter(v)} sx={{ mb: 3 }}>
        {[
          { value: "all", label: "全て" },
          { value: "pending", label: "保留中" },
          { value: "confirmed", label: "確認済" },
          { value: "active", label: "利用中" },
          { value: "completed", label: "完了" },
        ].map((f) => (
          <ToggleButton key={f.value} value={f.value} sx={{ px: 2.5, py: 0.8, textTransform: "none", "&.Mui-selected": { bgcolor: "#2D3A3A", color: "white", "&:hover": { bgcolor: "#1A2424" } } }}>
            {f.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>顧客名</TableCell>
                <TableCell>車両</TableCell>
                <TableCell>期間</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * 8, page * 8 + 8).map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{b.id}</TableCell>
                  <TableCell>{b.customerName}</TableCell>
                  <TableCell>{getVehicleName(b.vehicleId)}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{b.startDate}~{b.endDate}</TableCell>
                  <TableCell>¥{b.totalAmount.toLocaleString()}</TableCell>
                  <TableCell><Chip label={statusLabels[b.status]} color={statusColors[b.status]} size="small" /></TableCell>
                  <TableCell>
                    <Tooltip title="詳細"><IconButton size="small" onClick={() => { setSelected(b); setModalOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="PDF"><IconButton size="small" onClick={() => generatePDF(b)}>PDF</IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={8} rowsPerPageOptions={[8]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`} />
      </Paper>

      {/* Booking Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>予約詳細 - {selected.id}</Typography>
                <IconButton onClick={() => setModalOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Chip label={statusLabels[selected.status]} color={statusColors[selected.status]} sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>顧客名</Typography><Typography sx={{ fontWeight: 500 }}>{selected.customerName}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>メール</Typography><Typography sx={{ fontWeight: 500 }}>{selected.customerEmail}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>電話番号</Typography><Typography sx={{ fontWeight: 500 }}>{selected.customerPhone}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>車両</Typography><Typography sx={{ fontWeight: 500 }}>{getVehicleName(selected.vehicleId)}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>受取日</Typography><Typography sx={{ fontWeight: 500 }}>{selected.startDate}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>返却日</Typography><Typography sx={{ fontWeight: 500 }}>{selected.endDate}</Typography></Grid>
                </Grid>
                <Box sx={{ p: 2, bgcolor: "#FAFAF7", borderRadius: 1, mb: 3 }}>
                  <Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.3rem" }}>¥{selected.totalAmount.toLocaleString()}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.9rem" }}>ステータス操作</Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 50 }}>受取確認</Button>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 50 }}>返却確認</Button>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 50 }}>ETC精算</Button>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 50 }}>現金受領確認</Button>
                  <Button variant="outlined" size="small" color="error" sx={{ borderRadius: 50 }}>キャンセル</Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
