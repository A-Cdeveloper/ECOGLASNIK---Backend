# CleanMe Backend API

## Overview

This project is a backend REST API built using Next.js 15, designed to support the **CleanMe** frontend application. The backend provides essential endpoints and services required for CleanMe’s functionality, enabling efficient communication between the client and server to facilitate the reporting and management of communal problems.

## Features

- RESTful API structure for reliable data interactions.
- Seamless integration with the CleanMe frontend application.
- Endpoints for creating, updating, and retrieving reports of issues.
- Support for user authentication and authorization.
- Integration with a database for persistent data storage.
- Image upload capabilities for problem reports.

## Technologies Used

- **Next.js 15**: A React-based framework for building the API and handling server-side rendering.
- **Prisma**: An ORM for interacting with the MySQL database.
- **MySQL**: A relational database management system for storing data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Node.js**: JavaScript runtime used to build the backend.
- **Middleware**: Used for handling API security, validation, and error handling.
- **Zod**: A schema validation library for validating and parsing API request payloads.
- **Nodemailer**: A library for sending emails, utilized for user email verification and notifications.
- **jose**: A library for managing JWT signing, verification, and encryption processes.

## Features

- **User Authentication**: Secure login, registration, and email verification using JWTs and Nodemailer.
- **CRUD Operations**: Manage problems, categories.
- **Database Integration**: Robust database interactions using Prisma and MySQL.
- **Validation**: Comprehensive schema validation with Zod for secure API inputs.

## API Endpoints

**GET /api/problems**: Fetch all problem reports.  
**GET /api/problems/?cat_id=4&sort=status,createdAt&order=ASC,DESC** : Filter/sorting problems  
**POST /api/problems**: Create a new problem report.

**GET /api/problems/id**: Fetch a specific problem by ID.   
**PUT /api/problems/id**: Update an existing problem.  
**DELETE /api/problems/id**: Delete a problem report.

**GET /api/categories**: Fetch all problem categories.  
**GET /api/categories/id**: Fetch a specific problem category.

**POST /api/auth/login** Login user  
**POST /api/auth/register** Register user  
**GET /api/auth/verify** Verify user account  
**POST /api/auth/forgot-password -** Forgot password reset  
**POST /api/auth/reset-password -** Reset password

## License

This project is licensed under the MIT License.

## Contact

For questions, feedback, or issues, please reach out to:

- **Email**: [aleksandar@e-seo.info](mailto:aleksandar@e-seo.info)
