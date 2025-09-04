//imports
import express from "express";
import cors from "cors";
import { db } from "./database-connection.js";

//start express
const app = express();

//config express with JSON and cors
app.use(express.json());
app.use(cors());

//set up a port
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//set up a root route 
app.get("/", (request, response) => {
    response.json({ message: "Welcome to the server. GET comfy!"});
}); 

//===========================================

// todo - want to READ all data from my table

// todo - want to CREATE new data in the table 
// - remember the body and the formValues

