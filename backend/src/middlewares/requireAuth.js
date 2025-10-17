import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally check role
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
