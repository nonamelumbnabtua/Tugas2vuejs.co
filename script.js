// ===== 1. Efek label floating =====
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

// ===== 2. Tampilkan / sembunyikan password =====
document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
        const input = icon.parentNode.querySelector(".input");
        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";
        icon.classList.toggle("ri-eye-line", isHidden);
        icon.classList.toggle("ri-eye-off-line", !isHidden);
    });
});

// ============ 3. Form login =====================
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


