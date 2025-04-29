import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendDistPath));

    app.get(/(.*)/, (req, res) => {
        const indexHtmlPath = path.join(frontendDistPath, "index.html");
        res.sendFile(indexHtmlPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(err.status).send(err.message);
            }
        });
    });    
}

server.listen(PORT, () => {
    console.log("🚀 Server is running on PORT: " + PORT);
    connectDB();
});
