'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import { Container, Box, Typography, Paper } from '@mui/material';

export default function RegisterPage() {
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
                        アカウント作成
                    </Typography>
                    <RegisterForm />
                </Paper>
            </Box>
        </Container>
    );
}
