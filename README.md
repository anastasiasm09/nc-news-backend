# Hello everyone.

Welcome to my first backend project, and I'm excited to share it with you.

# Project Summary

This project is built using **Node.js** with **Express.js** for the server and **PostgreSQL** for the database.  
Unit tests for API routes are implemented using the **Jest** framework and **Supertest** library to ensure functionality and proper error handling.  
Test coverage in this project is 93%.

## Key Features
* **Retrieve Data:** Access articles, comments, topics, and user profiles.  
* **Interact with Articles:** Post new comments and engage in discussions.  
* **Vote System:** Upvote or downvote articles to express opinions.  
* **Manage Comments:** Delete your own comments when needed.  
* **Enhanced Browsing:** Sort and filter articles based on various criteria.  

## Available Endpoints

| Method | Endpoint                             | Description |
|--------|--------------------------------------|-------------|
| **GET**  | `/api`                              | Retrieve API information |
| **GET**  | `/api/topics`                       | Fetch all available topics |
| **GET**  | `/api/articles/:article_id`        | Retrieve a specific article by ID |
| **GET**  | `/api/articles`                     | Fetch all articles with sorting/filtering options |
| **GET**  | `/api/articles/:article_id/comments` | Get comments for a specific article |
| **POST** | `/api/articles/:article_id/comments` | Add a new comment to an article |
| **PATCH** | `/api/articles/:article_id`        | Update the vote count for an article |
| **DELETE** | `/api/comments/:comment_id`       | Delete a comment by its ID |

--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
