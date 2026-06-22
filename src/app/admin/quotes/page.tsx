"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Button, Modal, Grid, Divider, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import { vehicles } from "@/data/demo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const demoQuotes = [
  { id: "QT-2026-001", customer: "田中 健太", email: "tanaka.k@example.com", vehicle: "Toyota Aqua", days: 3, pricePerDay: 5000, total: 15000, status: "sent", createdAt: "2026-06-22" },
  { id: "QT-2026-002", customer: "佐藤 美咲", email: "sato.m@example.com", vehicle: "Mazda CX-5", days: 5, pricePerDay: 12000, total: 60000, status: "confirmed", createdAt: "2026-06-22" },
  { id: "QT-2026-003", customer: "中村 蓮", email: "nakamura.r@example.com", vehicle: "Toyota RAV4", days: 4, pricePerDay: 13000, total: 52000, status: "draft", createdAt: "2026-06-22" },
  { id: "QT-2026-004", customer: "小林 さくら", email: "kobayashi.s@example.com", vehicle: "Toyota Alphard", days: 3, pricePerDay: 15000, total: 45000, status: "sent", createdAt: "2026-06-19" },
  { id: "QT-2026-005", customer: "吉田 結衣", email: "yoshida.y@example.com", vehicle: "Toyota Voxy", days: 5, pricePerDay: 12000, total: 60000, status: "sent", createdAt: "2026-06-21" },
  { id: "QT-2026-006", customer: "松本 陽太", email: "matsumoto.y@example.com", vehicle: "Mazda Roadster (MX-5)", days: 2, pricePerDay: 9000, total: 18000, status: "cancelled", createdAt: "2026-06-20" },
];

const statusMap: Record<string, { label: string; color: "default" | "warning" | "info" | "success" | "error" }> = {
  draft: { label: "下書き", color: "default" },
  sent: { label: "送付済", color: "info" },
  confirmed: { label: "承認済", color: "success" },
  cancelled: { label: "キャンセル", color: "error" },
};

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 550 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function QuotesPage() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<typeof demoQuotes[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [newVehicleId, setNewVehicleId] = useState("");
  const [newPickup, setNewPickup] = useState("");
  const [newReturn, setNewReturn] = useState("");
  const newVehicle = vehicles.find((v) => v.id === newVehicleId);
  const newDays = newPickup && newReturn ? Math.max(0, Math.ceil((new Date(newReturn).getTime() - new Date(newPickup).getTime()) / 86400000)) : 0;
  const newTotal = newVehicle ? newDays * newVehicle.pricePerDay : 0;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>見積り管理</Typography>
        <Button variant="contained" onClick={() => setCreateOpen(true)} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>
          新規見積り作成
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>見積番号</TableCell>
                <TableCell>顧客名</TableCell>
                <TableCell>車両</TableCell>
                <TableCell>日数</TableCell>
                <TableCell>合計金額</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>作成日</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoQuotes.slice(page * 5, page * 5 + 5).map((qt) => (
                <TableRow key={qt.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem", fontWeight: 500 }}>{qt.id}</TableCell>
                  <TableCell>{qt.customer}</TableCell>
                  <TableCell>{qt.vehicle}</TableCell>
                  <TableCell>{qt.days}日</TableCell>
                  <TableCell>¥{qt.total.toLocaleString()}</TableCell>
                  <TableCell><Chip label={statusMap[qt.status].label} color={statusMap[qt.status].color} size="small" /></TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{qt.createdAt}</TableCell>
                  <TableCell>
                    <Tooltip title="詳細"><IconButton size="small" onClick={() => { setSelected(qt); setModalOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    {qt.status === "draft" && <Tooltip title="送信"><IconButton size="small" color="primary" onClick={() => setSnackbar({ open: true, message: `${qt.customer}様に見積り(${qt.id})をメール送信しました。` })}><SendIcon fontSize="small" /></IconButton></Tooltip>}
                    {(qt.status === "draft" || qt.status === "sent") && <Tooltip title="編集"><IconButton size="small" onClick={() => { setSelected(qt); setModalOpen(true); }}><EditIcon fontSize="small" /></IconButton></Tooltip>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={demoQuotes.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={5} rowsPerPageOptions={[5]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`} />
      </Paper>

      {/* Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>見積り詳細 - {selected.id}</Typography>
                <IconButton onClick={() => setModalOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Chip label={statusMap[selected.status].label} color={statusMap[selected.status].color} size="small" sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>顧客名</Typography><Typography sx={{ fontWeight: 500 }}>{selected.customer}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>メール</Typography><Typography sx={{ fontWeight: 500 }}>{selected.email}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>車両</Typography><Typography sx={{ fontWeight: 500 }}>{selected.vehicle}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>日数</Typography><Typography sx={{ fontWeight: 500 }}>{selected.days}日間</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>日額料金</Typography><Typography sx={{ fontWeight: 500 }}>¥{selected.pricePerDay.toLocaleString()}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>合計金額</Typography><Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.2rem" }}>¥{selected.total.toLocaleString()}</Typography></Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ color: "#6B6B6B", mb: 2 }}>見積りURL: /quote/{selected.id}</Typography>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  {selected.status === "draft" && <Button variant="contained" startIcon={<SendIcon />} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }} onClick={() => { setModalOpen(false); setSnackbar({ open: true, message: `${selected.customer}様にメール送信しました。` }); }}>メールで送信</Button>}
                  <Button variant="outlined" sx={{ borderColor: "#E8E5E0", color: "#6B6B6B", borderRadius: 50 }} onClick={() => setSnackbar({ open: true, message: "PDFを生成しました。" })}>PDF表示</Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 700 }}>新規見積り作成</Typography>
            <IconButton onClick={() => setCreateOpen(false)} size="small"><CloseIcon /></IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="顧客名" /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="メールアドレス" /></Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth select label="車両" value={newVehicleId} onChange={(e) => setNewVehicleId(e.target.value)}>
                  <MenuItem value="">選択してください</MenuItem>
                  {vehicles.filter((v) => v.available).map((v) => <MenuItem key={v.id} value={v.id}>{v.name} (¥{v.pricePerDay.toLocaleString()}/日)</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth type="date" label="受取日" value={newPickup} onChange={(e) => setNewPickup(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth type="date" label="返却日" value={newReturn} onChange={(e) => setNewReturn(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            </Grid>
            {newTotal > 0 && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#FAFAF7", borderRadius: 1, border: "1px solid #E8E5E0" }}>
                <Typography variant="body2" sx={{ color: "#6B6B6B" }}>{newVehicle?.name} x {newDays}日間</Typography>
                <Typography sx={{ fontWeight: 700, color: "#B8363B", fontSize: "1.3rem" }}>合計: ¥{newTotal.toLocaleString()}</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
              <Button variant="contained" sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }} onClick={() => { setCreateOpen(false); setSnackbar({ open: true, message: "見積りを下書き保存しました。" }); }}>下書き保存</Button>
              <Button variant="contained" startIcon={<SendIcon />} sx={{ bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50 }} onClick={() => { setCreateOpen(false); setSnackbar({ open: true, message: "見積りを作成し、メール送信しました。" }); }}>作成して送信</Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
