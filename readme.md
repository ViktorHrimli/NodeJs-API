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

## Contacts

Contacts services is intended for get all contacts, get contacts by id, delet, update users contacts.

#### Path Api Contacts

##### Base path by users "api/contacts"

| Path          | Method | Endpoint                 |
| ------------- | ------ | ------------------------ |
| /             | Get    | Get all contacts         |
| /:id          | Get    | Get contacts by id       |
| /             | Post   | Create new contacts      |
| /:id          | Delete | Delete contacts          |
| /:id          | PATCH  | Update contacts info     |
| /:id/favorite | PATCH  | Update contacts favorite |

## Items

| Field    | Type    | Discriptions          | Required          |
| -------- | ------- | --------------------- | ----------------- |
| Email    | String  | Unique contacts email | true              |
| Name     | String  | Contacts UserName     | true              |
| Phone    | String  | +38 XXX XXX XX        | true              |
| Favorite | Boolean | Favorite Contacts     | default = false   |
| Owner    | Obj_id  | User id               | default = MongoDb |
| \_id     | Obj_id  | Unique key MongoDb    | default = MongoDb |
