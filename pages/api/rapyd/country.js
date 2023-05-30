import { makeRequest } from "../../../utils/rapydUtils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await makeRequest("GET", "/v1/data/countries");
      const paymentMethods = response.body; // Respons dari API Rapyd
      res.status(response.statusCode).json(paymentMethods);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
