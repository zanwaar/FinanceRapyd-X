import { makeRequest } from "../../utils/rapydUtils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const requestBody = req.body; // Data payment methods yang dikirimkan dalam body permintaan
      const response = await makeRequest("POST", "/v1/checkout", requestBody);
      const createdPaymentMethod = response.body; // Respons dari API Rapyd setelah pembuatan payment method
      res.status(response.statusCode).json(createdPaymentMethod);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
