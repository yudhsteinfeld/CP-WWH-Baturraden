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
- **Editor**: VsCode

---

## ✨ Fitur
- Login 2 Role, User dan Admin
- RESTful API untuk CRUD data villa, tipe kamar, pemesanan, dan pembayaran.
- Form pemesanan villa dari frontend.
- Pilihan tanggal check-in & check-out.
- Sistem pembayaran + upload bukti pembayaran.
- Manajemen role & permission.
- Token-based Authentication untuk API.
- Validasi input untuk mencegah data berbahaya masuk.
- CRUD pengelolaan Data Booking Admin
- Update harga Villa dari Admin

---

## 📁 Struktur Folder Backend
```bash

.
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/      # Controller API(Semua Logika API)
│   │   └── Middleware/           # Middleware otentikasi & otorisasi
│   ├── Models/                   # Eloquent Models (Penghubung Relasi Antar Tabel)
├── routes/
│   └── api.php                    # Route backend API(Request HTTP)
├── database/migrations/           # CREATE Tabel 
├── .env                           # Konfigurasi proyek
└── README.md
```
---

## 🗄️ Struktur Database & Relasi
Sistem database dirancang secara relasional untuk memastikan integritas dan efisiensi data. Strukturnya dibagi menjadi tabel utama untuk data bisnis dan tabel untuk manajemen hak akses.

### Tabel Utama

| Nama Tabel     | Deskripsi                                        |
| -------------- | -------------------------------------------------- |
| `users`        | Menyimpan data pengguna (customer & admin).        |
| `villas`       | Menyimpan data villa (misalnya, Villa A, B, C).    |
| `room_types`   | Menyimpan tipe kamar per villa (jumlah kamar, kapasitas kamar, harga, dll). |
| `bookings`     | Menyimpan semua data form pemesanan yang dibuat pengguna. |
| `payments`     | Menyimpan data pembayaran dengan pilihan QRIZ dan Cash. |

### Tabel Role & Permission

Tabel-tabel ini digunakan untuk mengelola hak akses pengguna secara dinamis. Struktur ini mengikuti standar dari paket populer seperti `spatie/laravel-permission`.

| Nama Tabel               | Deskripsi                                      |
| ------------------------ | ---------------------------------------------- |
| `roles`                  | Menyimpan daftar peran (cth: admin, customer). |
| `permissions`            | Menyimpan daftar izin akses (cth: create-villa). |
| `model_has_roles`        | Tabel pivot untuk relasi Many-to-Many antara `users` dan `roles`. |
| `model_has_permissions`  | Tabel pivot untuk relasi Many-to-Many antara `users` dan `permissions` (izin spesifik). |
| `role_has_permissions`   | Tabel pivot untuk relasi Many-to-Many antara `roles` dan `permissions`. |

### Relasi Antar Tabel

-   **users (1) → (Many) bookings**: Satu pengguna dapat membuat banyak pemesanan.
-   **villas (1) → (Many) room_types**: Satu villa dapat memiliki banyak tipe kamar.
-   **room_types (1) → (Many) bookings**: Satu tipe kamar dapat dipesan berkali-kali dalam pemesanan yang berbeda.
-   **bookings (1) → (1) payments**: Satu pemesanan hanya memiliki satu data pembayaran.
-   **roles & users (Many ↔ Many)**: Dihubungkan oleh `model_has_roles`.
-   **roles & permissions (Many ↔ Many)**: Dihubungkan oleh `role_has_permissions`.

---

## 🛡️ Keamanan Sistem

Keamanan adalah prioritas utama dalam proyek ini, diimplementasikan di beberapa lapisan, baik di sisi backend maupun frontend untuk memastikan integritas dan kerahasiaan data.


### Bagian Backend (pengolahan data dan keamanan)

Lapisan backend bertindak sebagai pertahanan inti yang memvalidasi setiap permintaan dan melindungi data.

1.  **Otentikasi API (Authentication)**
    -   **Fungsi**: Memastikan hanya pengguna dengan token login yang valid yang dapat mengakses endpoint API yang dilindungi.
    -   **Implementasi**: Menggunakan middleware bawaan Laravel `auth:sanctum`. Token dibuat saat login dan wajib disertakan sebagai *Bearer Token* di setiap *request* ke API.
    -   **Lokasi Kode**: Diterapkan pada grup rute di `routes/api.php`.

