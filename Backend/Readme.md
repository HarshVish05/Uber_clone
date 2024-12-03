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
