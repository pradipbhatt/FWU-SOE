import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoute from "./route/admin.route.js";
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js";
<<<<<<< HEAD
=======

>>>>>>> b10e11a3f8b03fbf2923898069e2c476556b0a7e
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;

// Define routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/book", bookRoute);
<<<<<<< HEAD

=======
>>>>>>> b10e11a3f8b03fbf2923898069e2c476556b0a7e
app.get("/", (req, res) => {
    res.send("Hello World");
}
);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});
