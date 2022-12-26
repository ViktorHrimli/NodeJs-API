# Contacts Book Api

### Overview

#### This is services by registrations users and seves yours contacts

## Users

Users services is intended for registration user, login, logout, get current user, update user profile and avatar.

#### Path Api Users

<table style="width:30% border:3">
	<tbody>
  <th>
		<tr>
			<td>api/users/signup</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

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
