"use client";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from "@mui/material";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TodayIcon from "@mui/icons-material/Today";
import { bookings, vehicles, customers } from "@/data/demo";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const statusLabels: Record<string, string> = { pending: "保留中", confirmed: "確認済", active: "利用中", completed: "完了", cancelled: "キャンセル" };
const statusColors: Record<string, "warning" | "info" | "success" | "default" | "error"> = { pending: "warning", confirmed: "info", active: "success", completed: "default", cancelled: "error" };

export default function AdminDashboard() {
  const totalRevenue = bookings.reduce((s, b) => s + b.totalAmount, 0);
  const activeRentals = bookings.filter((b) => b.status === "active").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const todayPickups = bookings.filter((b) => b.status === "confirmed" && b.startDate === new Date().toISOString().split("T")[0]).length;
  const todayReturns = bookings.filter((b) => b.status === "active" && b.endDate === new Date().toISOString().split("T")[0]).length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  const stats = [
    { label: "本日の受取", value: todayPickups, icon: <TodayIcon sx={{ fontSize: 28 }} />, color: "#10b981" },
    { label: "本日の返却", value: todayReturns, icon: <TodayIcon sx={{ fontSize: 28 }} />, color: "#06b6d4" },
    { label: "新規問い合わせ", value: 3, icon: <NotificationsIcon sx={{ fontSize: 28 }} />, color: "#f59e0b" },
    { label: "見積り保留", value: 2, icon: <BookOnlineIcon sx={{ fontSize: 28 }} />, color: "#8b5cf6" },
    { label: "今週の予約", value: bookings.length, icon: <BookOnlineIcon sx={{ fontSize: 28 }} />, color: "#3b82f6" },
    { label: "利用中車両", value: `${activeRentals}/${vehicles.length}`, icon: <DirectionsCarIcon sx={{ fontSize: 28 }} />, color: "#ec4899" },
  ];

  const recentBookings = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 7);
  const getVehicleName = (id: string) => vehicles.find((v) => v.id === id)?.name || id;

  // Pie chart data - booking status
  const pieData = [
    { name: "保留中", value: pendingBookings, color: "#f59e0b" },
    { name: "確認済", value: bookings.filter((b) => b.status === "confirmed").length, color: "#3b82f6" },
    { name: "利用中", value: activeRentals, color: "#10b981" },
    { name: "完了", value: completedBookings, color: "#6B6B6B" },
  ];

  // Pie chart data - vehicle category
  const categoryPie = [
    { name: "コンパクト", value: vehicles.filter((v) => v.category === "コンパクト").length, color: "#3b82f6" },
    { name: "SUV", value: vehicles.filter((v) => v.category === "SUV").length, color: "#10b981" },
    { name: "バン", value: vehicles.filter((v) => v.category === "バン").length, color: "#f59e0b" },
  ];

  // Bar chart data - monthly revenue (demo)
  const monthlyRevenue = [
    { month: "1月", 売上: 280000 },
    { month: "2月", 売上: 320000 },
    { month: "3月", 売上: 450000 },
    { month: "4月", 売上: 520000 },
    { month: "5月", 売上: 680000 },
    { month: "6月", 売上: totalRevenue },
  ];

  // Line chart data - weekly bookings (demo)
  const weeklyBookings = [
    { week: "第1週", 予約数: 8, 問い合わせ: 12 },
    { week: "第2週", 予約数: 12, 問い合わせ: 15 },
    { week: "第3週", 予約数: 10, 問い合わせ: 18 },
    { week: "第4週", 予約数: 15, 問い合わせ: 20 },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>ダッシュボード</Typography>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={idx}>
            <Card sx={{ borderRadius: 2, height: "100%" }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: 700 }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ color: "#6B6B6B" }}>{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Monthly Revenue Bar Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>月別売上推移</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                <ReTooltip formatter={(value) => [`¥${Number(value).toLocaleString()}`, "売上"]} />
                <Bar dataKey="売上" fill="#2D3A3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Booking Status Pie Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>予約ステータス内訳</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Weekly Bookings Line Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>週別予約・問い合わせ推移</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ReTooltip />
                <Legend />
                <Line type="monotone" dataKey="予約数" stroke="#B8363B" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="問い合わせ" stroke="#2D3A3A" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Vehicle Category Pie Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>車両カテゴリ構成</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={categoryPie} cx="50%" cy="50%" outerRadius={85} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}台`}>
                  {categoryPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        {/* Recent bookings */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", overflow: "hidden" }}>
            <Box sx={{ p: 2.5, borderBottom: "1px solid #E8E5E0", display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 600 }}>最近の予約</Typography>
              <Chip label={`${bookings.length}件`} size="small" />
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBookings.map((b) => (
                    <TableRow key={b.id} hover>
                      <TableCell>{b.customerName}</TableCell>
                      <TableCell>{getVehicleName(b.vehicleId)}</TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>{b.startDate}~{b.endDate}</TableCell>
                      <TableCell>¥{b.totalAmount.toLocaleString()}</TableCell>
                      <TableCell><Chip label={statusLabels[b.status]} color={statusColors[b.status]} size="small" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 2.5, mb: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>車両稼働率</Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#6B6B6B" }}>貸出中</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{vehicles.filter(v => !v.available).length}/{vehicles.length}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(vehicles.filter(v => !v.available).length / vehicles.length) * 100} sx={{ height: 6, borderRadius: 3, bgcolor: "#E8E5E0", "& .MuiLinearProgress-bar": { bgcolor: "#2D3A3A" } }} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#6B6B6B" }}>完了済</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{completedBookings}件</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(completedBookings / bookings.length) * 100} sx={{ height: 6, borderRadius: 3, bgcolor: "#E8E5E0", "& .MuiLinearProgress-bar": { bgcolor: "#10b981" } }} />
            </Box>
          </Paper>

          <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", p: 2.5 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>売上サマリー</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: "#6B6B6B" }}>今月売上</Typography>
              <Typography sx={{ fontWeight: 700, color: "#2D3A3A" }}>¥{totalRevenue.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: "#6B6B6B" }}>平均単価</Typography>
              <Typography sx={{ fontWeight: 700, color: "#2D3A3A" }}>¥{Math.round(totalRevenue / bookings.length).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#6B6B6B" }}>顧客数</Typography>
              <Typography sx={{ fontWeight: 700, color: "#2D3A3A" }}>{customers.length}名</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification Log */}
      <Paper sx={{ borderRadius: 2, border: "1px solid #E8E5E0", mt: 3, overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid #E8E5E0" }}>
          <Typography sx={{ fontWeight: 600 }}>最近の通知・メールログ</Typography>
        </Box>
        <Box sx={{ p: 0 }}>
          {[
            { time: "14:32", type: "メール送信", message: "田中 健太様に見積書をメール送信しました", status: "送信済" },
            { time: "14:15", type: "スタッフ通知", message: "新規問い合わせ(INQ-003)が届きました", status: "確認済" },
            { time: "13:50", type: "メール送信", message: "佐藤 美咲様に予約確認メールを送信しました", status: "送信済" },
            { time: "12:30", type: "スタッフ通知", message: "見積り(QT-2026-002)が承認されました", status: "確認済" },
            { time: "11:00", type: "メール送信", message: "中村 蓮様に注文書PDFをメール送信しました", status: "送信済" },
            { time: "10:20", type: "スタッフ通知", message: "予約フォーム(BK-2026-0042)が提出されました", status: "未確認" },
          ].map((log, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.5, borderBottom: idx < 5 ? "1px solid #F0F0F0" : "none" }}>
              <Typography variant="caption" sx={{ color: "#999", minWidth: 40 }}>{log.time}</Typography>
              <Chip label={log.type} size="small" variant="outlined" sx={{ minWidth: 80 }} />
              <Typography variant="body2" sx={{ flexGrow: 1, color: "#2D2D2D" }}>{log.message}</Typography>
              <Chip label={log.status} size="small" color={log.status === "未確認" ? "warning" : "default"} />
            </Box>
          ))}
        </Box>
      </Paper>
    </>
  );
}
