- Contacts Book Api

- Overview
  This is services by registrations users and seves yours contacts

- Service api

  Users: api/users
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
  =>
