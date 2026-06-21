"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, Tooltip, Button, Modal, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { vehicles } from "@/data/demo";

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: 550 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none", maxHeight: "90vh", overflow: "auto" };

export default function VehiclesAdminPage() {
  const [page, setPage] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>車両管理</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>
          車両を追加
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>車両名</TableCell>
                <TableCell>カテゴリ</TableCell>
                <TableCell>日額料金</TableCell>
                <TableCell>定員</TableCell>
                <TableCell>燃料</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
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
                    <Tooltip title="編集"><IconButton size="small" onClick={() => { setSelectedVehicle(v); setEditOpen(true); }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={vehicles.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} rowsPerPageOptions={[10]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`} />
      </Paper>

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
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="カテゴリ" defaultValue={selectedVehicle.category} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="日額料金" type="number" defaultValue={selectedVehicle.pricePerDay} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="定員" type="number" defaultValue={selectedVehicle.seats} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="変速機" defaultValue={selectedVehicle.transmission} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="燃料" defaultValue={selectedVehicle.fuelType} /></Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel control={<Switch defaultChecked={selectedVehicle.available} />} label="利用可能" />
                  </Grid>
                </Grid>
                <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>保存</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
