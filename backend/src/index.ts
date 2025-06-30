import { app } from "./app";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config();


connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port ${process.env.PORT || 4000}`);
    })
}).catch((err) => {
    console.log("failed to conect derver with db", err);
})