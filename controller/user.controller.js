import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// Signup controller to create a new user
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, registrationNumber } = req.body;

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
        });

        // Set isAdmin based on a condition (e.g., first user is admin)
        if ((await User.countDocuments({})) === 0) {
            createdUser.isAdmin = true;
        }

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
