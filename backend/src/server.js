import express from 'express';
import 'dotenv/config';

const app = express();

// configuration 
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// server 
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
