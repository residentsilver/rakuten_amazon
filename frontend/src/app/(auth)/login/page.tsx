'use client';

import LoginForm from '@/components/auth/LoginForm';
import { Container, Box, Typography, Paper } from '@mui/material';

export default function LoginPage() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        ログイン
                    </Typography>
                    <LoginForm />
                </Paper>
            </Box>
        </Container>
    );
}
