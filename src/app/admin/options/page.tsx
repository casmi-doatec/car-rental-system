"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip, Button, Modal, Grid, TextField, Switch, FormControlLabel, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { rentalOptions } from "@/data/demo";

const modalStyle = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 480 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none" };

export default function OptionsPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<typeof rentalOptions[0] | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>オプション品管理</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)} sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}>オプション追加</Button>
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead><TableRow>
              <TableCell>品名</TableCell><TableCell>日額料金</TableCell><TableCell>説明</TableCell><TableCell>ステータス</TableCell><TableCell>操作</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {rentalOptions.map((opt) => (
                <TableRow key={opt.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{opt.name}</TableCell>
                  <TableCell>¥{opt.pricePerDay.toLocaleString()}/日</TableCell>
                  <TableCell sx={{ color: "#6B6B6B" }}>{opt.description}</TableCell>
                  <TableCell><Chip label={opt.available ? "提供中" : "停止中"} color={opt.available ? "success" : "default"} size="small" /></TableCell>
                  <TableCell>
                    <Tooltip title="編集"><IconButton size="small" onClick={() => { setSelected(opt); setEditOpen(true); }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="削除"><IconButton size="small" onClick={() => setSnackbar({ open: true, message: `${opt.name} を削除しました。` })}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>オプション編集</Typography>
                <IconButton onClick={() => setEditOpen(false)} size="small"><CloseIcon /></IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="品名" defaultValue={selected.name} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="日額料金（円）" type="number" defaultValue={selected.pricePerDay} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="説明" defaultValue={selected.description} /></Grid>
                  <Grid size={{ xs: 12 }}><FormControlLabel control={<Switch defaultChecked={selected.available} />} label="提供中" /></Grid>
                </Grid>
                <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }} onClick={() => { setEditOpen(false); setSnackbar({ open: true, message: `${selected.name} を更新しました。` }); }}>保存</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Add Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 700 }}>新規オプション追加</Typography>
            <IconButton onClick={() => setAddOpen(false)} size="small"><CloseIcon /></IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="品名" required placeholder="BBQコンロセット" /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="日額料金（円）" type="number" required /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="説明" placeholder="コンロ、網、トング付き" /></Grid>
            </Grid>
            <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#B8363B", "&:hover": { bgcolor: "#9C2D31" }, borderRadius: 50 }} onClick={() => { setAddOpen(false); setSnackbar({ open: true, message: "新規オプションを追加しました。" }); }}>追加</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
