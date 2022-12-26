- Contacts Book Api

- Overview
  This is services by registrations users and seves yours contacts

- Service api

  Users: api/users

  /signup: {
  Discribe: Registration new users
  Method:POST,
  Path:api/users/signup
  Request: {
  email: string.required,
  password: string.required
  subscription: string, default = starter, [starter, pro, buissnes]
  }
  Response: {
  email: string,
  subscription: string,
  avatarUrl: string
  }
  }

  /login: Method: POST, api/users/login
  /current: Method: all, api/users/logout
  /avatars:
