import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// リクエストインターセプター（トークン付与）
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // 認証エラー時はログインページへリダイレクト
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
                // window.location.href = '/login'; // 無限ループ防止のため、ページによってはリダイレクトしない制御が必要かも
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
