"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, Button, Modal, TextField, MenuItem, Grid, Snackbar, Alert, IconButton, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import { vehicles, scheduleEvents } from "@/data/demo";

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [viewMode, setViewMode] = useState<"all" | "single">("all");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]?.id || "");
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockVehicle, setBlockVehicle] = useState("");
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const dayLabels = days.map((d) => {
    const date = new Date(d);
    const weekday = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${d.slice(5)} (${weekday})`;
  });

  const displayVehicles = viewMode === "single" ? vehicles.filter((v) => v.id === selectedVehicle) : vehicles.slice(page * 10, page * 10 + 10);

  // Double booking check
  const checkDoubleBooking = (vehicleId: string, start: string, end: string): boolean => {
    return scheduleEvents.some((e) => e.vehicleId === vehicleId && e.date >= start && e.date <= end);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>スケジュール</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Button size="small" startIcon={<BlockIcon />} variant="outlined" onClick={() => setBlockOpen(true)} sx={{ borderRadius: 50 }}>日程ブロック</Button>
          <Button size="small" onClick={() => setWeekOffset(weekOffset - 1)} startIcon={<ArrowBackIcon />} sx={{ borderRadius: 50 }}>前週</Button>
          <Button size="small" onClick={() => setWeekOffset(0)} sx={{ borderRadius: 50 }}>今週</Button>
          <Button size="small" onClick={() => setWeekOffset(weekOffset + 1)} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 50 }}>翌週</Button>
        </Box>
      </Box>

      {/* View mode toggle */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)} size="small">
          <ToggleButton value="all" sx={{ textTransform: "none", px: 2, "&.Mui-selected": { bgcolor: "#2D3A3A", color: "white", "&:hover": { bgcolor: "#1A2424" } } }}>全車両</ToggleButton>
          <ToggleButton value="single" sx={{ textTransform: "none", px: 2, "&.Mui-selected": { bgcolor: "#2D3A3A", color: "white", "&:hover": { bgcolor: "#1A2424" } } }}>車両別</ToggleButton>
        </ToggleButtonGroup>
        {viewMode === "single" && (
          <TextField select size="small" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} sx={{ minWidth: 200 }}>
            {vehicles.map((v) => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>)}
          </TextField>
        )}
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, minWidth: 160, fontSize: "0.95rem", py: 2 }}>車両名</TableCell>
                {dayLabels.map((label, i) => (
                  <TableCell key={i} align="center" sx={{ fontWeight: 600, fontSize: "0.85rem", minWidth: 100, py: 2 }}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} sx={{ height: 56 }}>
                  <TableCell sx={{ fontWeight: 500, whiteSpace: "nowrap", fontSize: "0.95rem", py: 1.5 }}>{vehicle.name}</TableCell>
                  {days.map((date) => {
                    const event = scheduleEvents.find((e) => e.vehicleId === vehicle.id && e.date === date);
                    return (
                      <TableCell key={date} align="center" sx={{ py: 1.5 }}>
                        {event ? (
                          <Chip
                            label={event.type === "booked" ? event.customer.split(" ")[0] : event.type === "maintenance" ? "整備" : "ブロック"}
                            sx={{
                              fontSize: "0.8rem",
                              height: 28,
                              bgcolor: event.type === "booked" ? "#2D3A3A" : event.type === "maintenance" ? "#f59e0b" : "#6B6B6B",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                        ) : (
                          <Chip label="空き" variant="outlined" color="success" sx={{ fontSize: "0.8rem", height: 28 }} />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {viewMode === "all" && (
          <TablePagination component="div" count={vehicles.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} rowsPerPageOptions={[10]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`} />
        )}
      </Paper>

      {/* Block Dates Modal */}
      <Modal open={blockOpen} onClose={() => setBlockOpen(false)}>
        <Box sx={{ position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 450 }, bgcolor: "background.paper", borderRadius: 2, p: 0, outline: "none" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 700 }}>日程ブロック（手動）</Typography>
            <IconButton onClick={() => setBlockOpen(false)} size="small"><CloseIcon /></IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth select label="車両" value={blockVehicle} onChange={(e) => setBlockVehicle(e.target.value)}>
                  {vehicles.map((v) => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth type="date" label="開始日" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
              <Grid size={{ xs: 6 }}><TextField fullWidth type="date" label="終了日" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            </Grid>
            {blockVehicle && blockStart && blockEnd && checkDoubleBooking(blockVehicle, blockStart, blockEnd) && (
              <Alert severity="error" sx={{ mt: 2 }}>
                この期間には既存の予約が含まれています。ブロックできません（重複防止）。
              </Alert>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50 }}
              disabled={!blockVehicle || !blockStart || !blockEnd || (!!blockVehicle && !!blockStart && !!blockEnd && checkDoubleBooking(blockVehicle, blockStart, blockEnd))}
              onClick={() => {
                setBlockOpen(false);
                setSnackbar({ open: true, message: `${vehicles.find((v) => v.id === blockVehicle)?.name} の ${blockStart}〜${blockEnd} をブロックしました。` });
                setBlockVehicle(""); setBlockStart(""); setBlockEnd("");
              }}
            >
              ブロック設定
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
