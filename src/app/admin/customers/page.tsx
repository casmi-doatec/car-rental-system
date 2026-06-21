"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Modal, Grid, Divider, Avatar, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { customers, bookings, vehicles } from "@/data/demo";

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 600 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function CustomersPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = search ? customers.filter((c) => c.name.includes(search) || c.email.includes(search)) : customers;
  const getVehicleName = (id: string) => vehicles.find((v) => v.id === id)?.name || id;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>顧客管理</Typography>
        <Chip label={`全${customers.length}名`} />
      </Box>

      <TextField fullWidth placeholder="顧客名またはメールで検索..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 3, bgcolor: "white" }} />

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>氏名</TableCell>
                <TableCell>メール</TableCell>
                <TableCell>電話番号</TableCell>
                <TableCell>予約回数</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * 8, page * 8 + 8).map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "#2D3A3A" }}>{c.name.charAt(0)}</Avatar>
                      {c.name}
                    </Box>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell><Chip label={`${c.bookings}回`} size="small" variant="outlined" /></TableCell>
                  <TableCell>
                    <Tooltip title="詳細"><IconButton size="small" onClick={() => { setSelected(c); setModalOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="編集"><IconButton size="small"><EditIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={8} rowsPerPageOptions={[8]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}名`} />
      </Paper>

      {/* Customer Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>顧客詳細</Typography>
                <IconButton onClick={() => setModalOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 48, height: 48, bgcolor: "#2D3A3A", fontSize: 18 }}>{selected.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>{selected.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#6B6B6B" }}>{selected.email}</Typography>
                  </Box>
                </Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>電話番号</Typography><Typography>{selected.phone}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>国籍</Typography><Typography>{selected.nationality}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>予約回数</Typography><Typography>{selected.bookings}回</Typography></Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.9rem" }}>レンタル履歴</Typography>
                {bookings.filter((b) => b.customerName === selected.name).length > 0 ? (
                  bookings.filter((b) => b.customerName === selected.name).map((b) => (
                    <Box key={b.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #F0F0F0" }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{getVehicleName(b.vehicleId)}</Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>{b.startDate}~{b.endDate}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>¥{b.totalAmount.toLocaleString()}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#999" }}>履歴なし</Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
