"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Button, Modal, TextField, MenuItem, Grid, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const demoInquiries = [
  { id: "INQ-001", name: "田中 健太", email: "tanaka.k@example.com", phone: "+81-90-1234-5678", vehicle: "Toyota Aqua", pickupDate: "2026-06-25", returnDate: "2026-06-28", language: "日本語", requests: "チャイルドシート希望", status: "new", createdAt: "2026-06-22", notes: "" },
  { id: "INQ-002", name: "佐藤 美咲", email: "sato.m@example.com", phone: "+81-80-9876-5432", vehicle: "Mazda CX-5", pickupDate: "2026-06-27", returnDate: "2026-07-02", language: "日本語", requests: "", status: "new", createdAt: "2026-06-22", notes: "" },
  { id: "INQ-003", name: "中村 蓮", email: "nakamura.r@example.com", phone: "+81-90-2345-6789", vehicle: "Toyota RAV4", pickupDate: "2026-07-01", returnDate: "2026-07-05", language: "English", requests: "Airport pickup please", status: "new", createdAt: "2026-06-22", notes: "" },
  { id: "INQ-004", name: "小林 さくら", email: "kobayashi.s@example.com", phone: "+81-80-3456-7890", vehicle: "Toyota Alphard", pickupDate: "2026-06-20", returnDate: "2026-06-23", language: "日本語", requests: "", status: "quote_sent", createdAt: "2026-06-19", notes: "見積り送付済み。返答待ち。" },
  { id: "INQ-005", name: "加藤 拓海", email: "kato.t@example.com", phone: "+81-70-4567-8901", vehicle: "Honda N-BOX", pickupDate: "2026-06-15", returnDate: "2026-06-17", language: "日本語", requests: "", status: "closed", createdAt: "2026-06-13", notes: "予約完了。" },
  { id: "INQ-006", name: "吉田 結衣", email: "yoshida.y@example.com", phone: "+81-90-5678-9012", vehicle: "Toyota Voxy", pickupDate: "2026-06-28", returnDate: "2026-07-03", language: "中文", requests: "需要儿童座椅", status: "quote_sent", createdAt: "2026-06-21", notes: "" },
];

const statusMap: Record<string, { label: string; color: "warning" | "info" | "default" }> = {
  new: { label: "新規", color: "warning" },
  quote_sent: { label: "見積り送付済", color: "info" },
  closed: { label: "クローズ", color: "default" },
};

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 600 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function InquiriesPage() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<typeof demoInquiries[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>問い合わせ管理</Typography>
        <Chip label={`全${demoInquiries.length}件`} />
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>顧客名</TableCell>
                <TableCell>希望車両</TableCell>
                <TableCell>希望日程</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>登録日</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoInquiries.slice(page * 5, page * 5 + 5).map((inq) => (
                <TableRow key={inq.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{inq.id}</TableCell>
                  <TableCell>{inq.name}</TableCell>
                  <TableCell>{inq.vehicle}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{inq.pickupDate}~{inq.returnDate}</TableCell>
                  <TableCell><Chip label={statusMap[inq.status].label} color={statusMap[inq.status].color} size="small" /></TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{inq.createdAt}</TableCell>
                  <TableCell>
                    <Tooltip title="詳細">
                      <IconButton size="small" onClick={() => { setSelected(inq); setModalOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton>
                    </Tooltip>
                    {inq.status === "new" && (
                      <Tooltip title="見積り作成">
                        <IconButton size="small" color="primary"><RequestQuoteIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    )}
                    {inq.status !== "closed" && (
                      <Tooltip title="クローズ">
                        <IconButton size="small"><CheckIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={demoInquiries.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={5} rowsPerPageOptions={[5]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`} />
      </Paper>

      {/* Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 700 }}>問い合わせ詳細 - {selected.id}</Typography>
                <IconButton onClick={() => setModalOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Chip label={statusMap[selected.status].label} color={statusMap[selected.status].color} size="small" sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>氏名</Typography><Typography sx={{ fontWeight: 500 }}>{selected.name}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>メール</Typography><Typography sx={{ fontWeight: 500 }}>{selected.email}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>電話番号</Typography><Typography sx={{ fontWeight: 500 }}>{selected.phone}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>対応言語</Typography><Typography sx={{ fontWeight: 500 }}>{selected.language}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>希望車両</Typography><Typography sx={{ fontWeight: 500 }}>{selected.vehicle}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>日程</Typography><Typography sx={{ fontWeight: 500 }}>{selected.pickupDate} ~ {selected.returnDate}</Typography></Grid>
                </Grid>
                {selected.requests && (
                  <Box sx={{ mb: 2, p: 2, bgcolor: "#FAFAF7", borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: "#999" }}>ご要望</Typography>
                    <Typography variant="body2">{selected.requests}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ color: "#999" }}>社内メモ</Typography>
                <TextField fullWidth multiline rows={2} placeholder="メモを入力..." defaultValue={selected.notes} sx={{ mt: 0.5, mb: 2 }} />
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button variant="contained" sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>見積り作成</Button>
                  <Button variant="outlined" sx={{ borderColor: "#E8E5E0", color: "#6B6B6B", borderRadius: 50 }}>クローズ</Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
