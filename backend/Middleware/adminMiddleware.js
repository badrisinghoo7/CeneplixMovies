// Middleware to check if user is admin
export default function adminMiddleware(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
}
