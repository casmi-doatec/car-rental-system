"use client";
import { useState, useEffect, useCallback } from "react";
import {
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
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  LinearProgress,
  Avatar,
  Modal,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useLanguage } from "@/context/LanguageContext";
import { bookings, vehicles, customers, scheduleEvents, Booking } from "@/data/demo";
import jsPDF from "jspdf";

const statusColors: Record<string, "warning" | "info" | "success" | "default" | "error"> = {
  pending: "warning",
  confirmed: "info",
  active: "success",
  completed: "default",
  cancelled: "error",
};

const statusLabels: Record<string, string> = {
  pending: "保留中",
  confirmed: "確認済",
  active: "利用中",
  completed: "完了",
  cancelled: "キャンセル",
};

const DRAWER_WIDTH = 240;

const sideMenuItems = [
  { id: 0, label: "ダッシュボード", icon: <DashboardIcon /> },
  { id: 1, label: "予約管理", icon: <BookOnlineIcon /> },
  { id: 2, label: "車両管理", icon: <DirectionsCarIcon /> },
  { id: 3, label: "顧客管理", icon: <PeopleIcon /> },
  { id: 4, label: "スケジュール", icon: <CalendarMonthIcon /> },
  { id: 5, label: "書類管理", icon: <DescriptionIcon /> },
];

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  outline: "none",
};