2.  **Otorisasi Berbasis Peran (Authorization)**
    -   **Fungsi**: Mengecek peran pengguna setelah login untuk membatasi akses. Contoh: Pengguna biasa tidak dapat mengakses rute yang hanya untuk admin.
    -   **Implementasi**: Menggunakan paket `spatie/laravel-permission` untuk mendefinisikan *roles* dan *permissions* yang kemudian dicek melalui *middleware*.
    -   **Lokasi Kode**: *Middleware* diterapkan di `routes/api.php` pada rute-rute spesifik.

3.  **Validasi Input (Input Validation)**
    -   **Fungsi**: Memfilter dan memvalidasi semua data yang masuk untuk mencegah input berbahaya seperti XSS (*Cross-Site Scripting*) atau *script injection*.
    -   **Implementasi**: Menggunakan fitur `Request::validate()` atau kelas *Form Request* khusus untuk setiap *endpoint* yang menerima input.
    -   **Lokasi Kode**: Di dalam setiap metode *controller* API, seperti di `app/Http/Controllers/Api/BookingController.php`.

4.  **Keamanan Password (Password Hashing)**
    -   **Fungsi**: Mengacak (hash) kata sandi pengguna sebelum menyimpannya ke database, sehingga tidak ada yang bisa melihat kata sandi asli.
    -   **Implementasi**: Menggunakan fasad `Hash::make($request->password)` saat registrasi atau pembaruan kata sandi.
    -   **Lokasi Kode**: `app/Http/Controllers/Api/AuthController.php`.

5.  **Perlindungan Database (Anti SQL Injection & Mass Assignment)**
    -   **Fungsi**: Mencegah serangan manipulasi *query* SQL dan pembaruan kolom yang tidak seharusnya diubah.
    -   **Implementasi**: Menggunakan **Eloquent ORM** yang secara otomatis melakukan *parameter binding* (anti-SQL Injection) dan properti `$fillable` atau `$guarded` pada model untuk proteksi *Mass Assignment*.
    -   **Lokasi Kode**: Di semua model Eloquent, contohnya `app/Models/Booking.php`.

### Bagian Frontend (Tampilan)

Lapisan frontend bertanggung jawab untuk mengelola sesi pengguna dan menjaga akses halaman.

6.  **Manajemen Token (Token Handling)**
    -   **Fungsi**: Menyimpan token yang didapat setelah login secara aman di browser dan melampirkannya di setiap *request* ke API.
    -   **Implementasi**: Token disimpan di `localStorage` atau `sessionStorage` dan ditambahkan ke *header* `Authorization` dengan prefix `Bearer ` pada setiap pemanggilan API.
    -   **Lokasi Kode**: Logika ini biasanya berada di file JavaScript utama seperti `public/js/api.js`.

7.  **Perlindungan Halaman (Route Guarding)**
    -   **Fungsi**: Mencegah pengguna yang belum login mengakses halaman-halaman yang memerlukan otentikasi (misalnya, *dashboard* admin).
    -   **Implementasi**: Script JavaScript akan mengecek keberadaan token di `localStorage` sebelum memuat konten halaman. Jika token tidak ada, pengguna akan diarahkan kembali ke halaman login.
    -   **Lokasi Kode**: Contohnya di `public/adminpage/js/adminreservasi.js` atau script sejenis.

---
## ⚙️ Instalasi

1. **Download XAMPP (Untuk running MySQL)**
2. **Download Composer**
   -   Install Composer sama saja dengan menginstall laravel, Download Versi Laravel sesuai Kebutuhan.
   -   Link Panduan Download : https://santrikoding.com/tutorial-laravel-11-2-cara-install-dan-menjalankan-laravel-11 
4. **Download Gitbash**
5. **Clone repository:**
   ```bash
git clone https://github.com/username/nama-repo.git
   ```
3.  **Perlindungan Halaman (Route Guarding)**
4.  **Perlindungan Halaman (Route Guarding)**
5.  **Perlindungan Halaman (Route Guarding)**
6.  **Perlindungan Halaman (Route Guarding)**
7.  **Perlindungan Halaman (Route Guarding)**
