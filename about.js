function tampilkanAnggota() {
    const team = document.getElementById("team");
    if (!team) return;
    let jumlah = localStorage.getItem("jumlahAnggota") || 0;

    for (let i = 0; i < jumlah; i++) {
        const nama = localStorage.getItem("nama" + i);
        const jabatan = localStorage.getItem("jabatan" + i);
        const email = localStorage.getItem("email" + i);
        const telepon = localStorage.getItem("telepon" + i);
        const skill = localStorage.getItem("skill" + i);
        const bio = localStorage.getItem("bio" + i);
        const foto = localStorage.getItem("foto" + i);
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <img src="${foto || 'https://placehold.co/400x300'}">
            <h2>${nama}</h2>
            <span>${jabatan}</span>
            <p>Email: ${email}</p>
            <p>Telepon: ${telepon}</p>
            <p>Keahlian: ${skill}</p>
            <p>${bio}</p>
        `;
        team.appendChild(card);
    }
}
tampilkanAnggota();
const form = document.getElementById("memberForm");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const nama = document.getElementById("name").value;
        const jabatan = document.getElementById("role").value;
        const email = document.getElementById("email").value;
        const telepon = document.getElementById("phone").value;
        const skill = document.getElementById("skill").value;
        const bio = document.getElementById("bio").value;
        const foto = document.getElementById("photo").files[0];
        if (!nama || !jabatan || !email || !telepon || !skill || !bio) {
            document.getElementById("formMessage").textContent = "Lengkapi semua data!";
            return;
        }

        let jumlah = Number(localStorage.getItem("jumlahAnggota")) || 0;
        function simpan() {
            localStorage.setItem("nama" + jumlah, nama);
            localStorage.setItem("jabatan" + jumlah, jabatan);
            localStorage.setItem("email" + jumlah, email);
            localStorage.setItem("telepon" + jumlah, telepon);
            localStorage.setItem("skill" + jumlah, skill);
            localStorage.setItem("bio" + jumlah, bio);
            localStorage.setItem("foto" + jumlah, fotoData);
            localStorage.setItem("jumlahAnggota", jumlah + 1);
            sessionStorage.setItem("nama", nama);
            sessionStorage.setItem("jabatan", jabatan);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("telepon", telepon);
            sessionStorage.setItem("skill", skill);
            sessionStorage.setItem("bio", bio);
            sessionStorage.setItem("foto", fotoData);

            window.location.href = "hasil.html";
        }
        let fotoData = "";
        if (foto) {
            const pembaca = new FileReader();
            pembaca.onload = function() {
                fotoData = pembaca.result;
                simpan();
            };
            pembaca.readAsDataURL(foto);
        } else {
            simpan();
        }
    });
}
if (document.getElementById("resultName")) {
    const kolom = ["nama", "jabatan", "email", "telepon", "skill", "bio"];
    const tujuan = ["resultName", "resultRole", "resultEmail","resultPhone", "resultSkill", "resultBio"];
    for (let i = 0; i < kolom.length; i++) {
        document.getElementById(tujuan[i]).textContent =
            sessionStorage.getItem(kolom[i]) || "";
    }
    const foto = sessionStorage.getItem("foto");
    if (foto) document.getElementById("resultPhoto").src = foto;
}