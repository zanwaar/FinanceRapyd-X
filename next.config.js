/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/rapyd", // Ganti dengan rute API Rapyd yang Anda gunakan
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000, https://finance-rapyd-x.vercel.app", // Atur sumber daya lintas asal yang diizinkan (gunakan "*" untuk mengizinkan dari mana saja, dalam pengembangan)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST", // Atur metode HTTP yang diizinkan
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, salt, timestamp, signature, access_key, idempotency", // Atur header yang diizinkan
          },
        ],
      },
      {
        source: "/api/rapyd/country", // Ganti dengan rute API Rapyd yang Anda gunakan
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000, https://finance-rapyd-x.vercel.app", // Atur sumber daya lintas asal yang diizinkan (gunakan "*" untuk mengizinkan dari mana saja, dalam pengembangan)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET", // Atur metode HTTP yang diizinkan
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, salt, timestamp, signature, access_key, idempotency", // Atur header yang diizinkan
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
