# React ReqRes Authentication App

Aplikasi frontend berbasis React yang terhubung dengan API publik ReqRes untuk simulasi autentikasi user dan manajemen data user.

## 🚀 Fitur Aplikasi
- Register user
- Login user
- Menampilkan daftar user
- Menampilkan detail user
- Simulasi autentikasi menggunakan token

## 🧪 API yang Digunakan
- https://reqres.in/api/register
- https://reqres.in/api/login
- https://reqres.in/api/users

## 🔐 Catatan Autentikasi
ReqRes merupakan mock API sehingga:
- Login & register hanya mengembalikan token
- Token tidak divalidasi pada endpoint lain
- Autentikasi digunakan sebagai simulasi di sisi frontend

## 🧑‍💻 Akun Testing
### Login
- Email: eve.holt@reqres.in
- Password: cityslicka

### Register
- Email: eve.holt@reqres.in
- Password: pistol

## 🛠️ Teknologi
- React
- Axios
- React Router DOM

## ▶️ Cara Menjalankan
```bash
npm install
npm run dev