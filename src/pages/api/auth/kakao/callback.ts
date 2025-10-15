import { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Authorization code is required" });
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/users/auth/kakao/callback?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Set cookies from backend response
    if (response.headers.get("set-cookie")) {
      const cookies = response.headers.get("set-cookie")?.split(",");
      cookies?.forEach((cookie) => {
        res.setHeader("Set-Cookie", cookie.trim());
      });
    }

    // Redirect to home page or dashboard after successful authentication
    res.redirect(302, "/");
  } catch (error) {
    console.error("Kakao callback error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
