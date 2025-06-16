const transitionTextContainer = document.createElement("div");
transitionTextContainer.id = "transition-text";
transitionTextContainer.style.position = "fixed";
transitionTextContainer.style.top = "50%";
transitionTextContainer.style.left = "50%";
transitionTextContainer.style.transform = "translate(-50%, -50%)";
transitionTextContainer.style.color = "white";
transitionTextContainer.style.fontSize = "24px";
transitionTextContainer.style.textAlign = "center";
transitionTextContainer.style.opacity = "0";
transitionTextContainer.style.transition = "opacity 0.5s ease-in-out";
document.body.appendChild(transitionTextContainer);

const dialogText = document.getElementById("dialog-text");
const nextText = document.getElementById("next-text");
const characterLeft = document.getElementById("character-left");
const characterRight = document.getElementById("character-right");
const background = document.getElementById("background");
const transitionOverlay = document.getElementById("transition-overlay");
const characterName = document.getElementById("character-name");
const blackScreen = document.getElementById("black-screen");
const skipButton = document.getElementById("skip-button");

let dialogIndex = 0;
let typingSpeed = 50;
let isTyping = false;
let typingTimeout;
let currentBackground = "asset/bg1.png";

const dialogData = [
  {
    text: "Hari itu, langit mendung, seakan menandakan sesuatu yang buruk akan terjadi. Saat Aisyah berjalan menuju kelas, matanya menangkap sosok Vania dan teman-temannya yang sedang membuat keributan di koridor sekolah. Mereka mencoret-coret dinding dengan spidol, tertawa tanpa peduli.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg24.png",
    moveBg: false,
    transitionText: "Day 1 - Denial",
    minigameURL: "",
  },
  {
    text: "Apa yang mereka lakukan?",
    speaker: "left",
    name: "Aisyah",
    expression: "Aisyah_Murung",
    background: "../../asset/BackGroun/bg24.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Itu sedikit ke kanan coretannya",
    speaker: "right",
    name: "Vania",
    expression: "Vania_Excited",
    background: "../../asset/BackGroun/bg24.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Ok aman ",
    speaker: "right",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg24.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aku biarkan saja lah...",
    speaker: "left",
    name: "Aisyah",
    expression: "Aisyah_Murung",
    background: "../../asset/BackGroun/bg24.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Siapa yang melakukan kenakalan di lantai atas tadi? Bapak ingin kalian jujur dan memberitahu siapa pelakunya.",
    speaker: "left",
    name: "Guru BK",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg25.png",
    moveBg: false,
    transitionText: "Di kelas...",
    minigameURL: "",
  },
  {
    text: "Baiklah, karena tidak ada yang mengaku, bapak akan menghukum kalian semua jika tidak ada yang mengaku!",
    speaker: "left",
    name: "Guru BK",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg25.png",
    moveBg: false,
    transitionText: "Di kelas...",
    minigameURL: "",
  },
  {
    text: "Maaf, Pak... Pelakunya adalah Vania dan teman-temannya.",
    speaker: "left",
    name: "Aisyah",
    expression: "Aisyah_Murung",
    background: "../../asset/BackGroun/bg25.png",
    moveBg: false,
    transitionText: "Di kelas...",
    minigameURL: "",
  },
  {
    text: "Baiklah. Vania, Alex, dan Rizki, pergi ke ruang BK sekarang. Yang lainnya, lanjut belajar dan jangan berisik",
    speaker: "right",
    name: "Guru BK",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg25.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Baik, Pak",
    speaker: "right",
    name: "Anak-anak Kelas",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg25.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Sudah berapa kali kalian melakukan ini? Kalian ingin saya memanggil orang tua kalian?",
    speaker: "left",
    name: "Guru BK",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "Di ruangan BK...",
    minigameURL: "",
  },
  {
    text: "Iya, Pak... Maaf. Kami tidak akan mengulanginya lagi.",
    speaker: "left",
    name: "Vania",
    expression: "Vania_Sedih",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Iya, Pak. Kami janji.",
    speaker: "left",
    name: "Rizki",
    expression: "Rizki_Sedih",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Baiklah, ini peringatan terakhir kalian. Sekali lagi kalian berbuat ulah, saya tidak akan ragu untuk memanggil orang tua kalian!",
    speaker: "right",
    name: "Guru BK",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Namun, begitu mereka kembali ke kelas, ekspresi mereka berubah. Wajah Vania yang sebelumnya menunduk penuh rasa bersalah kini dipenuhi amarah. Ia mengepalkan tangan, matanya membara dengan kebencian.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg27.png",
    moveBg: false,
    transitionText: "Kembali ke kelas...",
    minigameURL: "",
  },
  {
    text: "Aisyah... Anak itu sudah keterlaluan. Berani-beraninya dia melaporkan kita di depan semua orang!",
    speaker: "left",
    name: "Vania",
    expression: "Vania_Marah",
    background: "../../asset/BackGroun/bg27.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aku tahu dia pintar, tapi dia juga sok suci. Seharusnya dia diam saja",
    speaker: "right",
    name: "Alex",
    expression: "Alex_Marah",
    background: "../../asset/BackGroun/bg27.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Kita mau apa?",
    speaker: "right",
    name: "Rizki",
    expression: "Rizki_Marah",
    background: "../../asset/BackGroun/bg27.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Kita ajari dia untuk tidak ikut campur",
    speaker: "left",
    name: "Vania",
    expression: "Vania_Marah",
    background: "../../asset/BackGroun/bg27.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Saat bel istirahat berbunyi, Aisyah berjalan keluar kelas tanpa menyadari bahwa ada tiga pasang mata yang mengamatinya.",
    speaker: "right",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "Waktu bell berbunyi...",
    minigameURL: "",
  },
  {
    text: "Aku akan ke kantin kali ya",
    speaker: "left",
    name: "Aisyah",
    expression: "Aisyah_Senyum",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Hei, anak pintar. Kamu sibuk banget ngurusin urusan orang lain, ya?",
    speaker: "right",
    name: "Vania",
    expression: "Vania_Marah",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aku hanya mengatakan yang sebenarnya",
    speaker: "left",
    name: "Aisyah",
    expression: "Aisyah_Sedih",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Sebenarnya atau sok kepo?",
    speaker: "right",
    name: "Alex",
    expression: "Alex_Marah",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Kami tidak suka orang yang terlalu ikut campur, Aisyah",
    speaker: "right",
    name: "Rizki",
    expression: "Rizki_Marah",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Jangan buat segalanya lebih sulit untuk dirimu sendiri.",
    speaker: "right",
    name: "Alex",
    expression: "Alex_Marah",
    background: "../../asset/BackGroun/bg27a.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg.png",
    moveBg: false,
    transitionText: "Memasuki Minigame...",
    minigameURL: "../MiniGame/index.html",
  },
];
function typeWriterEffect(text, container, callback, index = 0) {
  if (index === 0) {
    container.textContent = "";
    isTyping = true;
  }
  if (index < text.length) {
    container.textContent += text.charAt(index);
    typingTimeout = setTimeout(() => typeWriterEffect(text, container, callback, index + 1), typingSpeed);
  } else {
    isTyping = false;
    if (callback) callback();
  }
}

