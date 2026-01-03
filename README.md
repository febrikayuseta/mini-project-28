what ReqRes is designed for now is using App Users + magic links rather than the legacy /api/login and /api/register demo routes.


Create a Project + Collection
In your project, create a collection called profiles (optional). This is where you can store extra user fields (name, avatar, etc).
Login (magic link)
From your frontend, call:

POST https://reqres.in/api/app-users/login

Headers:

Content-Type: application/json
x-api-key: YOUR_PUBLIC_KEY

Body:

{ “email”: “calvin@example.com”, “project_id”: YOUR_PROJECT_ID }



ReqRes emails the user a one-time token (magic link).


Verify token → get session token
POST https://reqres.in/api/app-users/verify
Body:
{ “token”: “<magic_token>” }




Response includes:

session_token



Use session token to get the current user
GET https://reqres.in/api/app-users/me
Headers:

Authorization: Bearer <session_token>




That gives you the “logged in user” you can show in your app.

then check the registered user using what is stored in the records in profiles scoped to that user using the session token.


