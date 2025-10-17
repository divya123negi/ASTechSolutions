import rateLimit from "express-rate-limit";

// Allow only 5 submissions per IP per 24 hours
export const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "You have reached the limit. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
