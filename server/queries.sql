CREATE TABLE movie_reviews (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_title TEXT NOT NULL,
    user_name TEXT,
    review TEXT,
    watch_again BOOLEAN DEFAULT FALSE,
    rating INT CHECK (rating BETWEEN 1 and 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
)

--adding new column for likes in movie_reviews table
ALTER TABLE movie_reviews 
    ADD COLUMN likes INTEGER DEFAULT 0;

--testing: adding new data to table
INSERT INTO movie_reviews (movie_title, user_name, review, watch_again, rating)
VALUES ('The Conjuring', 'Bob', 'Too many jump scares for me', FALSE, 3), ('Scream', 'Dana', 'Best slasher movie ever! Will definitely rewatch', TRUE, 5), ('Halloween', 'Ross', 'Movie was not scary at all!', FALSE, 2)


SELECT * FROM movie_reviews;