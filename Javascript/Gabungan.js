/* =====================================================================
   GABUNGAN.JS
   Gabungan dari: script.js, Stok.js, Tracking.js, dan <script> di Dashboard.html
   Satu file ini dipakai semua halaman. Setiap bagian hanya berjalan jika
   elemen halamannya ada, jadi aman dimuat di halaman mana pun.

   Daftar bagian:
     1. LOGIN (index.html)
        1a. Efek label floating
        1b. Tampilkan / sembunyikan password
        1c. Form login
     2. UMUM: MENU DROPDOWN (Dashboard, Stok, Tracking)
     3. UMUM: CEK LOGIN
     4. HALAMAN DASHBOARD
     5. HALAMAN STOK
     6. HALAMAN TRACKING
     7. PEMICU HALAMAN (menjalankan bagian sesuai halaman)
   ===================================================================== */


/* =====================================================================
   1. LOGIN (index.html) - dari script.js
   ===================================================================== */
function initLogin() {
    // ----- 1a. Efek label floating -----
    const inputs = document.querySelectorAll(".input");

    function addFocusClass() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;

        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", addFocusClass);
        input.addEventListener("blur", blurFunc);
    });

    // ----- 1b. Tampilkan / sembunyikan password -----
    document.querySelectorAll(".toggle-password").forEach((icon) => {
        icon.addEventListener("click", () => {
            const input = icon.parentNode.querySelector(".input");
            const isHidden = input.type === "password";

            input.type = isHidden ? "text" : "password";
            icon.classList.toggle("ri-eye-line", isHidden);
            icon.classList.toggle("ri-eye-off-line", !isHidden);
        });
    });

    // ----- 1c. Form login -----
    document.getElementById("formLogin").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const user = dataPengguna.find(u => u.email === email);

        if (user && user.password === password) {
            sessionStorage.setItem("userLogin", JSON.stringify(user));
            alert("Selamat datang " + user.nama + " di PBA UT Medan");
            window.location.href = "dashboard.html";
        } else if (user) {
            alert("Aduhhh, maaf " + user.nama + ", kata sandi anda yang masukkan salahh.... coba ulangi");
            document.getElementById("password").value = "";
            document.getElementById("password").focus();
        } else {
            alert("Aduhhh, maaf, email anda tidak terdaftar.... coba ulangi");
        }
    });
}


/* =====================================================================
   2. UMUM: MENU DROPDOWN (Dashboard, Stok, Tracking)
   ===================================================================== */
function initMenuDropdown() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown-menu');

    if (!toggleBtn || !dropDownMenu) return;

    function toggleMenu() {
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');

        toggleBtn.classList.toggle('active', isOpen);
        toggleBtnIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
    }

    toggleBtn.addEventListener('click', toggleMenu);

    // Bisa dibuka lewat keyboard (Enter / Spasi)
    toggleBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Tutup menu saat salah satu link diklik
    dropDownMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            dropDownMenu.classList.remove('open');
            toggleBtn.classList.remove('active');
            toggleBtnIcon.className = 'ri-menu-line';
        });
    });
}


/* =====================================================================
   3. UMUM: CEK LOGIN
   Mengembalikan data user yang login, atau null (lalu diarahkan ke login)
   ===================================================================== */