function updateCharacterExpression(speaker, expression) {
  if (speaker === "left") {
    characterLeft.src = `../../asset/Char/char_${expression}.png`;
    characterLeft.style.opacity = "1";
    characterRight.style.opacity = "0.5";
  } else {
    characterRight.src = `../../asset/Char/char_${expression}.png`;
    characterRight.style.opacity = "1";
    characterLeft.style.opacity = "0.5";
  }
}

function transitionToMinigame(url) {
  // Simpan progress ke localStorage
  localStorage.setItem("duadunia_progress", "day1");
  blackScreen.style.visibility = "visible";
  blackScreen.style.opacity = "1";
  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

function updateBackground(dialog, callback) {
  if (dialog.background !== currentBackground) {
    transitionOverlay.classList.add("active");
    nextText.style.pointerEvents = "none";

    // Show skip button during transition
    skipButton.style.display = "block";

    let transitionMessage = dialog.transitionText || "";
    transitionTextContainer.style.opacity = "1";

    let skipTransition = false;

    skipButton.onclick = () => {
      skipTransition = true;
      completeTransition();
    };

    function completeTransition() {
      // Hide skip button
      skipButton.style.display = "none";

      // Clear any ongoing typing
      clearTimeout(typingTimeout);

      background.src = dialog.background;
      currentBackground = dialog.background;

      background.onload = () => {
        if (dialog.moveBg) {
          moveBackgroundPingPong(dialog.text.length);
        } else {
          background.style.transition = "none";
          background.style.transform = "translateX(0px)";
        }

        transitionOverlay.classList.remove("active");
        transitionTextContainer.style.opacity = "0";
        nextText.style.pointerEvents = "auto";

        if (callback) callback();
      };
    }

    if (!skipTransition) {
      typeWriterEffect(transitionMessage, transitionTextContainer, () => {
        setTimeout(completeTransition, 1000);
      });
    }
  } else {
    if (callback) callback();
  }
}

function moveBackgroundPingPong(textLength) {
  if (!dialogData[dialogIndex].moveBg) return; // Pastikan moveBg true sebelum memulai animasi

  background.style.transition = "none";
  background.style.transform = `translateX(0px)`;

  setTimeout(() => {
    const bgWidth = background.naturalWidth || background.clientWidth;
    const screenWidth = window.innerWidth;

    if (bgWidth <= screenWidth) return;

    let maxMove = Math.min((bgWidth - screenWidth) * 0.1, 50);
    let moveDuration = Math.max(textLength * typingSpeed * 0.01, 4000);

    function animatePingPong(direction) {
      if (!dialogData[dialogIndex].moveBg) {
        background.style.transition = "none";
        background.style.transform = `translateX(0px)`;
        return; // Stop animasi jika moveBg diubah menjadi false
      }

      background.style.transition = `transform ${moveDuration / 1000}s linear`;
      background.style.transform = `translateX(${direction === "right" ? -maxMove : 0}px)`;

      setTimeout(() => {
        background.style.transition = `transform ${moveDuration / 1000}s linear`;
        background.style.transform = `translateX(${direction === "right" ? 0 : -maxMove}px)`;

        setTimeout(() => animatePingPong(direction === "right" ? "left" : "right"), moveDuration);
      }, moveDuration);
    }

    animatePingPong("right");
  }, 100);
}

function showDialog() {
  if (dialogIndex >= dialogData.length) {
    dialogText.textContent = "Cerita selesai!";
    nextText.style.display = "none"; // Sembunyikan tombol next di akhir cerita
    return;
  }
  let dialog = dialogData[dialogIndex];

  characterName.textContent = dialog.name || "";
  updateCharacterExpression(dialog.speaker, dialog.expression);
  updateBackground(dialog, () => {
    typeWriterEffect(dialog.text, dialogText);
  });

  if (dialog.minigameURL) {
    setTimeout(() => {
      transitionToMinigame(dialog.minigameURL);
    }, 1000);
  }
}
function transitionToMinigame(url) {
  blackScreen.style.visibility = "visible";
  blackScreen.style.opacity = "1";

  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

// Function to fade in audio
function fadeInAudio(audio, duration) {
  // Reset volume to 0 and try to play
  audio.volume = 0;
  let playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Playback started successfully
        let step = 0.1 / (duration / 100);
        let interval = setInterval(() => {
          if (audio.volume < 0.5) {
            // Maksimum volume 0.5 (50%)
            audio.volume = Math.min(audio.volume + step, 0.5);
          } else {
            clearInterval(interval);
          }
        }, 100);
      })
      .catch((error) => {
        console.log("Playback failed:", error);
      });
  }
}

