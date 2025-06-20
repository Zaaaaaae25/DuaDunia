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
        text: "Pagi hari, suasana sekolah seperti biasa. Murid-murid bercengkerama di lorong, beberapa bersiap masuk kelas, sementara yang lain masih berbincang di halaman. Namun, di sudut belakang sekolah, di bawah pohon besar, Vania, Alex, dan Rizki berkumpul dengan wajah bosan", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg30.png", 
        moveBg:true, 
        transitionText:"Day-2 Anger" ,
        minigameURL: ""

    },
    { 
        text: "Gila, bosan banget. Nggak ada hal seru di sekolah ini.", 
        speaker: "left", 
        expression: "Vania_Senyum", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"Rencana Jahat" ,
        minigameURL: ""

    },
    { 
        text: "Kalau bosan, kenapa nggak bikin sesuatu yang seru?", 
        speaker: "right", 
        expression: "Alex_Excited", 
        name:"Alex_Excited", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Maksud Lo?", 
        speaker: "left", 
        expression: "Vania_Senyum", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Gimana kalau kita ‘ngasih pelajaran’ lagi ke si anak kesayangan guru itu?", 
        speaker: "right", 
        expression: "Alex_Excited", 
        name:"Alex", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    }
    ,{ 
        text: "Udah lah, kemarin kita udah cukup kan? Nggak usah keterlaluan, Van", 
        speaker: "right", 
        expression: "Rizki_Sedih", 
        name:"Rizki", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    }
    ,{ 
        text: "Apa? Lo takut? Riz, ini cuma buat senang-senang doang, lagian kemarin dia tuh berani buka mulut, siapa tahu kali ini dia lebih tahu diri?", 
        speaker: "left", 
        expression: "Vania_Excited", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Nggak ada salahnya sedikit ‘hiburan’ pagi ini.", 
        speaker: "right", 
        expression: "Alex_Excited", 
        name:"Alex", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Setuju. Oke, kita kasih Aisyah sedikit ‘perhatian’ lebih hari ini.", 
        speaker: "left", 
        expression: "Vania_Senyum", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Setelah bel istirahat berbunyi, Aisyah berjalan sendirian ke kantin. Baru beberapa langkah, ia melihat Vania dan teman-temannya menghadangnya di lorong belakang, tempat yang jarang dilewati murid lain", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"Konfrontasi" ,
        minigameURL: ""

    },
    { 
        text: "Kenapa kalian menghalangi jalanku?", 
        speaker: "left", 
        expression: "Aisyah_Murung", 
        name:"Aisyah", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kenapa? Aku cuma mau ngobrol aja. Kok tegang banget sih?", 
        speaker: "right", 
        expression: "Vania_Senyum", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Iya, kita kan cuma pengen tahu… apa kamu udah belajar buat nggak ikut campur urusan orang lain?", 
        speaker: "right", 
        expression: "Alex_Senyum", 
        name:"Alex", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku cuma mengatakan yang sebenarnya… Aku nggak melakukan kesalahan apa pun.", 
        speaker: "left", 
        expression: "Aisyah_Sedih", 
        name:"Aisyah", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Oh? Jadi kamu masih belagu? Harusnya kamu udah paham, Aisyah. Sekali lo cari masalah sama gue, lo bakal kena akibatnya.", 
        speaker: "right", 
        expression: "Vania_Marah", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Gimana kalau kita kasih dia ‘pelajaran’ yang lebih seru hari ini?", 
        speaker: "right", 
        expression: "Vania_Excited", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg32.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "", 
        speaker: "", 
        expression: "", 
        name:"", 
        background: "../../asset/BackGroun/bg.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: "../MiniGame/index.html"

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
