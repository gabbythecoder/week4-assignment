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
// todo - want to READ (GET) all data from my table
app.get("/movie-reviews", async (request, response) => {
    //query the database
    const query = await db.query(`SELECT * FROM movie_reviews`);
    response.json(query.rows);
});


// todo - want to CREATE (POST) new data in the table 
// - remember the body and the formValues
app.post("/add-movie-reviews", (request, response) => {
    const newMovieReview = request.body.formValues;
    const query = db.query(`INSERT INTO movie_reviews (movie_title, user_name, review, watch_again, rating) VALUES ($1, $2, $3, $4, $5)`,
        [newMovieReview.movie_title, newMovieReview.user_name, newMovieReview.review, newMovieReview.watch_again, newMovieReview.rating]
    );
        response.json("Data sent", query);
});

