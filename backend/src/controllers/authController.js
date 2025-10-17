import jwt from "jsonwebtoken";

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: { token }
 */
export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });

  res.status(200).json({ token, message: "Login successful" });
};

/**
 * GET /api/auth/validate
 * Header: Authorization: Bearer <token>
 */
export const validate = (req, res) => {
  // req.user is set by requireAuth middleware
  return res.status(200).json({ user: req.user });
};
