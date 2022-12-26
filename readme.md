# Contacts Book Api

### Overview

#### This is services by registrations users and saves yours contacts

### Geting Started

#### npm run start:dev => development

#### npm start => production

#### npm run test => start jest test

## Users

Users services is intended for registration user, login, logout, get current user, update user profile and avatar.

#### Path Api Users

##### Base path by users "api/users"

| Path     | Method | Endpoint                 |
| -------- | ------ | ------------------------ |
| /signup  | POST   | Create new User          |
| /login   | POST   | Enter user and get token |
| /current | GET    | Get cuurent user         |
| /logout  | ALL    | Logout cuurent user      |
| /avatars | PATCH  | Update user avatar       |
| /        | PATCH  | Update user information  |

## Items

| Field     | Type   | Discriptions             | Required           |
| --------- | ------ | ------------------------ | ------------------ |
| Email     | String | Unique user email        | true               |
| Password  | String | Password user            | true               |
| Subscribe | String | [starter, business, pro] | default = starter  |
| Avatar    | URL    | Avatar url               | default = gravatar |
| Token     | String | Update user avatar       | default = null     |
| \_id      | Obj_id | Unique key MongoDb       | default = MongoDb  |

<!-- Users: api/users
/: Method: PATCH,
======================
/signup: =>
Discribe: Registration new users
=>
Method:POST,
=>
Path:api/users/signup,
=>
Body: {
email: string.required,
password: string.required
subscription: string, default = starter, [starter, pro, buissnes]
}
=>
Response: {
email: string,
subscription: string,
avatarUrl: string
}
==========================
/login: => Method: POST
=> api/users/login
=> Body: {
email: string.required,
password: string.required
} =>
Response: {
token: string,
user: {
email: string,
subscription: string
}

# }

==========================
/logout: =>
Method: all =>
 api/users/logout
=> body: none
=>
Response: succses
==========================
/current: => Method: GET
=> api/users/current
=> body: none
=> Response: {
id: string,
email: string,
subscription: string,
token: string
}
/avatars: => Method: PATCH
=> -->
