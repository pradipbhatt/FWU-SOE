// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    const user = req.user; // Assuming user is added to req object by a previous middleware
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};
