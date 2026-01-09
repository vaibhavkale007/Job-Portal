import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/data.js";
import UserRoute from "./routes/user.route.js";
import CompanyRoute from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"



dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

app.use(cors(corsOptions));

// api routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/company", CompanyRoute);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", applicationRoute);




const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
    }
};

startServer();
