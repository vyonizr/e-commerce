# e-commerce: Divenire

## Usage

It is recommended to have [nodemon](https://nodemon.io/) installed globally before you begin.

1. Setup your MongoDB database name on `app.js` inside `server` folder
2. Create a file named `.env` and set it up based on `.env.example` (Read [dotenv documentation](dotenv) for details)
3. Open a terminal. Launch your MongoDB server by running `mongod`. If it fails, try it again with `sudo` prefix (Linux).
4. Open a terminal. Get inside `server` directory. Run `npm install` to install dependencies and then run `npm run dev`.

You're all set, if you are only using the API with API testing app like [Postman](https://www.getpostman.com/). If you want to run the client side as well, install [Vue CLI](https://cli.vuejs.org/). Global install is recommended. The next step is:

5. Open a terminal. Get inside `client` directory.
6. Run `npm install`
7. Run `npm run serve`

#### Side note

If you want to conduct a test, make sure you have changed mongoose connection on file `app.js` beforehand to

```javascript
mongoose.connect("mongodb://localhost:27017/ecommerce-" + process.env.NODE_ENV, { useNewUrlParser: true })
```

as it has hooks to **clear all database collection** on every test. Then:

1. Open a terminal. Get inside `server` directory.
2. Run `npm run test`

## Routes

### Users

| Route | Method | Header(s) | Body | Description | Response |
| ----- | ------ | --------- | ---- | ----------- | -------- |
| `/users` | GET | `Authentication:token` | - | Get all users | Success<br />Code: 200<br/>body: [{object user}, {object user}, ... ]<br /><br />Error:<br />(500)<br />body: {object error} |
| `/users/login` | POST | - | `email:String` (**required**),`password:String` (**required**) | Log in and obtain a `JSON Web Token` | Success<br />Code: 200<br/>body: [{object user}, {object user}, ... ]<br /><br />Error (wrong email/password):<br />(401)<br />body: {object error}<br /><br />Error (email not found):<br />(404)<br />body: {object error}<br /><br />Error:<br />(500)<br />body: {object error} |
| `/users/register` | POST | - | `email:String` (**required**),`name:String` (**required**),`password:String` (**required**) | Register a user | Success<br />Code: 201<br/>body: {token:String}<br /><br />Error (blank required field(s)):<br />(400)<br />body: {object error}<br /><br />Error:<br />(500)<br />body: {object error} |
| `/users/register/admin` | POST | - | `email:String` (**required**),`name:String` (**required**),`password:String` (**required**) | Log in by google and obtain a `JSON Web Token` | Success<br />Code: 201<br/>body: {token:String}<br /><br />Error (blank required field(s)):<br />(400)<br />body: {object error}<br /><br />Error:<br />(500)<br />body: {object error} |

### Products

| Route | Method | Header(s) | Body | Params | Query | Description | Response |
| ----- | ------ | --------- | ---- | ------ | ----- | ----------- | -------- |
| `/products` | GET | - | - | - | - | Get all products | Success<br />Code: 200<br/>body: [{object product}, {object product}, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |
| `/products?productId={productId}` | GET | - | - | - | `productId` | Get a product detail | Success<br />Code: 200<br/>body: {object product}<br/><br/>Error:<br/>(500)<br />body: {object error} |
| `/products` | POST | `Authentication:token` | `name:String` (**required**), `image:File` (**required**), `price:Number` (**required**), `stock:Number` (**required**) | - | - | Create a product (**administrator only**) | Success<br />Code: 201<br/>body: {object product}<br /><br />Error (blank required field(s)):<br />(400)<br />body: {object error}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/products/:productId` | PATCH | `Authentication:token` | `name:String` (**required**), `image:File` (**required**), `price:Number` (**required**), `stock:Number` (**required**) | `productId` | - | Edit a product (**administrator only**) | Success<br />Code: 200<br/>body: { object updated product }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login."<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/products/:productId` | DELETE | `Authentication:token` | - | `productId` | - | Delete a product (**administrator only**) | Success<br />Code: 200<br/>body: { message: "delete success" }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |

### Carts

| Route | Method | Header(s) | Body | Params | Description | Response |
| ----- | ------ | --------- | ---- | ------ | ----------- | -------- |
| `/carts` | GET | `Authentication:token` | - | - | Get a logged in user's cart | Success<br />Code: 200<br/>body: [{object product}, {object product}, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |
| `/carts` | POST | `Authentication:token` | `productId:String` | - | Add a product to logged in user's cart | Success<br />Code: 200<br/>body: [{object product}, {object product}, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |
| `/carts/:productId` | DELETE | `Authentication:token` | - | `productId` | Remove a product from logged in user's cart | Success<br />Code: 200<br/>body: [{object product}, {object product}, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |