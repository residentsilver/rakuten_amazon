FROM node:18-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー（バインドマウントする場合は不要だが、ビルド用に入れておく）
COPY . .

# Next.jsのテレメトリ無効化
ENV NEXT_TELEMETRY_DISABLED 1

# 開発サーバー起動
CMD ["npm", "run", "dev"]
