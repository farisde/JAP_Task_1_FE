# JAP_Task_1_FE

This is the FrontEnd repository for a movie rating app - MovieBuff similair to IMDB but much simpler. Main technology used for frontend development is React.

## Setup instructions

1. Clone this repository to your local machine
2. run `npm install` in the root folder
3. run `npm start` to start the application

**Important note**: Make sure that the corresponding [Backend Web API](https://github.com/farisde/JAP_TASK_1_WEB_API) is run on **https://localhost:5001** for all requests to work. If that is not the case on your local machine, then you will need to updated the routes in **auth-actions.js** and **movie-actions.js**.

## Functionalities

- List of Top 10 Movies with detailed information sorted by rating
- Toggle between Top 10 Movies and TV Shows
- Search any Movie/TV Show by title, description or cast
- Search includes special phrases such as: "5 stars", "at least 3 stars", "after 2015", "older than 3 years"
- Rate any Movie/TV Show with 1-5 stats
- Load more Movies/TV Shows (increments of 10)
- Users can Login or Sign Up for an account
