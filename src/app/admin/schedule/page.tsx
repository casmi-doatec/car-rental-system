"use client";
import { useState } from "react";
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { vehicles, scheduleEvents } from "@/data/demo";

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);

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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>スケジュール</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button size="small" onClick={() => setWeekOffset(weekOffset - 1)} startIcon={<ArrowBackIcon />} sx={{ borderRadius: 50 }}>前週</Button>
          <Button size="small" onClick={() => setWeekOffset(0)} sx={{ borderRadius: 50 }}>今週</Button>
          <Button size="small" onClick={() => setWeekOffset(weekOffset + 1)} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 50 }}>翌週</Button>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, minWidth: 160, fontSize: "0.95rem", py: 2 }}>車両名</TableCell>
                {dayLabels.map((label, i) => (
                  <TableCell key={i} align="center" sx={{ fontWeight: 600, fontSize: "0.85rem", minWidth: 100, py: 2 }}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.slice(page * 10, page * 10 + 10).map((vehicle) => (
                <TableRow key={vehicle.id} sx={{ height: 56 }}>
                  <TableCell sx={{ fontWeight: 500, whiteSpace: "nowrap", fontSize: "0.95rem", py: 1.5 }}>{vehicle.name}</TableCell>
                  {days.map((date) => {
                    const event = scheduleEvents.find((e) => e.vehicleId === vehicle.id && e.date === date);
                    return (
                      <TableCell key={date} align="center" sx={{ py: 1.5 }}>
                        {event ? (
                          <Chip
                            label={event.type === "booked" ? event.customer.split(" ")[0] : "整備"}
                            sx={{
                              fontSize: "0.8rem",
                              height: 28,
                              bgcolor: event.type === "booked" ? "#2D3A3A" : "#f59e0b",
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
        <TablePagination component="div" count={vehicles.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} rowsPerPageOptions={[10]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`} />
      </Paper>
    </>
  );
}
