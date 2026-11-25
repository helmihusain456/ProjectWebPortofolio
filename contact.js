const formContact = document.getElementById("contact-we");
const kotakStatus = document.getElementById("status-form");

function validasiForm(data) {
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const polaWhatsapp = /^(\+62|08)[0-9]{8,12}$/;

    if (data.nama.length < 3) {
        return "Nama minimal 3 karakter.";
    }
    if (!polaEmail.test(data.email)) {
        return "Format email tidak valid.";
    }
    if (!polaWhatsapp.test(data.whatsapp)) {
        return "Nomor WhatsApp harus diawali 08 atau +62 dan berisi angka.";
    }
    if (data.pesan.length < 10) {
        return "Pesan minimal 10 karakter.";
    }
    return "";
}

function amankanTeks(teks) {
    return teks.replace(/[&<>"']/g, function (karakter) {
        const pengganti = {
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        };
        return pengganti[karakter];
    });
}

formContact.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
        nama: document.getElementById("nama").value.trim(),
        email: document.getElementById("email").value.trim(),
        whatsapp: document.getElementById("nomor-whatsapp").value.trim(),
        pesan: document.getElementById("pesan").value.trim()
    };

    const pesanError = validasiForm(data);
    if (pesanError !== "") {
        kotakStatus.textContent = pesanError;
        kotakStatus.className = "error";
        return;
    }

    const halamanHasil = window.open("", "_blank");
    if (!halamanHasil) {
        kotakStatus.textContent =
            "Halaman hasil diblokir browser. Izinkan pop-up lalu coba lagi.";
        kotakStatus.className = "error";
        return;
    }

    halamanHasil.document.open();
    halamanHasil.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hasil Pesan</title>
            <style>
                * { box-sizing: border-box; }
                body {
                    margin: 0; min-height: 100vh; padding: 40px 18px;
                    font-family: "Segoe UI", Arial, sans-serif; color: #fff;
                    background: linear-gradient(160deg, #07111f, #0d2238);
                }
                .container {
                    max-width: 640px; margin: 30px auto; padding: 32px;
                    background: rgba(255,255,255,.05);
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.3);
                }
                h1 { color: #4f8bff; margin-top: 0; }
                .data {
                    padding: 13px 15px; margin: 12px 0;
                    background: #07111f; border-radius: 7px; overflow-wrap: anywhere;
                }
                .label { color: #4f8bff; font-weight: bold; }
                .pesan { white-space: pre-wrap; }
                a {
                    display: inline-block; margin-top: 18px; padding: 10px 18px;
                    color: white; background: #1f6bff; border-radius: 6px;
                    text-decoration: none;
                }
                a:hover { background: #4f8bff; }
            </style>
        </head>
        <body>
            <main class="container">
                <h1>Pesan Berhasil Dikirim</h1>
                <p>Berikut adalah informasi yang Anda masukkan:</p>
                <div class="data"><span class="label">Nama:</span> ${amankanTeks(data.nama)}</div>
                <div class="data"><span class="label">Email:</span> ${amankanTeks(data.email)}</div>
                <div class="data"><span class="label">Nomor WhatsApp:</span> ${amankanTeks(data.whatsapp)}</div>
                <div class="data">
                    <span class="label">Pesan:</span>
                    <p class="pesan">${amankanTeks(data.pesan)}</p>
                </div>
                <a href="contact.html">Kembali ke Formulir</a>
            </main>
        </body>
        </html>
    `);
    halamanHasil.document.close();
    formContact.reset();
});
