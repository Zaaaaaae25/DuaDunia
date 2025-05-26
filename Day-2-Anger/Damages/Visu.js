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
        text: "Aisyah memeluk erat buku hariannya di dadanya, langkahnya sedikit gemetar saat menatap Vania dan teman-temannya yang mengelilinginya. Ia tahu sesuatu yang buruk akan terjadi, tapi ia tetap diam, berusaha menenangkan dirinya sendiri.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"Kekerasan..." ,
        minigameURL: ""

    },
    { 
        text: "Tolong jangan...", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Oh? Apa itu? Buku spesial? Jangan bilang ini buku harian kamu?", 
        speaker: "right", 
        name:"Vania",
        expression: "Vania_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Jangan… Tolong, ini bukan urusan kalian.", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Oh, jadi ini emang buku harian? Wah, gue jadi penasaran isinya apa.", 
        speaker: "right", 
        name:"Alex",
        expression: "Alex_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "(melihat ke arah Aisyah, terlihat sedikit ragu, tetapi tetap diam)", 
        speaker: "right", 
        name:"Rizki",
        expression: "Rizki_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kalau lo nggak mau kasih tahu, kita liat aja sendiri", 
        speaker: "right", 
        name:"Vania",
        expression: "Vania_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah terkejut, mencoba merebut kembali bukunya, tetapi Vania dengan mudah menghindar. Alex dan Rizki berdiri di sisi Vania, memastikan Aisyah tidak bisa mendekat.", 
        speaker: "Narator", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Vania, tolong… itu penting buat aku!", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Hah? Lo nulis kayak anak kecil. ‘Aku harap hari ini lebih baik’, ‘Semoga semua orang bahagia’... Aduh, ini memalukan banget!", 
        speaker: "right", 
        name:"Vania",
        expression: "Vania_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Jadi anak kesayangan guru juga nulis hal kayak gini? Manis banget", 
        speaker: "right", 
        name:"Alex",
        expression: "Alex_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "(menoleh ke arah Aisyah, melihat wajahnya yang ketakutan. Matanya sedikit goyah, tetapi ia tetap diam.)", 
        speaker: "right", 
        name:"Rizki",
        expression: "Rizki_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Tolong kembalikan!", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Hmm... atau mungkin... lebih baik gue buang aja?", 
        speaker: "right", 
        name:"Vania",
        expression: "Vania_Senyum", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Sebelum Aisyah bisa merespons, Vania menarik halaman-halaman buku itu dan merobeknya dengan kasar.", 
        speaker: "right", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Tidak…!!", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Sedih", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Dengar baik-baik, Aisyah. Gue udah kasih lo peringatan dari kemarin. Ini terakhir kali lo ikut campur urusan gue", 
        speaker: "right", 
        name:"Vania",
        expression: "Vania_Excited", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Ayo, Van. Kita udah cukup bersenang-senang", 
        speaker: "right", 
        name:"Alex",
        expression: "Alex_Senyum", 
        background: "../../asset/BackGroun/bg27a.png", 
        moveBg:false, 
        transitionText:"Aisyah berdiri diam, menatap lembaran kertas yang berserakan di lantai. Hatinya terasa hancur. Tangannya terangkat sedikit, ingin mengumpulkan kembali potongan-potongan kecil dari perasaannya yang kini tak lagi utuh" ,
        minigameURL: ""

    },
    { 
        text: "Vania dan teman-temannya meninggalkan Aisyah yang berdiri sedih melihat buku nya di rusak begitu saja", 
        speaker: "right", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27a.png", 
        moveBg:false, 
        transitionText:"Aisyah berdiri diam, menatap lembaran kertas yang berserakan di lantai. Hatinya terasa hancur. Tangannya terangkat sedikit, ingin mengumpulkan kembali potongan-potongan kecil dari perasaannya yang kini tak lagi utuh" ,
        minigameURL: ""

    },{ 
        text: "Aisyah berlutut, jemarinya gemetar saat mengambil satu per satu lembaran yang robek. Nafasnya tersengal, bukan karena lelah, tetapi karena dadanya terasa sesak.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg35.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Kenapa mereka melakukan ini?", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg35.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Apa salahnya sampai diperlakukan seperti ini?", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg35.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Tapi meskipun hatinya penuh dengan kesedihan dan amarah, ia tetap tidak bisa membenci mereka sepenuhnya.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg35.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Ia hanya menunduk, menggenggam lembaran yang tersisa… lalu menutup matanya dengan air mata yang akhirnya jatuh.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg35.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""
    },{ 
        text: "", 
        speaker: "", 
        name:"",
        expression: "", 
        background: "../../asset/BackGroun/bg.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: "../Late/index.html",

    },


    

   
    
    
    
]
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
        playPromise.then(() => {
            // Playback started successfully
            let step = 0.1 / (duration / 100);
            let interval = setInterval(() => {
                if (audio.volume < 0.5) {  // Maksimum volume 0.5 (50%)
                    audio.volume = Math.min(audio.volume + step, 0.5);
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }).catch(error => {
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
    localStorage.clear();
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
