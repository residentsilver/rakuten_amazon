import Link from "next/link";
import { Button, Container, Typography, Box, Stack } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Price Master
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Amazonと楽天の価格を比較し、実質単価で最安値を見つけるアプリケーション
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Link href="/login" passHref>
            <Button variant="contained" size="large">
              ログイン
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="outlined" size="large">
              新規登録
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
