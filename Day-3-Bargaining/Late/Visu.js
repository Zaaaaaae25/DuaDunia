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
    text: "Aisyah merasa lelah. Lelah dengan perasaan yang terus membebaninya. Lelah dengan sikap Vania dan teman-temannya yang tak pernah berhenti membuat hidupnya sulit. Lelah dengan dirinya sendiri yang selalu merasa tidak cukup.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText:
      "Hari itu berakhir dengan Aisyah pulang ke rumah, namun hatinya tidak kunjung merasa tenang. Setiap langkahnya terasa berat, seolah dunia ini semakin menekan dirinya. Di ruang kamarnya yang sunyi, ia duduk di ujung tempat tidurnya, memikirkan semua yang telah terjadi.",
    minigameURL: "",
  },
  {
    text: "Dengan mata yang sudah mulai berat, Aisyah menatap langit yang mulai gelap melalui jendela kamarnya. Ia merasa terperangkap di dalam keadaan yang tak bisa ia ubah.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Kenapa aku harus melewati ini semua? Kenapa aku harus menanggung beban ini sendirian?",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Ia merasakan dadanya sesak, hampir tak bisa bernapas. Semuanya terasa begitu sulit. Semua yang ia inginkan hanyalah kedamaian, untuk bisa menjalani hidup tanpa rasa takut dan terintimidasi. Tapi hari demi hari, ia merasa semakin terasing.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dalam kebisuan malam itu, Aisyah berlutut di dekat tempat tidurnya. Ia menutup matanya, mencoba untuk berbicara pada Tuhan dengan segala kekuatan yang tersisa.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Tuhan… aku lelah. Aku nggak kuat lagi. Semua yang aku lakukan sepertinya sia-sia. Kenapa aku harus menghadapi ini? Kenapa hidupku harus seperti ini? Aku cuma ingin merasa tenang… cuma ingin semuanya berhenti",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Tolong, Tuhan… tolong beri aku kekuatan untuk melewati ini semua. Aku cuma ingin merasa bahagia, seperti dulu. Tolong, aku hanya ingin berhenti merasa begitu…",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Namun, meskipun hatinya penuh dengan harapan, Aisyah tahu dalam hati kecilnya bahwa ini bukanlah akhir. Dia tahu bahwa besok, semuanya mungkin akan tetap sama. Bahkan, bisa jadi lebih buruk.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Tapi ia juga tahu satu hal—meskipun dunia ini terasa gelap, ia masih harus melangkah ke depan. Ia tidak tahu bagaimana atau kapan, tetapi ia tahu bahwa ini bukan akhir dari segalanya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aku lelah, Tuhan. Tapi aku tahu aku harus bertahan. Aku nggak bisa menyerah. Aku harus terus berjalan.",
    speaker: "left",
    name: "Aisyah",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dengan tarikan napas yang berat, Aisyah menutup matanya dan mencoba untuk tidur, meskipun hatinya masih terasa hampa. Ia tahu bahwa esok harinya, ia akan kembali menghadapi kenyataan yang sama.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Tapi, untuk malam ini, ia memilih untuk tidur dalam keheningan, berharap ada kedamaian dalam tidurnya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg44.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../../asset/BackGroun/bg.png",
    moveBg: true,
    transitionText: "DAY-3-BARGAINING...END",
    minigameURL: "../../Day-4-Depression/index.html",
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
  // Simpan progress ke localStorage
  localStorage.setItem("duadunia_progress", "day4");
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
