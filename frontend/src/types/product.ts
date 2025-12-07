// 商品リスト単位のデータ型 (ProductListing)
export interface Listing {
  id: number;
  ec_site: 'amazon' | 'rakuten';
  product_url: string;
  shop_name: string;
  current_price: number; // 価格
  shipping_fee: number; // 送料
  total_cost: number; // 総コスト (price + fee)
  unit_price: number | null; // 計算後の単価 (nullの場合は計算不可)
  unit_type: 'ml' | 'g' | 'piece' | 'unknown'; // 単価の基準単位
  is_prime: boolean;
  in_stock: boolean;
}

// 商品グループ単位のデータ型 (Product)
export interface Product {
  id: number;
  name: string;
  image_url: string;
  jan_code: string | null;
  listings: Listing[]; // 複数のECサイトのリスティング
}

export type SortKey = 'total_cost' | 'unit_price';
export type SortOrder = 'asc' | 'desc';

// お気に入りデータ型
export interface Favorite {
  id: number;
  product: {
    id: number;
    name: string;
    image_url: string;
  };
  saved_price: number;
  current_price: number;
  price_change: {
    amount: number;
    percentage: number;
  };
  alert_price: number | null;
  created_at: string;
  latest_listing: Listing;
}

// 価格履歴データ型
export interface PriceHistory {
  date: string;
  price: number;
  shipping_fee: number;
  total_cost: number;
}

export interface PriceHistoryData {
  product_id: number;
  histories: PriceHistory[];
  statistics: {
    min_price: number;
    max_price: number;
    avg_price: number;
    price_change: number;
    price_change_percentage: number;
  };
}

// ユーザーデータ型
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// APIレスポンス型
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}
