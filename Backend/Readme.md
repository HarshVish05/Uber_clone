# **API Documentation: **

## **Method**
`POST`

---

## **Description**
This endpoint allows new users to register by providing their personal information, email, and password. The server validates the input, hashes the password, creates a user record in the database, and returns a token for authentication.

---

## **Request Body**

The endpoint expects a JSON object in the following format:

### **Required Fields**
| Field                  | Type   | Description                                  |
|------------------------|--------|----------------------------------------------|
| `fullname.firstname`   | String | First name of the user (minimum 3 characters). |
| `fullname.lastname`    | String | Last name of the user (optional, minimum 3 characters if provided). |
| `email`                | String | A valid email address.                       |
| `password`             | String | Password with a minimum of 6 characters.     |

---
### **Example**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

## **Example Response**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}

`token` (String): JWT token
```


# **API Documentation: User Login**

## **Endpoint**
### `POST`

---

## **Description**
This endpoint allows existing users to log in by validating their email and password. If the credentials are correct, the server responds with a JSON Web Token (JWT) for authentication and the user's details. Input validation is implemented to ensure proper data submission.

---

## **Request**

### **Headers**
No special headers are required for this endpoint, except the standard `Content-Type`:

- `Content-Type: application/json`

### **Request Body**
The request expects a JSON object with the following structure:

#### **Required Fields**
| Field      | Type   | Description                |
|------------|--------|----------------------------|
| `email`    | String | A valid registered email.  |
| `password` | String | The password for the user. |

#### **Example**
```json
{
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```

#### **Example Response**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "63f1a72b5e854e3c74f4e3b4",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com"
  }
}
```

# **API Documentation: User Profile and Logout**

## **Endpoints**

1. **`GET /users/profile`**  
   Retrieves the profile information of the authenticated user.

2. **`GET /users/logout`**  
   Logs out the authenticated user by blacklisting the token and clearing the authentication cookie.

---

## **1. Endpoint: `GET /users/profile`**

### **Description**
This endpoint allows an authenticated user to fetch their profile details. The request must include a valid token for authentication.

---

### **Request**

#### **Headers**
The `Authorization` header must include a valid JWT token in the following format:

- `Authorization: Bearer <token>`

---

### **Response**

#### **Success (200 OK)**

Returns the authenticated user's profile details.

##### **Example**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "janedoe@example.com"
}
```

# **API Documentation: User Logout**

## **Endpoint**
### `GET /users/logout`

---

## **Description**
This endpoint logs out an authenticated user by:
1. Blacklisting the provided JWT token to prevent further use.
2. Clearing the `token` cookie from the user's browser.

---

## **Request**

### **Headers**
The `Authorization` header must include a valid JWT token, or the token must be present in cookies.

- **Authorization Header (Optional):**  
  ```text
  Authorization: Bearer <token>
  ```
## **Example Response**

```json
{
  "message": "Logged out successfully"
}
```

