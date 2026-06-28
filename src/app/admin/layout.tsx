"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Badge,
  Tabs,
  Tab,
  Avatar,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const DRAWER_WIDTH = 250;

const menuItems = [
  { path: "/admin", label: "ダッシュボード", icon: <DashboardIcon />, badge: 0 },
  { path: "/admin/inquiries", label: "問い合わせ管理", icon: <InboxIcon />, badge: 3 },
  { path: "/admin/quotes", label: "見積り管理", icon: <RequestQuoteIcon />, badge: 2 },
  { path: "/admin/bookings", label: "予約管理", icon: <BookOnlineIcon />, badge: 0 },
  { path: "/admin/vehicles", label: "車両管理", icon: <DirectionsCarIcon />, badge: 0 },
  { path: "/admin/customers", label: "顧客管理", icon: <PeopleIcon />, badge: 0 },
  { path: "/admin/schedule", label: "スケジュール", icon: <CalendarMonthIcon />, badge: 0 },
  { path: "/admin/options", label: "オプション品管理", icon: <ShoppingCartIcon />, badge: 0 },
  { path: "/admin/documents", label: "書類管理", icon: <DescriptionIcon />, badge: 0 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_logged_in");
    if (session === "true") {
      setIsLoggedIn(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Login page doesn't show sidebar
  if (pathname === "/admin/login" || !isLoggedIn) {
    return <>{children}</>;
  }

  const currentTab = menuItems.findIndex((item) => item.path === pathname);

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          bgcolor: "#1E2B2B",
          color: "white",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.05em" }}>
            COMPASS 管理画面
          </Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", mt: 0.3 }}>
            管理者パネル
          </Typography>
        </Box>

        <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.3 }}>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  "&.Mui-selected": { bgcolor: "rgba(184,54,59,0.15)", "&:hover": { bgcolor: "rgba(184,54,59,0.2)" } },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                }}
              >
                <ListItemIcon sx={{ color: pathname === item.path ? "#B8363B" : "rgba(255,255,255,0.4)", minWidth: 34 }}>
                  {item.badge > 0 ? <Badge badgeContent={item.badge} color="error" variant="dot">{item.icon}</Badge> : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: "0.85rem" } } }} />
                {item.badge > 0 && (
                  <Typography sx={{ fontSize: "0.7rem", bgcolor: "#B8363B", color: "white", px: 0.8, py: 0.2, borderRadius: 1, fontWeight: 600 }}>
                    {item.badge}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#2D3A3A", fontSize: 13 }}>管</Avatar>
            <Box>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>管理者</Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>admin@compass-rental.jp</Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            onClick={() => { sessionStorage.removeItem("admin_logged_in"); router.push("/admin/login"); }}
            sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", justifyContent: "flex-start", "&:hover": { color: "white" } }}
          >
            ログアウト
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#F5F6F4", overflow: "auto" }}>
        {/* Mobile tabs */}
        <Box sx={{ display: { md: "none" }, borderBottom: "1px solid #E8E5E0", bgcolor: "white" }}>
          <Tabs
            value={currentTab >= 0 ? currentTab : 0}
            onChange={(_, v) => router.push(menuItems[v].path)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {menuItems.map((item) => (
              <Tab key={item.path} label={item.label} sx={{ textTransform: "none", minWidth: "auto", fontSize: "0.8rem" }} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
