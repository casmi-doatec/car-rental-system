"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useLanguage } from "@/context/LanguageContext";
import { bookings, vehicles, customers, scheduleEvents } from "@/data/demo";

const statusColors: Record<string, "warning" | "info" | "success" | "default" | "error"> = {
  pending: "warning",
  confirmed: "info",
  active: "success",
  completed: "default",
  cancelled: "error",
};

export default function AdminPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState(0);

  const stats = [
    { label: t("admin.stats.totalBookings"), value: bookings.length, icon: <BookOnlineIcon sx={{ fontSize: 36 }} />, color: "#3b82f6" },
    { label: t("admin.stats.activeRentals"), value: bookings.filter((b) => b.status === "active").length, icon: <DirectionsCarIcon sx={{ fontSize: 36 }} />, color: "#10b981" },
    { label: t("admin.stats.revenue"), value: `¥${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`, icon: <AttachMoneyIcon sx={{ fontSize: 36 }} />, color: "#f59e0b" },
    { label: t("admin.stats.vehicles"), value: vehicles.length, icon: <PeopleIcon sx={{ fontSize: 36 }} />, color: "#8b5cf6" },
  ];

  const getVehicleName = (id: string) => vehicles.find((v) => v.id === id)?.name || id;

  // Generate next 7 days for schedule
  const today = new Date();
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700 }} gutterBottom>
        {t("admin.dashboard")}
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 6, md: 3 }} key={idx}>
            <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${stat.color}` }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid #eee", px: 2 }}>
          <Tab label={t("admin.bookings")} sx={{ textTransform: "none" }} />
          <Tab label={t("admin.vehicles")} sx={{ textTransform: "none" }} />
          <Tab label={t("admin.customers")} sx={{ textTransform: "none" }} />
          <Tab label={t("admin.schedule")} sx={{ textTransform: "none" }} />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {/* Bookings Tab */}
          {tab === 0 && (
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
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{getVehicleName(booking.vehicleId)}</TableCell>
                      <TableCell>{booking.startDate} ~ {booking.endDate}</TableCell>
                      <TableCell>¥{booking.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip label={booking.status} color={statusColors[booking.status]} size="small" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="詳細を見る">
                          <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="PDF作成">
                          <IconButton size="small"><PictureAsPdfIcon fontSize="small" /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Vehicles Tab */}
          {tab === 1 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>車両名</TableCell>
                    <TableCell>カテゴリ</TableCell>
                    <TableCell>日額料金</TableCell>
                    <TableCell>定員</TableCell>
                    <TableCell>変速機</TableCell>
                    <TableCell>ステータス</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} hover>
                      <TableCell>{vehicle.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{vehicle.name}</TableCell>
                      <TableCell>{vehicle.category}</TableCell>
                      <TableCell>¥{vehicle.pricePerDay.toLocaleString()}</TableCell>
                      <TableCell>{vehicle.seats}</TableCell>
                      <TableCell>{vehicle.transmission}</TableCell>
                      <TableCell>
                        <Chip
                          label={vehicle.available ? "利用可能" : "貸出中"}
                          color={vehicle.available ? "success" : "warning"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Customers Tab */}
          {tab === 2 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>氏名</TableCell>
                    <TableCell>メール</TableCell>
                    <TableCell>電話番号</TableCell>
                    <TableCell>国籍</TableCell>
                    <TableCell>予約回数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id} hover>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.nationality}</TableCell>
                      <TableCell>{customer.bookings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Schedule Tab */}
          {tab === 3 && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>車両名</TableCell>
                    {next7Days.map((date) => (
                      <TableCell key={date} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>
                        {date.slice(5)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell sx={{ fontWeight: 500 }}>{vehicle.name}</TableCell>
                      {next7Days.map((date) => {
                        const event = scheduleEvents.find(
                          (e) => e.vehicleId === vehicle.id && e.date === date
                        );
                        return (
                          <TableCell key={date} align="center" sx={{ p: 0.5 }}>
                            {event ? (
                              <Chip
                                label={event.type === "booked" ? event.customer.split(" ")[0] : "整備"}
                                size="small"
                                color={event.type === "booked" ? "primary" : "warning"}
                                sx={{ fontSize: "0.65rem", height: 22 }}
                              />
                            ) : (
                              <Chip label="空き" size="small" variant="outlined" color="success" sx={{ fontSize: "0.65rem", height: 22 }} />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
