// import express from "express";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import dotenv from "dotenv";
// import path from "path";
// import {connectDB} from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./lib/socket.js";

// dotenv.config();

// const PORT = process.env.PORT;
// const __dirname = path.resolve();
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true 
// }));
// app.use("/api/auth",authRoutes);
// app.use("/api/messages",messageRoutes);
// if(process.env.NODE_ENV==="production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }
// server.listen(PORT, () => {
//     console.log("Server is running on PORT: " + PORT);
//     connectDB();
// });


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

console.log("➡️ Applying middlewares...");
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));
console.log("✅ Middleware applied.");

// Mount auth routes
console.log("➡️ Mounting /api/auth routes...");
app.use("/api/auth", authRoutes);
console.log("✅ /api/auth routes mounted.");

// Mount message routes
console.log("➡️ Mounting /api/messages routes...");
app.use("/api/messages", messageRoutes);
console.log("✅ /api/messages routes mounted.");

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    console.log("➡️ Serving frontend from /frontend/dist...");
    const frontendDistPath = path.join(__dirname, "../frontend/dist");
    console.log("Frontend path:", frontendDistPath);
    app.use(express.static(frontendDistPath));

    console.log("➡️ Adding catch-all route for frontend...");
    app.get(/(.*)/, (req, res) => {
        console.log("Matched a request!");  
        const indexHtmlPath = path.join(frontendDistPath, "index.html");
        console.log("Attempting to send file from:", indexHtmlPath);
        res.sendFile(indexHtmlPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(err.status).send(err.message);
            }
        });
    });    
    console.log("✅ Catch-all route set.");
}

server.listen(PORT, () => {
    console.log("🚀 Server is running on PORT: " + PORT);
    connectDB();
});
