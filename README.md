
# Web App Boilerplate

## Description

webapp-boilerplate is a simple boilerplate for building web applications using Docker Compose for containerization.

## Features

-   Dockerized development environment
-   Separate services for backend and frontend
-   Hot-reloading for development
-   Easily extendable and customizable

## Prerequisites

-   Docker
-   Docker Compose

## Getting Started

1.  Clone the repository:
    ```
    git clone <repository-url>
    ``` 
    
2.  Navigate to the project directory:
    ```
    cd webapp-boilerplate
    ``` 

3.  Start the Docker containers using Docker Compose:
    ```
    npm run build
    ``` 
    
4.  Access the application in your web browser:
    
    -   Backend: http://localhost/api
    -   Frontend: http://localhost

## Usage

-   Development: The development environment supports hot-reloading for both backend and frontend. Simply make changes to your code, and the changes will be automatically reflected in the running containers.
-   Production: For production deployment, build and deploy the Docker images to your production environment.

## Directory Structure

-   `backend/`: Backend service
-   `frontend/`: Frontend service
-   `infra/`: Infrastructure configurations (e.g., Docker Compose, nginx)
-   `shared/`: Infrastructure configurations (e.g., Docker Compose, nginx)

## Configuration

-   `.env`: Environment variables for the services

## Contributing

Contributions are welcome! Please create an issue or pull request with any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## TODO: 

### General

1. Create a script for compiling everything
2. Create a script for creating a new service (duplicate backend ? yeoman?)
3. SSL on local
4. Find a way to share common functions among services (currently ./scripts/copy-shared)

### Backend

1. Unit Tests
2. linter
3. Create exceptions handlers (middleware)
4. 

### Frontend

1. linter
