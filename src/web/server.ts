import app from "./app";
import dotenv from 'dotenv';
import { sequelize } from "../config/database";

dotenv.config();
const PORT = process.env.PORT;

app.get("/", async (req, res) =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        res.send('Connection has been established successfully');
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        res.send(`Error connecting to database: ${error}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running web http://localhost:${PORT}`);
});