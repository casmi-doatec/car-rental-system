"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, Box, Paper, Alert } from "@mui/material";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login: any email + password "compass" works
    if (password === "compass") {
      sessionStorage.setItem("admin_logged_in", "true");
      router.push("/admin");
    } else {
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F5F6F4" }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 5, border: "1px solid #E8E5E0", borderRadius: 2, textAlign: "center" }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ width: 48, height: 48, bgcolor: "#2D3A3A", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 700, mx: "auto", mb: 2 }}>
              C
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem", letterSpacing: "0.06em" }}>COMPASS 管理画面</Typography>
            <Typography variant="body2" sx={{ color: "#6B6B6B", mt: 0.5 }}>ログインしてください</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ bgcolor: "#2D3A3A", "&:hover": { bgcolor: "#1A2424" }, borderRadius: 50, py: 1.3 }}
            >
              ログイン
            </Button>
          </Box>

          <Typography variant="caption" sx={{ display: "block", mt: 3, color: "#999" }}>
            デモ用: パスワード「compass」でログインできます
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