// Function to fade out audio
function fadeOutAudio(audio, duration) {
  let step = 0.1 / (duration / 100);
  let interval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      clearInterval(interval);
      audio.pause();
    }
  }, 100);
}

// Modifikasi kode kontrol musik
const musicToggle = document.getElementById("music-toggle");
const musicIcon = musicToggle.querySelector(".music-icon");
const backgroundMusic = document.getElementById("background-music");
let isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    fadeOutAudio(backgroundMusic, 0);
    musicIcon.textContent = "🔈";
  } else {
    fadeInAudio(backgroundMusic, 0);
    musicIcon.textContent = "🔊";
  }
  isMusicPlaying = !isMusicPlaying;
}

musicToggle.addEventListener("click", toggleMusic);

// Pastikan musik dimuat dengan benar saat halaman dimuat
window.addEventListener("load", () => {
  backgroundMusic.volume = 0;
  backgroundMusic.pause();
  musicIcon.textContent = "🔈";
  // Preload the audio
  backgroundMusic.load();
});

function handleNextClick() {
  if (isTyping) {
    // Jika sedang mengetik, selesaikan typing langsung
    clearTimeout(typingTimeout);
    dialogText.textContent = dialogData[dialogIndex].text;
    isTyping = false;
  } else {
    // Jika tidak sedang mengetik, lanjut ke dialog berikutnya
    dialogIndex++;
    showDialog();
  }
}

// Tambahkan event listener untuk tombol next
nextText.addEventListener("click", handleNextClick);

showDialog();
