# Json Web Tokens

A Node.js based backend application that uses Express framework to implement json web token(JWT) based authentication. Here password is encrypted and json files are used to maintain database

## Tech Stack

**Server:** Express, express-validator, bcrypt, uuid, typescript, jsonwebtoken, fs

**Express**- for Server side framework \
**express-validator** - for verifying inputs\
**bcrypt** - for encryption\
**typescript** - type based language developed on top of javascript\
**jsonwebtoken** - for token based authentication\
**fs** - for updating json files as database\

## Project Structure

    --- ## helpers
    --- ## routes
    --- ## blogs.json // database for blogs
    --- ## db.json // database for users
    --- ## index.ts //main server file

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET` : any string of any length that can serve as encryption key depending on security needs

## Run Locally

To install this project with npm or yarn.
Go to project directory

```bash
  git clone https://github.com/jainChetan81/JWT-Authentication.git
  cd JWT-Authentication
```

then

```bash
  npm install || yarn
  npm run dev || yarn dev
```

## Build

To build this project with npm or yarn.
Go to project directory

```bash
  npm run build || yarn build
```

## API Reference

#### POST Sign up

```http
  POST https://localhost:5000/auth/signup
```

| Body Content | Type     | Validation                       |
| :----------- | :------- | :------------------------------- |
| `email`      | `email`  | 3-32 characters, email type      |
| `password`   | `string` | min 6 chars, at least one number |

##### On Success - message, user: {email, id}, token( with 1hr of expiry)

##### On Failure - message(error)

#### POST Signin

```http
  POST https://localhost:5000/auth/signin
```

| Body Content | Type     | Validation                       |
| :----------- | :------- | :------------------------------- |
| `email`      | `email`  | 3-32 characters, email type      |
| `password`   | `string` | min 6 chars, at least one number |

##### On Success - message, user: {email, id}, token( with 1hr of expiry)

##### on Failure - message(error)

#### GET All Users

```http
  GET https://localhost:5000/auth/users
```

##### On Success - array of users

#### GET All User by Id

```http
  GET https://localhost:5000/auth/user/{:id}
```

##### On Success - user

##### On Failure - User not found

#### GET All Public Blogs

```http
  GET https://localhost:5000/blogs/public
```

##### On Success - user

##### On Failure - User not found

#### GET Private Blogs

```http
  POST https://localhost:5000/auth/signin
```

| Header         | Type              |
| :------------- | :---------------- |
| `x-auth-token` | `Bearer ${token}` |

##### On Success - array of Blogs

##### on Failure - message(error), either token has expired or invalid token

## Authors

-   [@jainChetan](https://thechetanjain.in)

## Lessons Learned

-   I started this project to learn about ExpressJS
-   Authentication with encrypted password

## Contributing

Contributions are always welcome!

See project structure

Please adhere to the Project Structure

## Feedback

If you have any feedback, please reach out to me at jain.cj.chetan@gmail.com

## 🚀 About Me

I am a Full Stack Web Developer with over two years of experience in various tech stacks.

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thechetanjain.in/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://thechetanjain.in/linkedin/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://thechetanjain.in/github)
