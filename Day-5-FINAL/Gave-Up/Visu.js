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
        text: "Hari itu tiba. Aisyah sudah tidak bisa menahan perasaan yang semakin menekan hatinya. Dia merasa seperti berada di ujung jurang, dan meskipun ia sudah berusaha untuk bertahan, ia merasa semuanya sudah terlalu berat untuk diteruskan. Keinginan untuk pergi dari semua ini sudah menguasai pikirannya. Aisyah memutuskan untuk pindah sekolah, berharap dengan itu ia bisa melepaskan diri dari segala rasa sakit yang telah mengikutinya selama ini.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg50.png", 
        moveBg:true, 
        transitionText:"Gave-Up" ,
        minigameURL: ""

    },
    { 
        text: "Aku… aku ingin mengucapkan maaf. Aku tahu aku tidak bisa mengubah apa yang sudah terjadi, dan aku tidak kuat lagi untuk bertahan di sini. Aku memaafkan kalian… meskipun, aku tidak bisa lagi melanjutkan ini", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"Namun, sebelum pergi, ia tahu ada satu hal yang harus ia lakukan. Dia ingin mengakhiri semuanya dengan sebuah permintaan maaf yang tulus, meskipun hatinya hancur." ,
        minigameURL: ""

    },{ 
        text: "Aisyah… kamu… kamu tidak perlu memaafkan kami. Kami yang seharusnya minta maaf. Semua ini salah kami. Kami… aku… aku sangat menyesal", 
        speaker: "left", 
        name:"Vania",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Kami tidak pernah menyadari seberapa jauh hal ini sudah merusakmu, Aisyah. Kami… kami ingin semuanya kembali seperti dulu. Kami benar-benar menyesal", 
        speaker: "left", 
        name:"Rizki",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Aisyah, kamu sudah melalui banyak hal sendirian. Kami tahu, kami salah. Kami seharusnya lebih peduli padamu. Kami menyesal, dan kami berharap bisa mengubah semuanya", 
        speaker: "left", 
        name:"Alex",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Aku tahu kalian menyesal, tapi kalian tidak tahu bagaimana rasanya berada di posisi aku. Aku sudah tidak kuat lagi. Aku sudah lelah dengan semua ini. Aku harus pergi. Memaafkan kalian tidak akan mengubah apapun. Aku hanya ingin kalian tahu… aku sudah berusaha", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },{ 
        text: "Aisyah, aku ingin kalian tahu bahwa aku benar-benar menyesal. Semua yang aku lakukan itu karena aku merasa tidak dihargai. Tapi itu bukan alasan untuk menyakitimu. Aku tahu aku salah, dan aku berharap kamu bisa bahagia di tempat yang baru", 
        speaker: "left", 
        name:"Vania",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Mungkin kita semua hanya manusia yang berusaha mencari tempat di dunia ini. Aku… aku tidak tahu apakah aku bisa bahagia lagi, tapi aku akan mencoba untuk melupakan semua ini", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku berharap aku bisa mengubah semuanya, Aisyah. Maafkan kami. Kami benar-benar ingin kamu bisa merasa lebih baik", 
        speaker: "left", 
        name:"Rizki",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah, kamu sudah menjadi orang yang lebih kuat karena semua ini. Kami hanya berharap kamu bisa melupakan semua rasa sakit itu. Semoga di tempat yang baru kamu bisa menemukan kedamaian", 
        speaker: "left", 
        name:"Alex",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg52.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah akhirnya melangkah pergi, meninggalkan Vania dan teman-temannya dengan perasaan yang penuh penyesalan. Mungkin, kepergiannya adalah jalan terbaik untuknya.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg53.png", 
        moveBg:true, 
        transitionText:"Aisyah menatap mereka semua, merasakan perasaan yang campur aduk. Di satu sisi, ia merasa seolah-olah semua ini tidak ada artinya. Tapi di sisi lain, ia merasa ada sedikit kelegaan. Ia memaafkan mereka, meskipun ia tahu bahwa luka yang ada tidak akan pernah benar-benar sembuh." ,
        minigameURL: ""

    },
    { 
        text: "Perasaan kesedihan dan penyesalan menyelimuti hati semua orang. Tidak ada yang bisa mengubah apa yang telah terjadi, namun mereka belajar bahwa terkadang, untuk memperbaiki kesalahan, kita harus mengakui bahwa kita tidak bisa mengubah masa lalu. Semua yang terjadi sudah terjadi, dan yang bisa dilakukan hanya melangkah maju.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg53.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kadang, kita harus menerima kenyataan bahwa tidak semua luka bisa sembuh, dan tidak semua perbaikan datang dengan cara yang kita inginkan. Terkadang, melepaskan adalah jalan terbaik untuk menemukan kedamaian, meskipun hati kita tetap terluka", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:true, 
        transitionText:"Tamat???" ,
        minigameURL: ""

    },
    { 
        text: "Namun, menyerah bukanlah jalan keluar dari semua ini. Di tengah badai yang mendera, harapan masih bisa tumbuh, sekecil apa pun itu. Jangan biarkan keputusasaan menutup cahaya yang masih berpendar dalam hati kita. Ayo, saling menggenggam tangan—kita hadapi semua ini bersama. Karena kita percaya, di balik segala luka dan air mata, masih ada akhir yang lebih baik menanti. Akhir yang tidak hanya memberi kita kedamaian, tetapi juga alasan untuk kembali tersenyum", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg27.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg.png", 
        moveBg:true, 
        transitionText:"Mencari Yang Lebih Baik" ,
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
