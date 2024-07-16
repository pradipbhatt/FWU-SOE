import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoute from "./route/admin.route.js";
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js";
import connectDB from "./lib/db.js";
import quizRoutes from './route/quiz.route.js';
import quizResultRoute from "./route/quizResult.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;

// Define routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use('/api', quizRoutes);
app.use('/api', quizResultRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});
