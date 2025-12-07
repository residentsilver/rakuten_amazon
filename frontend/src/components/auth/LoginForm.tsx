'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TextField, Button, Box, Typography, Alert, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import Link from 'next/link';

export default function LoginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password, remember);
        } catch (err: any) {
            setError(err.response?.data?.message || 'ログインに失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス または ユーザー名"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                label="ログイン状態を保持する"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'ログイン'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
                <Link href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary">
                        アカウントをお持ちでない方はこちら
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
