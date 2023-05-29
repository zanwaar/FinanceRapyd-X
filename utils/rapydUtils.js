import https from "https";
import crypto from "crypto";

const secretKey = process.env.RAPYD_SECRET_KEY;
const accessKey = process.env.RAPYD_ACCESS_KEY;

const makeRequest = async (method, urlPath, body = null) => {
  try {
    const httpMethod = method.toLowerCase(); // get|put|post|delete - harus dalam huruf kecil.
    const httpBaseURL = "sandboxapi.rapyd.net";
    const httpURLPath = urlPath; // Bagian setelah base URL.
    const salt = generateRandomString(8); // Digenerate secara acak untuk setiap permintaan.
    const idempotency = new Date().getTime().toString();
    const timestamp = Math.round(new Date().getTime() / 1000); // Waktu Unix saat ini (dalam detik).
    const signature = sign(httpMethod, httpURLPath, salt, timestamp, body);

    const options = {
      hostname: httpBaseURL,
      port: 443,
      path: httpURLPath,
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        salt: salt,
        timestamp: timestamp,
        signature: signature,
        access_key: accessKey,
        idempotency: idempotency,
      },
    };

    return await httpRequest(options, body);
  } catch (error) {
    console.error("Error generating request options:", error);
    throw error;
  }
};

const sign = (method, urlPath, salt, timestamp, body) => {
  try {
    let bodyString = "";
    if (body) {
      bodyString = JSON.stringify(body); // JSON yang di-stringify tanpa spasi.
      bodyString = bodyString === "{}" ? "" : bodyString;
    }

    const toSign =
      method.toLowerCase() +
      urlPath +
      salt +
      timestamp +
      accessKey +
      secretKey +
      bodyString;

    const hash = crypto.createHmac("sha256", secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");

    return signature;
  } catch (error) {
    console.error("Error generating signature:", error);
    throw error;
  }
};

const generateRandomString = (size) => {
  try {
    return crypto.randomBytes(size).toString("hex");
  } catch (error) {
    console.error("Error generating salt:", error);
    throw error;
  }
};

const httpRequest = (options, body) => {
  return new Promise((resolve, reject) => {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString === "{}" ? "" : bodyString;
      }

      const req = https.request(options, (res) => {
        let chunks = [];

        res.on("data", (chunk) => {
          chunks.push(chunk);
        });

        res.on("end", () => {
          let responseBody = Buffer.concat(chunks);
          let response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: responseBody.toString(),
          };

          if (response.statusCode !== 200) {
            reject(response);
          } else {
            resolve(response);
          }
        });
      });

      req.on("error", (error) => {
        reject(error);
      });

      req.write(bodyString);
      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

export { makeRequest };
