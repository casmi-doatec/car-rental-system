"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Button, Modal, Grid, TextField, Switch, FormControlLabel, Divider, Snackbar, Alert, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { vehicles } from "@/data/demo";

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 600 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function VehiclesAdminPage() {
  const [page, setPage] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>車両管理</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>車両を追加</Button>
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead><TableRow>
              <TableCell>ID</TableCell><TableCell>車両名</TableCell><TableCell>カテゴリ</TableCell><TableCell>日額料金</TableCell><TableCell>定員</TableCell><TableCell>燃料</TableCell><TableCell>ステータス</TableCell><TableCell>操作</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {vehicles.slice(page * 10, page * 10 + 10).map((v) => (
                <TableRow key={v.id} hover>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{v.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{v.name}</TableCell>
                  <TableCell>{v.category}</TableCell>
                  <TableCell>¥{v.pricePerDay.toLocaleString()}</TableCell>
                  <TableCell>{v.seats}人</TableCell>
                  <TableCell>{v.fuelType}</TableCell>
                  <TableCell><Chip label={v.available ? "利用可能" : "貸出中"} color={v.available ? "success" : "warning"} size="small" /></TableCell>
                  <TableCell>
                    <Tooltip title="詳細"><IconButton size="small" onClick={() => { setSelectedVehicle(v); setDetailOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="編集"><IconButton size="small" onClick={() => { setSelectedVehicle(v); setEditOpen(true); }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={vehicles.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} rowsPerPageOptions={[10]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`} />
      </Paper>

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)}>
        <Box sx={modalStyle}>
          {selectedVehicle && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>車両詳細 - {selectedVehicle.name}</Typography>
                <IconButton onClick={() => setDetailOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ height: 180, bgcolor: "#F0F0F0", borderRadius: 1, mb: 3, backgroundImage: `url(${selectedVehicle.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <Chip label={selectedVehicle.available ? "利用可能" : "貸出中"} color={selectedVehicle.available ? "success" : "warning"} sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>車両名</Typography><Typography sx={{ fontWeight: 600 }}>{selectedVehicle.name}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>カテゴリ</Typography><Typography>{selectedVehicle.category}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>日額料金</Typography><Typography sx={{ fontWeight: 600, color: "#B8363B" }}>¥{selectedVehicle.pricePerDay.toLocaleString()}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>定員</Typography><Typography>{selectedVehicle.seats}人</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>変速機</Typography><Typography>{selectedVehicle.transmission}</Typography></Grid>
                  <Grid size={{ xs: 6 }}><Typography variant="caption" sx={{ color: "#999" }}>燃料</Typography><Typography>{selectedVehicle.fuelType}</Typography></Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ color: "#999" }}>装備</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                  {selectedVehicle.features.map((f) => <Chip key={f} label={f} size="small" variant="outlined" />)}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={modalStyle}>
          {selectedVehicle && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>車両編集 - {selectedVehicle.name}</Typography>
                <IconButton onClick={() => setEditOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="車両名" defaultValue={selectedVehicle.name} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth select label="カテゴリ" defaultValue={selectedVehicle.category}>{["コンパクト", "SUV", "バン"].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="日額料金" type="number" defaultValue={selectedVehicle.pricePerDay} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="定員" type="number" defaultValue={selectedVehicle.seats} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth select label="変速機" defaultValue={selectedVehicle.transmission}>{["AT", "MT"].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="燃料" defaultValue={selectedVehicle.fuelType} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="画像URL" defaultValue={selectedVehicle.image} /></Grid>
                  <Grid size={{ xs: 12 }}><FormControlLabel control={<Switch defaultChecked={selectedVehicle.available} />} label="利用可能" /></Grid>
                </Grid>
                <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }} onClick={() => { setEditOpen(false); setSnackbar({ open: true, message: `${selectedVehicle.name} を更新しました。` }); }}>保存</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Add New Vehicle Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 700 }}>新規車両追加</Typography>
            <IconButton onClick={() => setAddOpen(false)} size="small"><CloseIcon /></IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="車両名" required placeholder="Toyota Aqua" /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth select label="カテゴリ" defaultValue="コンパクト">{["コンパクト", "SUV", "バン"].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth label="日額料金" type="number" required /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth label="定員" type="number" required /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth select label="変速機" defaultValue="AT">{["AT", "MT"].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth label="燃料タイプ" placeholder="ハイブリッド" /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth label="画像URL" /></Grid>
            </Grid>
            <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50 }} onClick={() => { setAddOpen(false); setSnackbar({ open: true, message: "新規車両を追加しました。" }); }}>車両を追加</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
