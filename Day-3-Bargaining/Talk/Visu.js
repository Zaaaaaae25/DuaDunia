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
    text: "Aisyah yang sudah pulang langsung membantu di toko neneknya, dan menjaga toko itu. Lalu Vania masuk dan membuat Aisyah terkejut. Vania langsung mengarah ke Aisyah, dan akan memeberikan peringatan terakhir",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "Mengancam...",
    minigameURL: "",
  },
  {
    text: "Va-Vania kenapa kamu datang kesini?",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Ya ya, kamu sudah tau kan pasti kenapa, kan sudah kami bilang untuk jangan ikut campur",
    speaker: "right",
    name: "Vania",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Vania, aku melakukan itu untuk kosultasi saja, dan untuk menyadarkan kalian bahwa yang kalian itu salah",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Itu gk bakal merubah apapum Aisyah, kamu tidak tau rasanya kan?, semua yang kamu perbuat tidak akan merubah apapun, karna kami akan selalu dan tidak akan berhenti",
    speaker: "rigth",
    name: "Vania",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Ta-tapi..",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "INGAT.. ini akan menjadi sebuah ancaman, diamana kamu tidak akan pernah tenang di sekolah, anak seperti mu harus di beri pelajaran agar paham",
    speaker: "right",
    name: "Vania",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: ".....",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Baiklah, karena kamu sudah paham, ingat kata2 ku hari ini",
    speaker: "right",
    name: "Vania",
    expression: "",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Vania pun pergi meninggalkan Aisyah yang murung dan merasakan tekanan yang semakin lama membuatnya mulai depresi",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "",
    speaker: "",
    name: "",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg41.png",
    moveBg: true,
    transitionText: "Waktu menunjukan malam sudah tiba dan Aisyah pulang dan masuk kedalam kamar",
    minigameURL: "../Late/index.html",
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

// ... existing code ...

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

// ... existing code ...

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
