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
    if (!grid || !penghitung) return;

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
    const inputCari = document.getElementById("cari-layanan");
    if (!inputCari) return;

    const kataKunci = inputCari.value.toLowerCase().trim();
    const hasil = layanan.filter((item) =>
        item.nama.toLowerCase().includes(kataKunci) ||
        item.deskripsi.toLowerCase().includes(kataKunci)
    );

    tampilkanLayanan(hasil);
}

function tampilkanKeahlian() {
    const daftar = document.getElementById("daftar-keahlian");
    if (!daftar) return;

    keahlian.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        daftar.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("daftar-layanan")) {
        tampilkanLayanan(layanan);
        tampilkanKeahlian();
        document.getElementById("cari-layanan").addEventListener("input", cariLayanan);
    }

    const formJasa = document.getElementById("formJasa");
    if (formJasa) {
        formJasa.addEventListener("submit", function (e) {
            e.preventDefault();

            const nama = document.getElementById("nama").value;
            const wa = document.getElementById("wa").value;
            const email = document.getElementById("email").value;
            const desainTerpilih = document.querySelector('input[name="desain"]:checked');
            const desain = desainTerpilih ? desainTerpilih.value : "-";
            const fileBukti = document.getElementById("bukti").files[0];

            const params = new URLSearchParams({ nama, wa, email, desain });

            if (fileBukti) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    sessionStorage.setItem("buktiBayar", event.target.result);
                    window.location.href = "output.html?" + params.toString();
                };
                reader.readAsDataURL(fileBukti);
            } else {
                sessionStorage.removeItem("buktiBayar");
                window.location.href = "output.html?" + params.toString();
            }
        });
    }

    if (document.getElementById("tampil-nama")) {
        const params = new URLSearchParams(window.location.search);

        document.getElementById("tampil-nama").textContent = params.get("nama") || "-";
        document.getElementById("tampil-wa").textContent = params.get("wa") || "-";
        document.getElementById("tampil-email").textContent = params.get("email") || "-";
        document.getElementById("tampil-desain").textContent = params.get("desain") || "-";

        const bukti = sessionStorage.getItem("buktiBayar");
        if (bukti) {
            document.getElementById("tampil-bukti").innerHTML = `<img src="${bukti}" alt="Bukti Bayar">`;
        }

        document.getElementById("btn-print").addEventListener("click", () => {
            window.print();
        });

        document.getElementById("btn-kembali").addEventListener("click", () => {
            window.location.href = "index.html#formJasa";
        });
    }
});
