# 📚 System Informasi Tracking & Stok Bahan Ajar (SITTA) - Universitas Terbuka

SITTA adalah aplikasi berbasis web yang dirancang untuk mengelola, memantau, dan melacak ketersediaan serta pengiriman Bahan Materi Pokok (BMP) / Modul Bahan Ajar untuk Universitas Terbuka (UT).

---

## 🌟 Fitur Utama

### 1. 🔐 Sistem Autentikasi & Hak Akses
* **Multi-Role Login**: Membedakan hak akses antara **Pengguna/Mahasiswa/Staf Umum** dan **Administrator SITTA**.
* **Registrasi Akun Baru**: Fitur pendaftaran pengguna baru yang terintegrasi dengan modul penyimpanan lokal.
* **Sesi Login ("Ingat Saya")**: Fitur untuk menyimpan kredensial/sesi login secara aman di *browser*.

### 2. 🧭 Navigasi & Navbar Dinamis
* **Menu Adaptif**: Tampilan menu bernavigasi dinamis yang menyesuaikan peran pengguna (Otomatis menampilkan menu *Stok SITTA* dan *Tracking SITTA* untuk Administrator).
* **Responsif Dropdown Mobile**: Menu hamburger khusus yang nyaman diakses melalui perangkat *mobile*.
* **Aksi Cepat**: Pengubah tema (*Light/Dark Mode*) serta tombol *Logout* terintegrasi langsung pada header navbar.

### 3. 📦 Manajemen Stok Bahan Ajar (SITTA Admin)
* **Pencarian & Filter UT-Daerah**: Filter bahan ajar berdasarkan kategori lokasi/cabang UT.
* **Peringatan Stok Otomatis/Manual**:
  * 🟢 **Aman**: Stok mencukupi (*safety stock*).
  * 🟠 **Menipis**: Stok berada di bawah batas minimum.
  * 🔴 **Kosong**: Stok bernilai 0.
* **Manajemen CRUD & Re-Order**: Tambah, edit, hapus data modul, serta pengajuan ulang stok bahan ajar (*re-order*).

### 4. 🚚 Pelacakan Pengiriman / Tracking DO (SITTA Admin)
* **Pelacakan Nomor DO / Resi**: Pencarian status pengiriman ekspedisi logistik bahan ajar.
* **Timeline Perjalanan Rinci**: Menampilkan status pengiriman kronologis hingga detil waktu jam, menit, dan detik.
* **Indikator Status Terbaru**: Penanda titik pengiriman paling mutakhir dengan animasi visual denyut *highlight*.

### 5. 🎨 Desain & UI/UX Interaktif
* **Glassmorphism UI**: Antarmuka modern berkonsep efek kaca murni dengan blur dinamis.
* **Tema Gelap & Terang (Dark/Light Mode)**: Peralihan mode tampilan yang mulus disertai proteksi preferensi pengguna.
* **Elemen Visual 3D**: Latar belakang interaktif berupa bola melayang dinamis dan objek 3D Logo UT.

---

## 📂 Struktur File Utama

```text
├── index.html            # Halaman Login & Pendaftaran Utama
├── Dashboard.html        # Halaman Utama / Dashboard Pengguna
├── Stok.html             # Tampilan Stok Bahan Ajar (Public/User)
├── Tracking.html         # Tampilan Pelacakan DO (Public/User)
├── StokAdmin.html        # Panel Kelola Stok (Khusus Admin SITTA)
├── TrackingAdmin.html    # Panel Kelola Pengiriman (Khusus Admin SITTA)
├── ContactUs.html        # Halaman Kontak & Bantuan
├── Gabungan.js           # Logic Utama (Auth, Routing, Vue Apps, Dynamic UI)
└── Gabungan.css          # Styling Utama (Glassmorphism, Dark Mode, Animations)
```

---

## 💻 Panduan Penggunaan & Teknologi

1. **Framework & Library**:
   * **Vue.js**: Diterapkan pada panel administrasi (`StokAdmin` & `TrackingAdmin`) untuk pengelolaan state dan komponen reaktif.
   * **Remix Icon / FontAwesome**: Digunakan untuk penyedia ikonografi antarmuka.

2. **Akses Admin Default**:
   * Email yang terdaftar sebagai admin secara default mencakup email dengan domain/identifier khusus (contoh: `admin@ut.ac.id`, `siti@ut.ac.id`, `doni@ut.ac.id`).
   * Pengguna dengan peran `Administrator` akan mendapatkan hak akses otomatis ke fitur manajemen SITTA.

---

## ⚙️ Lisensi & Hak Cipta
Hak Cipta © Universitas Terbuka. Seluruh hak cipta dilindungi undang-undang.