export default function AdminPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Persist active section in URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const sectionMap: Record<string, number> = {
      dashboard: 0, bookings: 1, vehicles: 2, customers: 3, schedule: 4, documents: 5,
    };
    if (hash && sectionMap[hash] !== undefined) {
      setActiveSection(sectionMap[hash]);
    }
  }, []);

  const handleSectionChange = (id: number) => {
    setActiveSection(id);
    const hashMap = ["dashboard", "bookings", "vehicles", "customers", "schedule", "documents"];
    window.location.hash = hashMap[id];
  };

  // PDF generation
  const generatePDF = useCallback((booking: Booking) => {
    const doc = new jsPDF();
    const vehicle = vehicles.find((v) => v.id === booking.vehicleId);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("COMPASS RENTAL CAR", 20, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Reservation Confirmation / Booking ID: " + booking.id, 20, 35);

    doc.setDrawColor(200);
    doc.line(20, 40, 190, 40);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Information", 20, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Name: " + booking.customerName, 20, 62);
    doc.text("Email: " + booking.customerEmail, 20, 70);
    doc.text("Phone: " + booking.customerPhone, 20, 78);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Vehicle Information", 20, 95);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Vehicle: " + (vehicle?.name || booking.vehicleId), 20, 105);
    doc.text("Category: " + (vehicle?.category || "-"), 20, 113);
    doc.text("Seats: " + (vehicle?.seats || "-"), 20, 121);
    doc.text("Transmission: " + (vehicle?.transmission || "-"), 20, 129);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Rental Details", 20, 146);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Pick-up Date: " + booking.startDate, 20, 156);
    doc.text("Return Date: " + booking.endDate, 20, 164);
    doc.text("Status: " + statusLabels[booking.status], 20, 172);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Total: JPY " + booking.totalAmount.toLocaleString(), 20, 190);

    doc.setDrawColor(200);
    doc.line(20, 200, 190, 200);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("COMPASS Co., Ltd. | Okinawa, Japan | info@compass-rental.jp", 20, 210);
    doc.text("Generated: " + new Date().toLocaleDateString("ja-JP"), 20, 217);

    doc.save(`COMPASS_Booking_${booking.id}.pdf`);
  }, []);

  // Pagination states
  const [bookingPage, setBookingPage] = useState(0);
  const [bookingRowsPerPage, setBookingRowsPerPage] = useState(5);
  const [vehiclePage, setVehiclePage] = useState(0);
  const [vehicleRowsPerPage, setVehicleRowsPerPage] = useState(8);
  const [customerPage, setCustomerPage] = useState(0);
  const [customerRowsPerPage, setCustomerRowsPerPage] = useState(8);
  const [schedulePage, setSchedulePage] = useState(0);
  const [scheduleRowsPerPage, setScheduleRowsPerPage] = useState(8);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const activeRentals = bookings.filter((b) => b.status === "active").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;
  const availableVehicles = vehicles.filter((v) => v.available).length;

  const stats = [
    { label: "総予約数", value: bookings.length, icon: <BookOnlineIcon sx={{ fontSize: 32 }} />, color: "#3b82f6" },
    { label: "利用中", value: activeRentals, icon: <DirectionsCarIcon sx={{ fontSize: 32 }} />, color: "#10b981" },
    { label: "保留中", value: pendingBookings, icon: <NotificationsIcon sx={{ fontSize: 32 }} />, color: "#f59e0b" },
    { label: "売上合計", value: `¥${totalRevenue.toLocaleString()}`, icon: <AttachMoneyIcon sx={{ fontSize: 32 }} />, color: "#8b5cf6" },
    { label: "車両数", value: `${availableVehicles}/${vehicles.length}`, icon: <DirectionsCarIcon sx={{ fontSize: 32 }} />, color: "#06b6d4" },
    { label: "顧客数", value: customers.length, icon: <PeopleIcon sx={{ fontSize: 32 }} />, color: "#ec4899" },
  ];

  const getVehicleName = (id: string) => vehicles.find((v) => v.id === id)?.name || id;
  const getVehicle = (id: string) => vehicles.find((v) => v.id === id);

  const today = new Date();
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const recentBookings = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          bgcolor: "#1A2A3A",
          color: "white",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "0.03em" }}>
            COMPASS 管理画面
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", mt: 0.5 }}>
            管理者ダッシュボード
          </Typography>
        </Box>
        <List sx={{ px: 1, py: 2 }}>
          {sideMenuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeSection === item.id}
                onClick={() => handleSectionChange(item.id)}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": { bgcolor: "rgba(43,76,126,0.4)", "&:hover": { bgcolor: "rgba(43,76,126,0.5)" } },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <ListItemIcon sx={{ color: activeSection === item.id ? "#5A9FD4" : "rgba(255,255,255,0.4)", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: "0.9rem" } } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />
        <List sx={{ px: 1, py: 1 }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}>
              <ListItemIcon sx={{ color: "rgba(255,255,255,0.4)", minWidth: 36 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="設定" slotProps={{ primary: { sx: { fontSize: "0.9rem" } } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: "#F5F7FA", overflow: "auto" }}>
        {/* Mobile tabs */}
        <Box sx={{ display: { md: "none" }, mb: 2 }}>
          <Tabs
            value={activeSection}
            onChange={(_, v) => handleSectionChange(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {sideMenuItems.map((item) => (
              <Tab key={item.id} label={item.label} sx={{ textTransform: "none", minWidth: "auto" }} />
            ))}
          </Tabs>
        </Box>

        {/* Dashboard */}
        {activeSection === 0 && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1C1C1C" }}>
              ダッシュボード
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              {stats.map((stat, idx) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={idx}>
                  <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", height: "100%" }}>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                      <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: "#1C1C1C" }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#999" }}>
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", overflow: "hidden" }}>
                  <Box sx={{ p: 2.5, borderBottom: "1px solid #EDEDED", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600 }}>最近の予約</Typography>
                    <Chip label={`${bookings.length}件`} size="small" sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
                  </Box>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>顧客名</TableCell>
                          <TableCell>車両</TableCell>
                          <TableCell>期間</TableCell>
                          <TableCell>金額</TableCell>
                          <TableCell>ステータス</TableCell>
                          <TableCell>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentBookings.map((booking) => (
                          <TableRow key={booking.id} hover>
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell>{getVehicleName(booking.vehicleId)}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>{booking.startDate} ~ {booking.endDate}</TableCell>
                            <TableCell>¥{booking.totalAmount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Chip label={statusLabels[booking.status]} color={statusColors[booking.status]} size="small" />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="詳細を見る">
                                <IconButton size="small" onClick={() => handleViewBooking(booking)}>
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", p: 2.5, mb: 3 }}>
                  <Typography sx={{ fontWeight: 600, mb: 2 }}>車両稼働率</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: "#5A5A5A" }}>利用中</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{vehicles.filter(v => !v.available).length}/{vehicles.length}</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={(vehicles.filter(v => !v.available).length / vehicles.length) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: "#EDEDED", "& .MuiLinearProgress-bar": { bgcolor: "#2B4C7E" } }} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: "#5A5A5A" }}>予約確定</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{bookings.filter(b => b.status === "confirmed").length}件</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={(bookings.filter(b => b.status === "confirmed").length / bookings.length) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: "#EDEDED", "& .MuiLinearProgress-bar": { bgcolor: "#10b981" } }} />
                  </Box>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: "#5A5A5A" }}>完了済</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{completedBookings}件</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={(completedBookings / bookings.length) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: "#EDEDED", "& .MuiLinearProgress-bar": { bgcolor: "#8b5cf6" } }} />
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", p: 2.5 }}>
                  <Typography sx={{ fontWeight: 600, mb: 2 }}>売上サマリー</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: "#5A5A5A" }}>今月売上</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#2B4C7E" }}>¥{totalRevenue.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: "#5A5A5A" }}>平均単価</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#2B4C7E" }}>¥{Math.round(totalRevenue / bookings.length).toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "#5A5A5A" }}>リピーター率</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#10b981" }}>68%</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {/* Bookings */}
        {activeSection === 1 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#1C1C1C" }}>予約管理</Typography>
              <Chip label={`全${bookings.length}件`} sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
            </Box>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", overflow: "hidden" }}>
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
                    {bookings.slice(bookingPage * bookingRowsPerPage, bookingPage * bookingRowsPerPage + bookingRowsPerPage).map((booking) => (
                      <TableRow key={booking.id} hover>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{getVehicleName(booking.vehicleId)}</TableCell>
                        <TableCell sx={{ fontSize: "0.8rem" }}>{booking.startDate} ~ {booking.endDate}</TableCell>
                        <TableCell>¥{booking.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip label={statusLabels[booking.status]} color={statusColors[booking.status]} size="small" />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="詳細を見る">
                            <IconButton size="small" onClick={() => handleViewBooking(booking)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="PDF作成">
                            <IconButton size="small" onClick={() => generatePDF(booking)}><PictureAsPdfIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={bookings.length}
                page={bookingPage}
                onPageChange={(_, p) => setBookingPage(p)}
                rowsPerPage={bookingRowsPerPage}
                onRowsPerPageChange={(e) => { setBookingRowsPerPage(parseInt(e.target.value, 10)); setBookingPage(0); }}
                rowsPerPageOptions={[5, 10, 15]}
                labelRowsPerPage="表示件数:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`}
              />
            </Paper>
          </>
        )}

        {/* Vehicles */}
        {activeSection === 2 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#1C1C1C" }}>車両管理</Typography>
              <Chip label={`全${vehicles.length}台`} sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
            </Box>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", overflow: "hidden" }}>
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
                    {vehicles.slice(vehiclePage * vehicleRowsPerPage, vehiclePage * vehicleRowsPerPage + vehicleRowsPerPage).map((vehicle) => (
                      <TableRow key={vehicle.id} hover>
                        <TableCell>{vehicle.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{vehicle.name}</TableCell>
                        <TableCell>{vehicle.category}</TableCell>
                        <TableCell>¥{vehicle.pricePerDay.toLocaleString()}</TableCell>
                        <TableCell>{vehicle.seats}</TableCell>
                        <TableCell>{vehicle.transmission}</TableCell>
                        <TableCell>
                          <Chip label={vehicle.available ? "利用可能" : "貸出中"} color={vehicle.available ? "success" : "warning"} size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={vehicles.length}
                page={vehiclePage}
                onPageChange={(_, p) => setVehiclePage(p)}
                rowsPerPage={vehicleRowsPerPage}
                onRowsPerPageChange={(e) => { setVehicleRowsPerPage(parseInt(e.target.value, 10)); setVehiclePage(0); }}
                rowsPerPageOptions={[8, 15, 26]}
                labelRowsPerPage="表示件数:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`}
              />
            </Paper>
          </>
        )}

        {/* Customers */}
        {activeSection === 3 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#1C1C1C" }}>顧客管理</Typography>
              <Chip label={`全${customers.length}名`} sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
            </Box>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", overflow: "hidden" }}>
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
                    {customers.slice(customerPage * customerRowsPerPage, customerPage * customerRowsPerPage + customerRowsPerPage).map((customer) => (
                      <TableRow key={customer.id} hover>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "#2B4C7E" }}>
                              {customer.name.charAt(0)}
                            </Avatar>
                            {customer.name}
                          </Box>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.nationality}</TableCell>
                        <TableCell>
                          <Chip label={`${customer.bookings}回`} size="small" variant="outlined" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={customers.length}
                page={customerPage}
                onPageChange={(_, p) => setCustomerPage(p)}
                rowsPerPage={customerRowsPerPage}
                onRowsPerPageChange={(e) => { setCustomerRowsPerPage(parseInt(e.target.value, 10)); setCustomerPage(0); }}
                rowsPerPageOptions={[8, 10, 20]}
                labelRowsPerPage="表示件数:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}名`}
              />
            </Paper>
          </>
        )}

        {/* Schedule */}
        {activeSection === 4 && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1C1C1C" }}>スケジュール</Typography>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", overflow: "hidden" }}>
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
                    {vehicles.slice(schedulePage * scheduleRowsPerPage, schedulePage * scheduleRowsPerPage + scheduleRowsPerPage).map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>{vehicle.name}</TableCell>
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
              <TablePagination
                component="div"
                count={vehicles.length}
                page={schedulePage}
                onPageChange={(_, p) => setSchedulePage(p)}
                rowsPerPage={scheduleRowsPerPage}
                onRowsPerPageChange={(e) => { setScheduleRowsPerPage(parseInt(e.target.value, 10)); setSchedulePage(0); }}
                rowsPerPageOptions={[8, 15, 26]}
                labelRowsPerPage="表示件数:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}台`}
              />
            </Paper>
          </>
        )}

        {/* Documents */}
        {activeSection === 5 && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1C1C1C" }}>書類管理</Typography>
            <Grid container spacing={3}>
              {[
                { title: "見積書", desc: "お客様へのお見積りを作成・管理", count: 12 },
                { title: "注文書（発注書）", desc: "確定済みの注文書を管理", count: 8 },
                { title: "賃貸契約書", desc: "レンタル契約書の作成・管理", count: 8 },
                { title: "車両確認書", desc: "車両引渡し時の確認書", count: 6 },
                { title: "個人情報確認書", desc: "お客様の本人確認書類", count: 10 },
                { title: "請求書・領収書", desc: "支払い関連書類の管理", count: 15 },
              ].map((doc, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #EDEDED", transition: "all 0.2s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" } }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <DescriptionIcon sx={{ color: "#2B4C7E" }} />
                        <Chip label={`${doc.count}件`} size="small" sx={{ bgcolor: "rgba(43,76,126,0.08)", color: "#2B4C7E" }} />
                      </Box>
                      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{doc.title}</Typography>
                      <Typography variant="body2" sx={{ color: "#999" }}>{doc.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      {/* Booking Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          {selectedBooking && (
            <>
              <Box sx={{ p: 3, borderBottom: "1px solid #EDEDED", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>予約詳細 - {selectedBooking.id}</Typography>
                <IconButton onClick={() => setModalOpen(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Chip label={statusLabels[selectedBooking.status]} color={statusColors[selectedBooking.status]} />
                  <Typography variant="caption" sx={{ color: "#999" }}>登録日: {selectedBooking.createdAt}</Typography>
                </Box>

                <Typography variant="caption" sx={{ color: "#999", display: "block", mb: 0.5 }}>顧客情報</Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{selectedBooking.customerName}</Typography>
                  <Typography variant="body2" sx={{ color: "#5A5A5A" }}>{selectedBooking.customerEmail}</Typography>
                  <Typography variant="body2" sx={{ color: "#5A5A5A" }}>{selectedBooking.customerPhone}</Typography>
                </Paper>

                <Typography variant="caption" sx={{ color: "#999", display: "block", mb: 0.5 }}>車両情報</Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{getVehicleName(selectedBooking.vehicleId)}</Typography>
                  {getVehicle(selectedBooking.vehicleId) && (
                    <Typography variant="body2" sx={{ color: "#5A5A5A" }}>
                      {getVehicle(selectedBooking.vehicleId)!.category} | {getVehicle(selectedBooking.vehicleId)!.seats}人乗り | {getVehicle(selectedBooking.vehicleId)!.transmission}
                    </Typography>
                  )}
                </Paper>

                <Typography variant="caption" sx={{ color: "#999", display: "block", mb: 0.5 }}>レンタル期間</Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {selectedBooking.startDate} ~ {selectedBooking.endDate}
                  </Typography>
                </Paper>

                <Typography variant="caption" sx={{ color: "#999", display: "block", mb: 0.5 }}>合計金額</Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: "rgba(43,76,126,0.03)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", color: "#C23B22" }}>
                    ¥{selectedBooking.totalAmount.toLocaleString()}
                  </Typography>
                </Paper>

                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button variant="contained" fullWidth sx={{ bgcolor: "#2B4C7E", "&:hover": { bgcolor: "#1A3154" } }} onClick={() => { generatePDF(selectedBooking!); }}>
                    PDF作成
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ borderColor: "#2B4C7E", color: "#2B4C7E" }}>
                    編集
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
