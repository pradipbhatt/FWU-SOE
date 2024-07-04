import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// Signup controller to create a new user (admin only)
// Signup controller to create a new user (admin only)
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, registrationNumber, isAdmin } = req.body;

        // Check if the requester is admin
        if (!req.headers['is-admin'] === 'true') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        // Check if email or registration number already exists
        const existingUser = await User.findOne({ $or: [{ email }, { registrationNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or registration number" });
        }

        const hashPassword = await bcryptjs.hash(password, 10); // Hash the password
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword,
            registrationNumber,
            isAdmin: isAdmin || false, // Assign isAdmin if provided, otherwise default to false
        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                registrationNumber: createdUser.registrationNumber,
                isAdmin: createdUser.isAdmin,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Login controller to authenticate a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                registrationNumber: user.registrationNumber,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to get all users (admin only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete controller to remove a user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the requester is admin
        if (!req.headers['is-admin'] === 'true') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Update user details controller (admin only)
export const updateUser = async (req, res) => {
    try {
        const { userId, fullname, email, registrationNumber, isAdmin } = req.body;

        // Check if the requester is admin
        if (!req.headers['is-admin'] === 'true') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.registrationNumber = registrationNumber || user.registrationNumber;
        user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                registrationNumber: user.registrationNumber,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
