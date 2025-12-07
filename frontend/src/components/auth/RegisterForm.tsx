'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import Link from 'next/link';

export default function RegisterForm() {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== passwordConfirm) {
            setError('パスワードが一致しません');
            return;
        }

        setLoading(true);
        try {
            await register(username, email, password);
        } catch (err: any) {
            if (err.response?.data?.errors) {
                // バリデーションエラーの場合、最初のエラーメッセージを表示
                const messages = Object.values(err.response.data.errors).flat();
                setError(messages[0] as string);
            } else {
                setError(err.response?.data?.message || '登録に失敗しました');
            }
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
                id="username"
                label="ユーザー名"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ minLength: 3, maxLength: 20, pattern: '[a-zA-Z0-9_]+' }}
                helperText="3〜20文字、英数字とアンダースコア"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                type="email"
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="8文字以上、英大文字・小文字・数字を含む"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="パスワード確認"
                type="password"
                id="password_confirmation"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : '登録する'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
                <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary">
                        すでにアカウントをお持ちの方はこちら
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
