[readme_md.md](https://github.com/user-attachments/files/35415111/readme_md.md)
# 🎨 Creative Web Design & Portfolio Team — UIN Mataram

Website portofolio tim dan layanan jasa desain kreatif yang dikembangkan oleh mahasiswa **Teknologi Informasi, Universitas Islam Negeri (UIN) Mataram**. Proyek ini dibangun menggunakan **HTML5**, **CSS3**, dan **Vanilla JavaScript** dengan desain antarmuka modern bertema gelap (*dark mode*) yang responsif dan interaktif.

---

## ✨ Fitur Utama

### 1. Halaman Utama & Layanan (`home.html`)
* **Katalog Layanan Dinamis:** Menampilkan daftar layanan desain (Pamflet, Logo Brand, Banner, dan Website) lengkap dengan rincian harga, estimasi pengerjaan, dan jumlah revisi.
* **Pencarian Real-Time:** Fitur filter/pencarian instan untuk memudahkan pengunjung menemukan layanan berdasarkan kata kunci.
* **Formulir Pemesanan Interaktif:** Dilengkapi pilihan radio otomatis saat pengguna mengklik tombol *"Pesan Desain"*, unggah bukti pembayaran (pratinjau gambar langsung), serta halaman ringkasan pesanan siap cetak (*Print/Save PDF*).
* **Daftar Keahlian Tim:** Menampilkan bidang keahlian tim secara dinamis (Desain Grafis, UI/UX, Web Development, Software, Data, dan Network Engineering).

### 2. Halaman Tentang Tim (`about.html` & `hasil.html`)
* **Profil Anggota Tim:** Menampilkan informasi peran, kontak, keahlian, dan deskripsi masing-masing anggota tim inti.
* **Tambah Anggota Dinamis (`localStorage`):** Pengunjung atau anggota baru dapat menambahkan profil mereka melalui formulir (termasuk unggah foto profil) yang langsung tersimpan di *browser* (`localStorage`) dan ditampilkan di halaman hasil (`hasil.html`) serta daftar tim.

### 3. Halaman Kontak (`contact.html`)
* **Validasi Formulir Ketat:** Memvalidasi panjang nama, format email, format nomor WhatsApp Indonesia (`08...` atau `+62...`), serta panjang pesan.
* **Keamanan Input (XSS Prevention):** Dilengkapi fungsi sanitasi karakter HTML (`amankanTeks`) sebelum menampilkan ringkasan pesan pada tab konfirmasi.

---

## 🛠️ Teknologi yang Digunakan

* **HTML5** — Struktur semantik halaman web.
* **CSS3** — Styling kustom menggunakan CSS Variables (`:root`), Flexbox, CSS Grid, efek *glassmorphism* (`backdrop-filter`), dan desain responsif (*mobile-friendly*).
* **JavaScript (ES6+)** — Manipulasi DOM, `FileReader` API untuk pratinjau gambar unggahan, `localStorage` & `sessionStorage` untuk manajemen data sisi klien, serta validasi formulir.

---

## 📁 Struktur Direktori

```text
├── home.html       # Halaman utama, katalog layanan, dan form pemesanan
├── home.css        # Stylesheet untuk halaman utama
├── home.js         # Logika pencarian layanan, render data, & cetak bukti pesanan
├── about.html      # Halaman profil tim dan formulir tambah anggota
├── about.css       # Stylesheet untuk halaman about & hasil profil
├── about.js        # Logika penyimpanan data anggota ke localStorage & sessionStorage
├── hasil.html      # Halaman konfirmasi setelah menambah profil anggota baru
├── contact.html    # Halaman formulir kontak
├── contact.css     # Stylesheet untuk halaman kontak
├── contact.js      # Logika validasi input & halaman konfirmasi pesan
└── README.md       # Dokumentasi proyek
```

*(Catatan: Pastikan aset gambar seperti `logoo.png`, `mett.jpg`, `Rasya.jpeg`, dan `tania.jpg` tersedia di direktori root agar seluruh gambar tampil sempurna).*

---

## 🚀 Cara Menjalankan Proyek

Karena proyek ini dibangun sepenuhnya menggunakan teknologi *front-end* statis (*Vanilla Web*), Anda tidak memerlukan instalasi *package* atau server khusus:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/username-anda/nama-repositori.git
   ```
2. **Masuk ke direktori proyek:**
   ```bash
   cd nama-repositori
   ```
3. **Jalankan di browser:**
   * Buka file `home.html` secara langsung menggunakan *browser* pilihan Anda (Chrome, Firefox, Edge, dll.), **atau**
   * Gunakan ekstensi **Live Server** di Visual Studio Code untuk pengalaman pengembangan yang lebih optimal.

---

## 👥 Tim Pengembang

Proyek ini dibuat dan dikelola oleh mahasiswa Teknologi Informasi UIN Mataram:

| Nama | Peran | Keahlian Utama |
| :--- | :--- | :--- |
| **Elmi Husain** | Team Leader | Leadership, Project Management |
| **Muhammad Rasya Ardian Pratama** | Web Developer | HTML, CSS, JavaScript |
| **Fridatania Hasanatan** | UI/UX Designer | UI/UX Design, Figma |

---

## 📄 Lisensi

Proyek ini dikembangkan untuk tujuan pembelajaran, portofolio akademik, dan layanan kreatif mahasiswa. Silakan gunakan atau modifikasi kode ini dengan tetap mencantumkan atribusi kepada tim pengembang.
