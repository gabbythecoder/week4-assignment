// todo - collect data from user and send to server
// - select the HTML element with user's input
const movieReviewForm = document.getElementById("movie-review-form");

// - add an event to this HTML element
movieReviewForm.addEventListener("submit", handleSubmit);

// - the event handler has the following steps:
//      - prevent the default behaviour of the event
//      - create template for user's data
//      - fill in the template with user's data
//      - send data (JSON) to the server -> while in development, the server url uses local host, but when you finish deploying and your project is done, you need to replace the local host url with the server deployed url (from render)

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(movieReviewForm);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);

    //need to update this to the correct URL - this is just for testing
    fetch("https://week4-assignment-1bct.onrender.com/add-movie-reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ formValues }),
    });
};

// todo - get database data from the server and render (display) on the page
// - connect our client with the specific server route that GETs my data
// - in some sort of loop, create new HTML elements to display each piece of data, and append to the DOM 
const reviewContainer = document.getElementById("review-container");

//fetching API 
async function fetchMovieReviews() {
    const response = await fetch("https://week4-assignment-1bct.onrender.com/movie-reviews");
    const reviews = await response.json();
    console.log(reviews);

    return reviews;
}

//render the reviews on the page
async function displayReviews() {
    const reviews = await fetchMovieReviews();

    reviewContainer.innerHTML = "";

    reviews.forEach((review) => {
        const reviewDisplay = document.createElement("div");
        reviewDisplay.className = "review";

        const reviewMovieTitle = document.createElement("p");
        reviewMovieTitle.className = "review-movie-title";
        reviewMovieTitle.textContent = "Movie: " + review.movie_title;

        const reviewUserName = document.createElement("p");
        reviewUserName.className = "review-user-name";
        reviewUserName.textContent = review.user_name;

        const reviewText = document.createElement("p");
        reviewText.className = "review-text";
        reviewText.textContent = review.review;

        const reviewWatchAgain = document.createElement("p");
        reviewWatchAgain.className = "review-watch-again";
        reviewWatchAgain.textContent = review.watch_again ? "Yes" : "No"; //making sure it shows Yes/No as it appears on form rather than boolean values

        const reviewRating = document.createElement("div");
        reviewRating.className = "review-rating";
        //render star rating 
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("i");
            if (i <= review.rating) {
                star.className = "fa-solid fa-ghost";
                star.style.color = "#ff4444";
            } 
            reviewRating.appendChild(star);
        }

        //appending to the reviewDisplay container
        reviewDisplay.appendChild(reviewMovieTitle);
        reviewDisplay.appendChild(reviewUserName);
        reviewDisplay.appendChild(reviewText);
        reviewDisplay.appendChild(reviewWatchAgain);
        reviewDisplay.appendChild(reviewRating);

        //append to the reviewContainer 
        reviewContainer.appendChild(reviewDisplay);
    });
}

displayReviews();

//selecting the stars for ratings  
const stars = document.querySelectorAll("#star-rating i");
const ratingInput = document.getElementById("rating");

stars.forEach((star, index1) => {
    star.addEventListener("click", () => {

        ratingInput.value = index1 + 1;
            
        stars.forEach((star, index2) => {
            if (index2 <= index1) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });
    });
});