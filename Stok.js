// ===== 1. Menu dropdown (sama seperti Dashboard) =====
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

function toggleMenu() {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtn.classList.toggle('active', isOpen);
  toggleBtnIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
}

toggleBtn.addEventListener('click', toggleMenu);

toggleBtn.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

dropDownMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    dropDownMenu.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtnIcon.className = 'ri-menu-line';
  });
});

// ===== 2. Cek login =====
const user = JSON.parse(sessionStorage.getItem('userLogin'));
if (!user) {
  alert('Silakan login terlebih dahulu.');
  window.location.href = 'index.html';
}

// ===== 3. Tampilkan daftar BMP dari data.js =====
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

// ===== 4. Pencarian =====
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