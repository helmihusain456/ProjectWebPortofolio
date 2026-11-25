const layanan = [
    {
        nama: "Desain Pamflet",
        deskripsi: "Pamflet dan poster promosi untuk acara, organisasi, atau usaha.",
        harga: 50000,
        fitur: ["Revisi 3x", "Proses 1–2 hari", "File siap cetak & siap posting"]
    },
    {
        nama: "Desain Logo Brand",
        deskripsi: "Identitas visual untuk usaha, komunitas, produk, dan personal brand.",
        harga: 100000,
        fitur: ["Revisi 3x", "Proses 2–3 hari", "File master AI/CDR/PNG"]
    },
    {
        nama: "Desain Banner",
        deskripsi: "X-banner, spanduk, dan banner digital untuk media promosi.",
        harga: 75000,
        fitur: ["Revisi 3x", "Proses 1–2 hari", "File resolusi tinggi"]
    },
    {
        nama: "Desain Website",
        deskripsi: "Tampilan website responsif untuk portofolio, usaha, atau organisasi.",
        harga: 500000,
        fitur: ["Revisi 3x", "Proses 5–7 hari", "Tampilan responsif HP & desktop"]
    }
];

const keahlian = [
    "Desain Grafis",
    "UI/UX Design",
    "Web Development",
    "Software Engineer",
    "Data Engineer",
    "Network Engineer"
];

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function tampilkanLayanan(data) {
    const grid = document.getElementById("daftar-layanan");
    const penghitung = document.getElementById("jumlah-layanan");

    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = '<p class="kosong">Layanan tidak ditemukan. Coba kata kunci lain.</p>';
    }

    data.forEach((item) => {
        const kartu = document.createElement("article");
        kartu.className = "kartu";

        const itemFitur = item.fitur.map((f) => "<li>" + f + "</li>").join("");

        kartu.innerHTML =
            "<h3>" + item.nama + "</h3>" +
            '<p class="deskripsi">' + item.deskripsi + "</p>" +
            '<div class="harga">Mulai <span>' + formatRupiah(item.harga) + "</span></div>" +
            "<ul>" + itemFitur + "</ul>" +
            '<a href="#formJasa" class="pesan" data-desain="' + item.nama + '">Pesan Desain →</a>';

        grid.appendChild(kartu);
    });

    document.querySelectorAll(".pesan").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetRadio = document.querySelector(`input[name="desain"][value="${btn.dataset.desain}"]`);
            if (targetRadio) targetRadio.checked = true;
        });
    });

    penghitung.textContent = "Menampilkan " + data.length + " dari " + layanan.length + " layanan";
}

function cariLayanan() {
    const kataKunci = document.getElementById("cari-layanan").value.toLowerCase().trim();

    const hasil = layanan.filter((item) =>
        item.nama.toLowerCase().includes(kataKunci) ||
        item.deskripsi.toLowerCase().includes(kataKunci)
    );

    tampilkanLayanan(hasil);
}

function tampilkanKeahlian() {
    const daftar = document.getElementById("daftar-keahlian");

    keahlian.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        daftar.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanLayanan(layanan);
    tampilkanKeahlian();
});

document.getElementById("cari-layanan").addEventListener("input", cariLayanan);

const formJasa = document.getElementById("formJasa");
formJasa.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const wa = document.getElementById("wa").value;
    const email = document.getElementById("email").value;
    const desainTerpilih = document.querySelector('input[name="desain"]:checked');
    const desain = desainTerpilih ? desainTerpilih.value : "-";
    const fileBukti = document.getElementById("bukti").files[0];

    // Ambil alamat URL asli home.html agar tombol kembali selalu akurat
    const homeUrl = window.location.href.split("#")[0] + "#formJasa";

    const bukaHalamanHasil = (gambarSrc) => {
        const halaman = window.open("", "_blank");
        halaman.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Detail Pemesanan - ${nama}</title>
                <style>
                    body { font-family: sans-serif; padding: 30px; background: #f4f6f9; color: #333; }
                    .card { max-width: 500px; margin: auto; background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                    h2 { margin-top: 0; color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                    p { margin: 10px 0; line-height: 1.5; }
                    img { max-width: 100%; height: auto; margin-top: 10px; border-radius: 6px; border: 1px solid #ddd; }
                    .aksi { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
                    .btn { padding: 10px 16px; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: 600; text-decoration: none; }
                    .btn-print { background: #28a745; }
                    .btn-print:hover { background: #218838; }
                    .btn-kembali { background: #1f6bff; }
                    .btn-kembali:hover { background: #4f8bff; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Data Formulir Pemesanan</h2>
                    <p><strong>Nama:</strong> ${nama}</p>
                    <p><strong>No WhatsApp:</strong> ${wa}</p>
                    <p><strong>Gmail:</strong> ${email}</p>
                    <p><strong>Pilihan Desain:</strong> ${desain}</p>
                    <p><strong>Bukti Pembayaran:</strong><br>
                    ${gambarSrc ? `<img src="${gambarSrc}" alt="Bukti Bayar">` : "Tidak ada file"}</p>
                    
                    <div class="aksi">
                        <button class="btn btn-print" onclick="window.print()">Cetak / Simpan PDF</button>
                        <button class="btn btn-kembali" onclick="kembaliPesan()">← Pesan Lagi</button>
                    </div>
                </div>

                <script>
                    function kembaliPesan() {
                        if (window.opener && !window.opener.closed) {
                            window.opener.location.href = "${homeUrl}";
                            window.opener.focus();
                            window.close();
                        } else {
                            window.location.href = "${homeUrl}";
                        }
                    }
                <\/script>
            </body>
            </html>
        `);
        halaman.document.close();

        formJasa.reset();
    };

    if (fileBukti) {
        const reader = new FileReader();
        reader.onload = function (event) {
            bukaHalamanHasil(event.target.result);
        };
        reader.readAsDataURL(fileBukti);
    } else {
        bukaHalamanHasil(null);
    }
});