function cekLogin() {
    const user = JSON.parse(sessionStorage.getItem('userLogin'));
    if (!user) {
        alert('Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
    }
    return user;
}


/* =====================================================================
   4. HALAMAN DASHBOARD - dari <script> di Dashboard.html
   ===================================================================== */
function initDashboard(user) {
    // Tampilkan nama user yang login
    document.getElementById("namaUser").textContent = user.nama;

    // Pencarian bahan ajar dari data.js
    const inputCari = document.getElementById("inputCari");
    const hasilCari = document.getElementById("hasilCari");

    function cariBahanAjar() {
        const kata = inputCari.value.trim().toLowerCase();
        hasilCari.innerHTML = "";
        if (kata === "") return;

        const hasil = dataBahanAjar.filter(function (b) {
            return b.namaBarang.toLowerCase().includes(kata) ||
                   b.kodeBarang.toLowerCase().includes(kata);
        });

        if (hasil.length === 0) {
            hasilCari.innerHTML = '<p class="kosong">Bahan ajar tidak ditemukan.</p>';
            return;
        }

        hasil.forEach(function (b) {
            hasilCari.innerHTML +=
                '<div class="item">' +
                    '<img src="' + b.cover + '" alt="Cover ' + b.namaBarang + '">' +
                    '<div class="info">' +
                        '<h3>' + b.namaBarang + '</h3>' +
                        '<p>Kode: ' + b.kodeBarang + '</p>' +
                        '<p>Jenis: ' + b.jenisBarang + ' | Edisi: ' + b.edisi + '</p>' +
                    '</div>' +
                '</div>';
        });
    }

    document.getElementById("btnCari").addEventListener("click", cariBahanAjar);
    inputCari.addEventListener("input", cariBahanAjar);
}


/* =====================================================================
   5. HALAMAN STOK - dari Stok.js
   ===================================================================== */
function initStok() {
    // ----- Tampilkan daftar BMP dari data.js -----
    const daftarBMP = document.getElementById('daftarBMP');
    const inputCari = document.getElementById('inputCari');

    function tampilkan(list) {
        if (list.length === 0) {
            daftarBMP.innerHTML = '<p class="kosong">Bahan ajar tidak ditemukan.</p>';
            return;
        }

        daftarBMP.innerHTML = list.map(function (b) {
            return `
      <div class="kartu">
        <img src="${b.cover}" alt="Cover ${b.namaBarang}">
        <div class="isi">
          <h3>${b.namaBarang}</h3>
          <p>Kode: ${b.kodeBarang}</p>
          <p>Jenis: ${b.jenisBarang} | Edisi: ${b.edisi}</p>
          <div class="stok-info">Stok: <strong>${b.stok.toLocaleString('id-ID')}</strong></div>
        </div>
      </div>`;
        }).join('');
    }

    // ----- Pencarian -----
    function cariBahanAjar() {
        const kata = inputCari.value.trim().toLowerCase();

        const hasil = dataBahanAjar.filter(function (b) {
            return b.namaBarang.toLowerCase().includes(kata) ||
                   b.kodeBarang.toLowerCase().includes(kata);
        });

        tampilkan(hasil);
    }

    document.getElementById('btnCari').addEventListener('click', cariBahanAjar);
    inputCari.addEventListener('input', cariBahanAjar);

    // Tampilkan semua BMP saat halaman dibuka
    tampilkan(dataBahanAjar);
}


/* =====================================================================
   6. HALAMAN TRACKING - dari Tracking.js
   ===================================================================== */
function initTracking() {
    // ----- Pencarian kode tracking dari data.js (dataTracking) -----
    const inputTracking = document.getElementById('inputTracking');
    const hasilTracking = document.getElementById('hasilTracking');
    const mainTracking = document.getElementById('mainTracking');

    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    // "2025-08-25 10:12:20" -> "25 Agu 2025, 10:12:20"
    function formatWaktu(teks) {
        const bagian = teks.split(' ');
        const tgl = bagian[0].split('-');
        const jam = bagian[1] ? ', ' + bagian[1] : '';
        return parseInt(tgl[2], 10) + ' ' + bulan[parseInt(tgl[1], 10) - 1] + ' ' + tgl[0] + jam;
    }

    function lacak() {
        const kode = inputTracking.value.trim();

        if (kode === '') {
            mainTracking.classList.add('awal');
            hasilTracking.innerHTML = '<p class="petunjuk">Masukkan kode tracking terlebih dahulu.</p>';
            return;
        }

        const data = dataTracking[kode];

        if (!data) {
            mainTracking.classList.add('awal');
            hasilTracking.innerHTML = '<p class="tidak-ditemukan"></p>';
            hasilTracking.querySelector('p').textContent =
                'Kode tracking "' + kode + '" tidak ditemukan. Periksa kembali nomor Anda.';
            return;
        }

        // Ada hasil: kolom pencarian naik ke atas, hasil tampil di bawahnya
        mainTracking.classList.remove('awal');

        // Cari isi paket (kode lokasi) di data bahan ajar
        const bmp = dataBahanAjar.find(function (b) { return b.kodeLokasi === data.paket; });
        const isiPaket = bmp ? bmp.namaBarang + ' (' + bmp.kodeBarang + ')' : data.paket;

        // Posisi terbaru ditampilkan paling atas
        const perjalanan = data.perjalanan.slice().reverse();

        const timeline = perjalanan.map(function (p, i) {
            return `
      <li class="${i === 0 ? 'terbaru' : ''}">
        <div class="waktu">${formatWaktu(p.waktu)}</div>
        <div class="keterangan">${p.keterangan}</div>
      </li>`;
        }).join('');

        hasilTracking.innerHTML = `
    <div class="kartu-tracking">
      <h3>Detail Pengiriman</h3>
      <span class="badge-status">${data.status}</span>
      <div class="baris-info"><span>Nomor DO</span><strong>${kode}</strong></div>
      <div class="baris-info"><span>Nama</span><strong>${data.nama}</strong></div>
      <div class="baris-info"><span>Ekspedisi</span><strong>${data.ekspedisi}</strong></div>
      <div class="baris-info"><span>Tanggal Kirim</span><strong>${formatWaktu(data.tanggalKirim)}</strong></div>
      <div class="baris-info"><span>Paket</span><strong>${isiPaket}</strong></div>
      <div class="baris-info"><span>Total</span><strong>${data.total}</strong></div>
    </div>

    <div class="kartu-tracking">
      <h3>Posisi Pengiriman</h3>
      <ul class="timeline">${timeline}</ul>
    </div>`;
    }

    document.getElementById('btnLacak').addEventListener('click', lacak);

    inputTracking.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') lacak();
    });
}


/* =====================================================================
   7. PEMICU HALAMAN
   Menjalankan bagian yang sesuai dengan elemen yang ada di halaman
   ===================================================================== */
(function () {
    // Halaman login (index.html)
    if (document.getElementById('formLogin')) {
        initLogin();
    }

    // Menu dropdown (Dashboard, Stok, Tracking)
    initMenuDropdown();

    // Halaman yang wajib login
    const adaDashboard = document.getElementById('namaUser');
    const adaStok = document.getElementById('daftarBMP');
    const adaTracking = document.getElementById('hasilTracking');

    if (adaDashboard || adaStok || adaTracking) {
        const user = cekLogin();
        if (!user) return;

        if (adaDashboard) initDashboard(user);
        if (adaStok) initStok();
        if (adaTracking) initTracking();
    }
})();