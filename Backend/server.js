import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; 
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005; 
const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRoutes);

// Explicit root-relative paths for robust production assets resolution
const frontendDistPath1 = path.resolve(__dirname, "Frontend", "dist");
const frontendDistPath2 = path.resolve(__dirname, "frontend", "dist");

app.use(express.static(frontendDistPath1));
app.use(express.static(frontendDistPath2));

app.get("*any", (req, res) => {
    res.sendFile(path.join(frontendDistPath1, "index.html"), (err) => {
        if (err) {
            res.sendFile(path.join(frontendDistPath2, "index.html"));
        }
    });
});

app.listen(PORT, () => {  
    connectDB(); 
    console.log(`Server started successfully at http://localhost:${PORT}`);
});
