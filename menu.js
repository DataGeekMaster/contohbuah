// Mendapatkan elemen-elemen yang diperlukan
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');
const emailInput = document.getElementById(`email`);
const confirmedAccount = document.getElementById(`confirmedAccBox`);
const message = document.createElement('p');
const successMessage = document.getElementById('success-message');
const closeBtn = document.getElementById('closeBtn');
const centang = document.getElementById('centang');
const correct = document.getElementById(`correct`);
const bulan = document.getElementById(`bulan`);
const apaCoba = document.getElementById(`apa-coba`);

// Menambahkan pesan ke dalam dokumen
document.getElementById('login').appendChild(message);

let isButtonShifted = false;
let qualifySubmit = false;
let ifForcedSubmit = 0;

// Fungsi memerikasa email
function checkEmail() {
  const email = emailInput.value;

  const usernameRegex = /[~!#$%^&*()_\-+=\\|{}\[\]:";'/?><,]/;
  const domainRegex = /[~!#$%^&*()_\-+=\\|{}\[\]:";'/?><,]/;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailRegex.test(email) && !usernameRegex.test(email.split("@")[0]) && !domainRegex.test(email.split("@")[1])) {
    return true;
  } else {
    return false;
  }
}

// Fungsi untuk memeriksa syarat password
function checkPassword() {
  const password = passwordInput.value;

  // Mengecek apakah password memenuhi persyaratan
  const hasValidLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[~!@#$%^&*()_\-+=\\|[\]{};'/.,<>?:"`]/.test(password);

  if (hasValidLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
    return true;
  } else {
    return false;
  }
}

function validatePassword() {
  if (checkPassword() && checkEmail()) {
    // Password memenuhi persyaratan
    passwordInput.value = ''; // Mengosongkan input password
    emailInput.value = ``;
    ifForcedSubmit = 0;
    resetButtonPosition();
    resetButton();
    confirmedAccount.style.display = "block"
    confirmedAccount.style.animation = `boxZoomIn 0.4s linear`;
    confirmedAccount.style.height = `90vh`;
    confirmedAccount.style.width = `80vw`;

    setTimeout(() => {
      correct.style.display = `block`;
      centang.style.animation = 'rotateCentang 1.5s ease-in-out';
    }, 600);

    setTimeout(() => {
      correct.style.animation = 'moveCorrect 0.5s ease-out';
      correct.style.top = `20%`;
      correct.style.left = `40%`;
      bulan.style.animation = `shrinkAnimationBulan 0.5s ease-in-out`;
      bulan.style.width = `200px`;
      centang.style.animation = `shrinkAnimationCentang 0.5s ease-in-out`;
      centang.style.width = `180px`;
      centang.style.left = `40px`;
      successMessage.style.display = `block`;
      successMessage.style.animation = `correctTextAppear 0.6s ease-in`;
    }, 2300);

    setTimeout(() => {
      closeBtn.style.display = `block`;
    }, 3000);
    
  } else {
    // Password tidak memenuhi persyaratan
    message.textContent = 'Masukkan Password yang benar!'; // Menampilkan pesan error
    message.style.color = 'red';
    message.style.backgroundColor = `rgb(255, 198, 198)`;
    avoidClickButton();
  }
}

// Fungsi untuk menggeser tombol submit
function avoidClickButton() {
  if (!isButtonShifted) {
    submitButton.style.transition = 'transform 0.1s ease-out';
    submitButton.style.transform = 'translateX(34.5vw)';
    isButtonShifted = true;
    ifForcedSubmit++;
    if (ifForcedSubmit === 5) {
      apaCoba.style.display = `block`;
      apaCoba.style.animation = `ifForcedSubmit 1s linear`;
    }
  } else {
    submitButton.style.transition = 'transform 0.1s ease-out';
    submitButton.style.transform = 'translateX(0)';
    isButtonShifted = false;
    ifForcedSubmit++;
    if (ifForcedSubmit === 5) {
      apaCoba.style.display = `block`;
      apaCoba.style.animation = `ifForcedSubmit 1s linear`;
    }
  }
}

// Fungsi untuk mengembalikan posisi tombol submit ke semula
function resetButtonPosition() {
  submitButton.style.transform = 'translateX(0)';
  isButtonShifted = false;
}

// Menambahkan event listener pada tombol submit
submitButton.addEventListener('click', validatePassword);

// Fungsi untuk mengubah tampilan tombol submit saat dihover
let isHovered = false;
function handleButtonHover() {
  if (!isHovered && (!checkPassword() || !checkEmail())) {
    submitButton.style.transform = 'translateX(34.5vw)';
    isHovered = true;
    ifForcedSubmit++;
    if (ifForcedSubmit === 5) {
      apaCoba.style.display = `block`;
      apaCoba.style.animation = `ifForcedSubmit 1s linear`;
    }
  } else if (isHovered && (!checkPassword() || !checkEmail())){
    submitButton.style.transform = 'translateX(0)';
    isHovered = false;
    ifForcedSubmit++;
    if (ifForcedSubmit === 5) {
      apaCoba.style.display = `block`;
      apaCoba.style.animation = `ifForcedSubmit 1s linear`;
    }
  }
}

// Menambahkan event listener pada tombol submit untuk mengubah tampilan saat dihover
submitButton.addEventListener('mouseover', handleButtonHover);

// Fungsi untuk mengubah tampilan tombol submit saat password memenuhi persyaratan
function qualifyPassword() {
  if (checkPassword() && checkEmail()) {
    submitButton.style.transform = 'translateX(17vw)';
    submitButton.style.backgroundColor = 'rgb(35, 255, 15)';
    submitButton.style.borderColor = 'rgb(21, 255, 0)';
    submitButton.style.boxShadow = '0 0 5px rgb(21, 255, 0)';
    submitButton.style.outline = 'none';
    qualifySubmit = true;
  }
  else {
    resetButton();
    if (qualifySubmit) {
    resetButtonPosition();
    qualifySubmit = false;
    }
  }
}

// Fungsi untuk mengembalikan tampilan tombol submit ke semula
function resetButton() {
  submitButton.style.backgroundColor = '';
  submitButton.style.borderColor = '';
  submitButton.style.boxShadow = '';
  submitButton.style.outline = '';
}

// Menambahkan event listener pada input password untuk mengubah tampilan tombol submit saat sudah atau belum password memenuhi persyaratan
passwordInput.addEventListener('input', qualifyPassword);
emailInput.addEventListener('input', qualifyPassword);

// Close confirmedAccBox dan kawan kawan
closeBtn.addEventListener('click', function() {
  confirmedAccount.style.animation = `boxZoomOut 0.2s linear`;
  confirmedAccount.style.height = `0`;
  confirmedAccount.style.width = `0`;

  correct.style.display = ``;
  closeBtn.style.display = ``;
  centang.style.animation = '';
  correct.style.animation = '';
  correct.style.top = ``;
  correct.style.left = ``;
  bulan.style.animation = ``;
  bulan.style.width = ``;
  centang.style.width = ``;
  centang.style.left = ``;
  successMessage.style.display = ``;
  successMessage.style.animation = ``;
  setTimeout(() => {
    confirmedAccount.style.display = '';
    confirmedAccount.style.height = ``;
    confirmedAccount.style.width = ``;
  }, 205);
});