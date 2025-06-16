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
    text: "Hari ketiga di sekolah, Aisyah merasa ada sesuatu yang harus ia ubah. Ia tak bisa lagi hanya diam, tak bisa terus menerus merasa lemah. Walaupun amarah masih membara di dalam hatinya, ia tahu bahwa kini saatnya untuk bertindak—untuk melangkah keluar dari bayang-bayang ketakutannya.",
    speaker: "left",
    expression: "Nothing",
    name: "Narator",
    background: "../../asset/BackGroun/bg38.png",
    moveBg: true,
    transitionText: "Day-3 Bargaining",
    minigameURL: "",
  },
  {
    text: "Hari itu, setelah pelajaran selesai, Aisyah melangkah ke ruang BK. Jantungnya berdegup kencang, tapi ia tahu inilah keputusan yang harus ia ambil. Ia mengetuk pintu dengan pelan, namun detik berikutnya pintu terbuka, dan guru BK menatapnya dengan senyuman lembut.",
    speaker: "left",
    expression: "Nothing",
    name: "Narator",
    background: "../../asset/BackGroun/bg39.png",
    moveBg: true,
    transitionText: "Bel istirahat berbunyi...",
    minigameURL: "",
  },
  {
    text: "Selamat Siang pak",
    speaker: "left",
    expression: "Aisyah_Senyum",
    name: "Aisyah",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aisyah, ada apa? Kenapa kamu terlihat terburu-buru?",
    speaker: "right",
    expression: "Nothing",
    name: "Guru BK",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Maaf pak saya pengen bicara ama Bapak",
    speaker: "left",
    expression: "Aisyah_Sedih",
    name: "Aisyah",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Guru BK mengangguk, mempersilakan Aisyah duduk. Aisyah menarik napas dalam-dalam, berusaha mengumpulkan kata-kata yang sudah lama ingin ia katakan.",
    speaker: "right",
    expression: "Nothing",
    name: "Narator",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Pak, saya tidak tahu harus mulai dari mana. Tapi, saya merasa mereka—Vania, Alex, dan Rizki—selalu membuat saya merasa tidak berharga. Saya hanya ingin jadi diri saya sendiri, tapi mereka selalu menghina saya… sampai saya merasa tidak bisa bertahan lagi.",
    speaker: "left",
    expression: "Aisyah_Sedih",
    name: "Aisyah",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aisyah, saya mengerti perasaanmu. Terkadang, orang lain tidak tahu seberapa besar dampak dari kata-kata dan perbuatan mereka terhadap orang lain. Tapi kamu sudah melakukan langkah yang sangat tepat dengan datang ke sini. Kamu tidak sendiri.",
    speaker: "right",
    expression: "Nothing",
    name: "Guru BK",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "(Aisyah mengangguk pelan, merasa sedikit lega meskipun hatinya masih sesak. Ia merasa untuk pertama kalinya ada yang mendengarkan keluh kesahnya.)",
    speaker: "left",
    expression: "Aisyah_Senyum",
    name: "Aisyah",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Berdasarkan apa yang kamu ceritakan, saya akan segera menghubungi orang tua mereka dan memberi mereka teguran yang tegas. Saya akan membantu kamu untuk menyelesaikan masalah ini.",
    speaker: "right",
    expression: "Nothing",
    name: "Guru BK",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "(Aisyah merasa sedikit lega, meskipun ia tahu itu hanya langkah awal. Tapi tak ada lagi rasa takut yang menghantuinya. Ia siap menghadapi apapun yang datang)",
    speaker: "left",
    expression: "Aisyah_Senyum",
    name: "Aisyah",
    background: "../../asset/BackGroun/bg26.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Gila, Aisyah! Kenapa dia harus melapor ke guru? Gue nggak terima!",
    speaker: "left",
    expression: "Vania_Marah",
    name: "Vania",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "Di sisi lain, Vania dan teman-temannya berada di taman sekolah, berbicara dengan keras setelah mengetahui kabar tentang konsultasi Aisyah dengan guru BK.",
    minigameURL: "",
  },
  {
    text: "Gue rasa kita nggak bisa diam aja, Van. Guru bakal bawa masalah ini lebih jauh.",
    speaker: "right",
    expression: "Alex_Marah",
    name: "Alex",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Tapi, kalau kita terus kayak gini, nanti kita bisa kena masalah",
    speaker: "right",
    expression: "Rizki_Sedih",
    name: "Rizkl",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Jangan khawatir, gue punya cara untuk bikin dia kapok. Kita nggak bisa kalah gini aja!",
    speaker: "left",
    expression: "Vania_Marah",
    name: "Vania",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Vania yang sudah emosi memutuskan melakukan hal yang lebih jauh seorang diri",
    speaker: "right",
    expression: "Nothing",
    name: "Narator",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Lihat saja...",
    speaker: "left",
    expression: "Vania_Senyum",
    name: "Vania",
    background: "../../asset/BackGroun/bg31.png",
    moveBg: false,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aisyah yang sudah lega pun berjalan pulang dan membantu neneknya untuk menjaga toko, tetapi ia tidak tau bahwa Vania mengikutinya untuk melampiaskan amarahnya",
    speaker: "left",
    expression: "Nothing",
    name: "",
    background: "../../asset/BackGroun/bg40.png",
    moveBg: true,
    transitionText: "Bell pulang pun berbunyi...",
    minigameURL: "",
  },
  {
    text: "dan yang pasti ini akan sangat buruk...",
    speaker: "left",
    expression: "Nothing",
    name: "",
    background: "../../asset/BackGroun/bg40.png",
    moveBg: true,
    transitionText: "",
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
