/*? no js js needed from me */
// seleksi pilihan user
const userOption = document.querySelectorAll("#board .row figure img");
// seleksi piihan hasil komputer
const compOption = document.getElementById("comp-result");
// seleksi untuk score
const scoreComp = document.querySelector(".score-comp");
const scoreUser = document.querySelector(".score-user");
let win = 0;
let lose = 0;

// function menangkap angka random u/ hasil compOption
function random() {
  const random = Math.floor(Math.random() * 10);
  if (random <= 3) {
    return "gajah";
  } else if (random > 3 && random <= 7) {
    return "orang";
  } else if (random > 7 && random <= 10) {
    return "semut";
  } else {
    alert("Kamu Belum Memilih");
  }
}

// Function rules menang atau kalah
function getResult(comp, user) {
  if (comp == user) {
    return "Seri";
  } else if (user == "gajah") {
    return comp == "orang" ? "Menang" : "Kalah";
  } else if (user == "orang") {
    return comp == "semut" ? "Menang" : "Kalah";
  } else if (user == "semut") {
    return comp == "gajah" ? "Menang" : "Kalah";
  }
}

// Function Acak Gambar Computer

function acak() {
  const imgArr = ["gajah", "orang", "semut"];
  let i = 0;
  const startTime = new Date().getTime();
  setInterval(() => {
    if (new Date().getTime() - startTime > 1000) {
      clearInterval;
      return;
    }
    compOption.setAttribute("src", "src/assets/" + imgArr[i++] + ".png");
    if (i == imgArr.length) i = 0;
  }, 100);
}

function reload() {
  if (lose >= 3) {
    alert("Kamu KO Lebih dari 3 Kali Ulangi");
    window.location.reload();
  } else if (win >= 5) {
    alert("Selamat Kamu Jagoan Suwit");
    window.location.reload();
  }
}

function animasi() {
  compOption.classList.toggle("notif");
}

// Klik Event Listener
userOption.forEach((nodeSelect) => {
  nodeSelect.addEventListener("click", () => {
    const resultComp = random();
    const resultUser = nodeSelect.className;
    const resultAll = getResult(resultComp, resultUser);

    acak();

    setTimeout(() => {
      compOption.setAttribute("src", "src/assets/" + resultComp + ".png");
      const scoreNotif = document.querySelector("nav figcaption .score-result");
      scoreNotif.innerHTML = resultAll;

      if (resultAll === "Menang") {
        animasi();
        compOption.style.boxShadow = "0 10px 30px #2ccbef";
        scoreUser.innerHTML = win + 1;
        win++;
        reload();
      } else if (resultAll == "Kalah") {
        animasi();
        compOption.style.boxShadow = "0 10px 30px red";
        scoreComp.innerHTML = lose + 1;
        lose++;
        reload();
      } else {
        compOption.style.boxShadow = "0 10px 30px grey";
      }
      console.info(resultUser, resultComp, resultAll);
    }, 1000);
  });
});
