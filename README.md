# My-Landscaper

## Welcome to My-Landscaper!
My-Landscaper is the capstone project from my time at Flatiron School. This application empowers users to envision their dream landscapes and seamlessly communicate their vision to a landscaping company for accurate design, quoting, and installation.

Follow along for updates as I work to improve the user interface, database, and API, until the end of time. 

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

## My Landscaper Story

My Landscaper came to light in September of 2024 when I was enrolled in the Flatiron Software Engineering Program. We were tasked with creating a Capstone Project to close out our time at the program. With my last career in Landscape Design/Sales, I quickly came up with an application that solves a "problem" within that industry. One of the most time-consuming parts of being a landscape designer is communicating with the client to iron out the fine point details, i.e., what plants, hardscape material, furniture, lights, etc., they want to include in their project. My Landscaper completely removes that part of the process. Homeowners will be able to sign onto My Landscaper and create projects they want for their landscape. They will be able to give a detailed description of their project, select products from the database they would like to include in their project, and then send an email to landscape companies inviting them to bid/design their landscape project. Landscape companies can log on to view the homeowner's project and create a bid or design the project based on the homeowner's details and selected products. 

## Features

- **User Authentication**: Secure Login and registration.
- **Project Creation**: Users can create, edit, and delete projects.
- **Database Search**: Users can view the current database of products to include in projects.
- **Email Integration**: Users can email directly from the website; users can navigate to the website through a link in the email.
- **Status**: Keeps track of project progress throughout the process.

## Features Coming in the Near Future

- **User Profiles**: Profile page for each user to edit details.
- **Database Expansion**: Expand the current plant database and incorporate new materials, mulch, rock, hardscape material, furniture, etc.
- **Email Confirmation**: Confirmation email to confirm user email. 
- **Others**: Beneficial ideas that come up down the road.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/My-Landscaper-Project
    cd client
    ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Set up the backend server:**
   ```bash
   cd server
   pipenv install && pipenv shell
   ```

6. **Create .env File**
    You will need to create a .env file for salting passwords and the email integration.
    Needed varible names in .env.
    ```
    SECRET_KEY
    MAIL_PASSWORD
    MAIL_USERNAME
    ```

5. **Initialize Database**
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. **Seed Database:**
    ```bash
    python seed.py
    ```

7. **Start Flask API:**
    ```bash
    python app.py
    ```

## Usage

1. **Navigate to the application in your browser:**
   ```
   http://localhost:3000
   ```

2. **Register or log in:**
   Create a new account or log in with existing credentials.

3. **Have Fun**
    Play around with website, create a user project, add details and plants, send an email to yourself.
    Check out the email and view your project from the landscaper side.

## Tech stack

Below is the tech stack utlized in My Landscaper.

### Backend:
- **Python**: The primary programming language for the backend.
- **Flask**: A lightweight web framework for building web applications.
- **Flask SQLAlchemy**: An ORM (Object-Relational Mapping) tool for managing the database models and queries in a Pythonic way.
- **Flask Migrate**: An extension that handles SQLAlchemy database migrations for Flask applications using Alembic.
- **SQLite**: A lightweight relational database management system.
- **bcrypt**: A library for hashing and validating passwords securely.

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that serves as an alternative to Create React App for faster development in React.
- **TypeScript**: Type Technology built upon react for faster debugging and development. New Technology I learned for this project.
- **Semantic UI React**: A UI component framework based on Semantic UI, used for styling and building responsive interfaces.

### General:
- **JavaScript**: The primary programming language for the front end (alongside React.js).
- **HTML/CSS**: Markup and styling for the web pages.
- **SQLAlchemy Serializer**: A mixin used to serialize SQLAlchemy models to JSON format.

## Hope you enjoy!