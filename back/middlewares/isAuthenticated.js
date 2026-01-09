import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // 🔍 DEBUG: check cookies
    console.log("🍪 COOKIES RECEIVED 👉", req.cookies);

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // ✅ attach user id to request
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log("❌ AUTH ERROR 👉", error.message);

    return res.status(401).json({
      message: "Token expired or invalid",
      success: false,
    });
  }
};

export default isAuthenticated;
