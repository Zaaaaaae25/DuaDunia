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
        text: "Hari itu Aisyah bangun dengan tekad yang lebih kuat daripada sebelumnya. Semua rasa sakit, kebingungannya, dan luka yang dalam akhirnya mulai ia terima. Ia sadar bahwa tidak ada jalan pintas untuk sembuh, dan ia tidak bisa terus hidup dalam penyangkalan. Ia harus menerima kenyataan, meskipun itu berat. Ia memutuskan untuk kembali ke sekolah dengan hati yang lebih lapang, siap untuk menghadapi apapun yang datang", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg59.png", 
        moveBg:true, 
        transitionText:"Acception" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah… kami datang untuk meminta maaf. Aku sudah terlalu jauh melangkah dan menyebabkan banyak luka. Aku tahu aku tidak bisa mengubah semuanya, tapi aku ingin kamu tahu, aku sangat menyesal", 
        speaker: "left", 
        name:"Vania",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"Saat ia tiba di sekolah, ia melihat Vania dan teman-temannya mendekatinya. Aisyah tahu bahwa mereka datang untuk meminta maaf. Namun, kali ini ia tidak merasa takut atau tertekan. Ia sudah menerima semuanya dan siap untuk menjalani masa depannya dengan lebih bijak." ,
        minigameURL: ""

    },
    { 
        text: "Aku sudah memaafkan kalian, Vania. Semua yang terjadi di antara kita bukan hanya salah kalian, tapi juga salahku. Aku sudah menerima semuanya, dan aku tidak ingin hidup dalam masa lalu. Kita semua punya kekurangan, dan kita hanya perlu saling mengerti dan belajar bersama", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kami tidak tahu seberapa banyak luka yang sudah kami sebabkan. Aku… aku ingin sekali mengubah semuanya. Aku berharap kita bisa memulai lagi dari awal, Aisyah", 
        speaker: "left", 
        name:"Rizki",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah, kami sudah sadar. Kami tidak akan lagi terjebak dalam kebodohan dan ego kami. Kami ingin menjadi teman yang lebih baik untukmu", 
        speaker: "left", 
        name:"Alex",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku tahu kalian bisa berubah. Kita semua bisa saling melengkapi. Kita tidak sempurna, tetapi kita bisa belajar dan menjadi lebih baik. Semua ini tidak mudah, tapi aku memilih untuk melangkah maju dan menghadapi masa depan dengan hati yang terbuka", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Terima kasih, Aisyah. Aku… aku tidak tahu bagaimana aku bisa meminta maaf dengan kata-kata, tapi aku janji aku akan berubah. Aku ingin jadi teman yang lebih baik", 
        speaker: "left", 
        name:"Vania",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku tahu kalian bisa. Kita akan saling mendukung, saling membantu untuk menjadi lebih baik. Tidak ada lagi kebencian, hanya pemahaman dan persahabatan", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg60.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    
    { 
        text: "Aisyah merasakan sebuah kelegaan yang luar biasa. Dia akhirnya berhasil menerima segalanya—perubahan, luka, dan juga kesempatan baru untuk memperbaiki diri. Semua yang terjadi telah membawa mereka ke titik ini. Mereka kini bisa menjadi lebih baik bersama.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg61.png", 
        moveBg:true, 
        transitionText:"Akhir" ,
        minigameURL: ""

    },
    { 
        text: "Dengan keteguhan hati, Aisyah membuka lembaran baru dalam hidupnya. Vania, Alex, Rizqi, dan Aisyah kini menjadi lebih kuat dan saling mendukung. Mereka belajar bahwa kesalahan adalah bagian dari kehidupan, tetapi yang lebih penting adalah bagaimana kita bangkit setelah jatuh.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg61.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "\"Kadang, menerima segalanya adalah langkah pertama menuju penyembuhan. Ketika kita memilih untuk memaafkan dan melangkah maju, kita memberi ruang bagi perubahan yang lebih baik. Tidak ada yang lebih kuat daripada hati yang siap menerima dan mengampuni.\"", 
        speaker: "left", 
        name:"Narator",
        expression: "", 
        background: "../../asset/BackGroun/bg61.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "", 
        speaker: "left", 
        name:"",
        expression: "", 
        background: "../../asset/BackGroun/bg.png", 
        moveBg:true, 
        transitionText:"True Ending" ,
        minigameURL: ""

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
