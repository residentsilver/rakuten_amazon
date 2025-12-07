'use client';

import { useAuth } from '@/hooks/useAuth';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        ダッシュボード
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        ようこそ、{user.username}さん
                    </Typography>
                    <Typography variant="body1" paragraph>
                        メールアドレス: {user.email}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={logout}>
                        ログアウト
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
