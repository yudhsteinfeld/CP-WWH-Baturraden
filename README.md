# 🏡 Sistem Pemesanan Villa - RESTful API + Frontend

Proyek ini adalah **sistem pemesanan villa** berbasis web dengan **backend RESTful API** dan frontend berbasis Laravel Blade.  
Sistem ini memungkinkan pengguna melakukan pemesanan online untuk 3 tipe villa, dilengkapi dengan **lapisan keamanan API** dan manajemen role.

---

## 📂 Daftar Isi
- [Tentang Proyek](#tentang-proyek)
- [Tech Stack](#tech-stack)
- [Fitur](#fitur)
- [Struktur Folder](#struktur-folder)
- [Struktur Database & Relasi](#struktur-database--relasi)
- [Keamanan Sistem](#keamanan-sistem)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Koneksi Backend & Frontend](#koneksi-backend--frontend)
- [Panduan Kontribusi](#panduan-kontribusi)
- [Lisensi](#lisensi)

---

## 📖 Tentang Proyek
Sistem ini terdiri dari:
- **Backend**: Laravel RESTful API untuk mengelola data villa, pemesanan, pembayaran, user, role, dan permission.
- **Frontend**: Laravel Blade Template untuk halaman pemesanan.
- **Keamanan**: Token-based Authentication, Role-based Authorization, dan validasi input.

---

## 🛠️ Tech Stack
- **Backend**: Laravel 11 (RESTful API)
- **Frontend**: Laravel Blade, HTML, CSS, JavaScript
- **Database**: MySQL (XAMPP)
- **Auth**: Laravel Sanctum / Passport (Token-based)
- **Keamanan Data**: Validation, Password Hashing, Anti-SQL Injection
- **Version Control**: Git & GitHub

---

## ✨ Fitur
- RESTful API untuk CRUD data villa, tipe kamar, pemesanan, dan pembayaran.
- Form pemesanan villa dari frontend.
- Pilihan tanggal check-in & check-out.
- Sistem pembayaran + upload bukti pembayaran.
- Manajemen role & permission.
- Token-based Authentication untuk API.
- Validasi input untuk mencegah data berbahaya masuk.

---

## 📁 Struktur Folder
```bash

.
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/      # Controller API
│   │   └── Middleware/           # Middleware otentikasi & otorisasi
│   ├── Models/                   # Eloquent Models
├── public/                       # Aset publik (CSS, JS, gambar)
├── resources/views/              # Halaman Blade Template
├── routes/
│   ├── web.php                    # Route frontend
│   └── api.php                    # Route backend API
├── database/migrations/           # Struktur tabel
├── .env                           # Konfigurasi proyek
└── README.md
```
---

##🗄️ Struktur Database & Relasi
![Diagram Database](database-diagram.png)
