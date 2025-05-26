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
        text: "Pagi itu, Aisyah terbangun dengan tubuh yang lemas. Matanya masih berat, dan perasaan yang datang menghampirinya begitu mencekam. Ia tahu bahwa hari ini adalah hari yang sangat berat, bahkan untuk sekadar mengangkat tubuhnya keluar dari tempat tidur.", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg46.png", 
        moveBg:true, 
        transitionText:"Day-4 Depression" ,
        minigameURL: ""

    },
    { 
        text: "Dengan napas yang berat, Aisyah memutuskan untuk tidak masuk sekolah. Ia berpura-pura sakit, padahal ia merasa jauh lebih sakit di dalam hati. Ia tidak ingin bertemu dengan siapa pun, tidak ingin mendengar suara tawa atau melihat tatapan mata orang-orang yang seolah tak tahu apa yang ia rasakan.", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg46.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "(Dalam Hati)\"Kenapa harus aku? Kenapa hidup ini begitu sulit? Aku ingin bersembunyi, ingin jauh dari semuanya.\"", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Aisyah", 
        background: "../../asset/BackGroun/bg46.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    
    { 
        text: "Di dalam kamar yang gelap, Aisyah menutup mata, mencoba untuk menghindari kenyataan yang menyesakkan dada. Semua yang terjadi terasa seperti mimpi buruk yang tak kunjung berakhir. Ia merasa semakin terpuruk, dan tidak tahu bagaimana caranya keluar dari kegelapan ini.", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg46.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    
    { 
        text: "Guru BK mendengar laporan tentang kejadian yang melibatkan Vania di toko sembako nenek Aisyah. Guru BK sudah cukup mendengar cerita dari Aisyah dan beberapa teman lainnya. Kali ini, ia tidak berniat untuk memarahi Vania, melainkan ingin memberi nasihat agar Vania menyadari perbuatannya dan berusaha untuk berubah.", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg26.png", 
        moveBg:false    , 
        transitionText:"Di sisi lain, di ruang BK..." ,
        minigameURL: ""

    },
    
    { 
        text: "Ada apa pak, bapak memanggil saya?", 
        speaker: "left", 
        expression: "Vania_Senyum", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg26.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Vania, saya tahu kamu sudah tahu apa yang telah terjadi. Saya ingin kamu datang ke sini bukan untuk dimarahi, tapi untuk merenung dan melihat apa yang telah kamu lakukan. Kamu bukan hanya merugikan Aisyah, tetapi juga diri kamu sendiri", 
        speaker: "right", 
        expression: "Nothing", 
        name:"Guru BK", 
        background: "../../asset/BackGroun/bg26.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Saya nggak butuh nasihat dari siapapun! Ini semua nggak adil!", 
        speaker: "left", 
        expression: "Vania_Marah", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg26a.png", 
        moveBg:false, 
        transitionText:"Vania yang sudah tiba di ruang BK merasa marah dan kesal. Ia merasa bahwa ini semua adalah kesalahan Aisyah yang melaporkannya dan membuatnya merasa terpojok. Vania yang sudah berada di ujung kesabaran, langsung bangkit dan pergi meninggalkan ruang BK tanpa kata-kata." ,
        minigameURL: ""

    },
    { 
        text: "Mereka merasa cemas karena semakin lama Vania semakin menjauh dari mereka. Walaupun mereka tidak terlibat langsung dalam insiden di toko sembako, mereka mulai merasa bahwa mereka juga bertanggung jawab. Mereka mulai menyadari bahwa sikap mereka yang membiarkan Vania melakukan apa saja tanpa mengingatkan menjadi salah.", 
        speaker: "left", 
        expression: "Nothing", 
        name:"Narator", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"Alex dan Rizqi yang mendengar kejadian itu, akhirnya memutuskan untuk bertemu dengan Vania." ,
        minigameURL: ""

    },
    { 
        text: "Kenapa kalian ke sini?", 
        speaker: "left", 
        expression: "Vania_Marah", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Vania, kita perlu bicara. Apa yang kamu lakukan ke Aisyah nggak benar. Kita seharusnya bisa membantu kamu, bukan malah mendukung perbuatan yang salah, maaf kan kami", 
        speaker: "right", 
        expression: "Alex_Sedih", 
        name:"Alex", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kita salah, Vania. Kita nggak seharusnya ikut-ikutan dan membiarkan kamu melakukannya. Kita perlu minta maaf ke Aisyah, dan mulai berubah", 
        speaker: "right", 
        expression: "Rizki_Sedih", 
        name:"Rizki", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kalian nggak tahu apa yang aku rasakan! Aku nggak butuh maaf atau nasihat kalian!", 
        speaker: "left", 
        expression: "Vania_Marah", 
        name:"Vania", 
        background: "../../asset/BackGroun/bg31.png", 
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
        transitionText:"Vania langsung pergi..." ,
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
