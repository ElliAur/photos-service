# Photos Service

## Description

Photos Service is a Node.js application for managing and processing photos. This project was started using the [NestJS framework TypeScript starter repository](https://github.com/nestjs/nest).

## Functionality

The Photos Service provides the following functionalities:

- **User Management**: Create, read, update, and delete user profiles.
- **Photo Management**: Upload, view, edit, and delete photos.
- **Category Management**: Organize photos into categories.
- **Authentication**: Secure endpoints using JWT tokens.
- **Admin Features**: Initial admin user creation.
- **Database Integration**: Uses MySQL for data storage.
- **Docker Support**: Containerized application for easy deployment.

## Project setup

To set up the project, run the following command:

```bash
$ npm install
```

## Docker setup

To set up Docker using the `docker-compose.yaml` file, follow these steps:

1. Create a `.env` file in the root directory of the project with the following content:

    ```properties
    COMPOSE_PROJECT_NAME="photos-service"
    DB_HOST_IP=your_db_host_ip
    DB_HOST="your_db_host"
    DB_HOST_PORT=your_db_host_port
    DB_ROOT_PASSWORD=your_root_password
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
    ```

2. Run the following command to start the Docker containers:

    ```bash
    $ docker-compose up -d
    ```

## Compile and run the project

To compile and run the project, use the following command:

```bash
$ npm run start
```

## Testing

Testing is not yet implemented.

## Usage

To use the Photos Service, you must first authenticate by using the `/login` endpoint to obtain an access token. This token is required to access other protected endpoints.

1. **Login**: Obtain an access token by sending a POST request to the `/login` endpoint with your credentials.
2. **Access Protected Endpoints**: Use the obtained access token in the Authorization header (Bearer token) to access other endpoints.

### Admin User

The initial admin user is created with the following credentials:

- **Username**: admin@photosservice.fi
- **Password**: admin123
- **Name**: admin

## Using the API with Postman

Here are some examples of how to use the API endpoints with Postman:

1. **Login**

    - **Endpoint**: `POST /login`
    - **Body**: 
      ```json
      {
        "username": "admin@photosservice.fi",
        "password": "admin123"
      }
      ```
    - **Response**: 
      ```json
      {
        "accessToken": "your_jwt_token"
      }
      ```

2. **Get User Profile**

    - **Endpoint**: `GET /users/:id`
    - **Headers**: 
      ```json
      {
        "Authorization": "Bearer your_jwt_token"
      }
      ```

3. **Upload Photo**

    - **Endpoint**: `POST /photos`
    - **Headers**: 
      ```json
      {
        "Authorization": "Bearer your_jwt_token"
      }
      ```
    - **Body**: Form-data with key `file` and the photo file as value, and additional JSON data:
      ```json
      {
        "name": "photo_name",
        "location": "photo_location",
        "description": "photo_description",
        "url": "url_to_photo",
        "owner": "username",
        "categories": [
          "Sights",
          "Activities"
        ]
      }
      ```

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Author

This project was made by [ElliAur](https://github.com/ElliAur) as a course project for the Cloud Computing course in the autumn of 2024.
