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
    fetch("http://localhost:8080/add-movie-reviews", {
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
