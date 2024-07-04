// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    const user = req.body.requester; // Assuming requester info is provided in the body
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};
