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
        text: "Hari itu tiba. Aisyah sudah memutuskan apa yang harus ia lakukan. Ia merasa marah dan sakit hati begitu dalam, hingga tak ada tempat lagi untuk memaafkan. Keinginan untuk membalas dendam telah menguasai pikirannya, dan ia tahu bahwa ini adalah waktunya untuk membuat Vania merasakan apa yang telah ia alami", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg54.png", 
        moveBg:true, 
        transitionText:"Revenge" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah memanfaatkan kesempatan yang ada. Vania, yang datang dengan tulus untuk meminta maaf, tidak tahu bahwa di balik kata-katanya yang baik, Aisyah telah merencanakan sesuatu. Aisyah menggunakan Alex dan Rizqi sebagai alat untuk membalas semua yang telah ia terima.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg55.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Dengan cerdik, Aisyah menempatkan mereka dalam posisi untuk membuat Vania malu di depan seluruh sekolah. Sebuah rencana yang rumit namun penuh dengan balas dendam. Hari yang dinanti pun tiba, dan semua orang berkumpul di halaman sekolah. Vania berdiri di sana, dikelilingi oleh teman-temannya, tidak tahu bahwa ia sedang dalam jebakan yang telah disiapkan oleh Aisyah", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg56.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Ini saatnya. Semua yang telah kau lakukan padaku akan kembali padamu, Vania", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg56.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Saat Vania berdiri di depan seluruh sekolah, Alex dan Rizqi melangkah maju, membantu untuk mempublikasikan sebuah cerita yang memalukan, membuat Vania merasa terhina dan tak berdaya. Semua mata tertuju padanya, dan rasa malu yang luar biasa menghantam dirinya. Vania yang awalnya marah, akhirnya merasa terpukul.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg56.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Kalian pikir kalian bisa membuatku malu seperti ini?! Aku tidak akan biarkan kalian begitu saja!", 
        speaker: "left", 
        name:"Vania",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg56.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Vania mengangguk perlahan, mengumpulkan kekuatan untuk berbicara. Meskipun hatinya dipenuhi dengan perasaan hancur, ia sadar bahwa hidupnya harus berubah.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"Namun, saat itu juga, ada sesuatu yang berubah dalam diri Vania. Ia tiba-tiba menyadari bahwa semua yang terjadi adalah akibat dari perbuatannya sendiri. Ia tak bisa menyalahkan orang lain lagi. Semua rasa sakit yang ia rasakan adalah buah dari kebenciannya yang ia tumbuhkan selama ini. Keputusan untuk balas dendam telah membuat semuanya menjadi semakin buruk." ,
        minigameURL: ""

    },
    { 
        text: "Aku… aku tahu ini salah. Semua ini karena aku, karena keputusan buruk yang aku buat. Aku... aku tidak bisa tinggal di sini lagi. Aku harus pergi", 
        speaker: "left", 
        name:"Vania",
        expression: "Vania_Sedih", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "...", 
        speaker: "right", 
        name:"Aisyah",
        expression: "Aisyah_Murung", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah yang melihat perubahan pada Vania, merasa perasaan yang tak terungkapkan di hatinya. Setelah semua yang terjadi, Aisyah tidak tahu harus bagaimana. Namun, perasaan bersalah mulai menggerogoti hatinya.", 
        speaker: "left", 
        name:"Narator",
        expression: "Vania_Sedih", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku… aku juga minta maaf, Vania. Semua yang aku lakukan… aku tidak seharusnya seperti itu. Tapi, itu sudah tidak ada gunanya sekarang", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Aisyah_Murung", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:false, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aku memaafkanmu, Aisyah. Semua perbuatanmu juga sudah aku maafkan", 
        speaker: "left", 
        name:"Vania",
        expression: "Vania_Senyum", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Sebuah Penyesalan yang mendalam melanda Aisyah. Ia menyadari bahwa balas dendam tidak akan mengembalikan apa yang telah hilang, dan hanya akan menambah luka di hati mereka berdua. Vania, dengan keberanian yang luar biasa, memilih untuk pergi dari tempat itu, meninggalkan semua kenangan pahit di belakangnya.", 
        speaker: "Right", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah berdiri di sana, memandang ke arah Vania yang menghilang di kejauhan. Ia merasa kosong, seperti ada bagian dari dirinya yang hilang. Semua yang telah terjadi seolah-olah tidak ada yang benar, dan meskipun ia tahu bahwa ia telah memilih jalan yang salah, ia tidak bisa mengubah apa yang telah terjadi.", 
        speaker: "left", 
        name:"",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg58.png", 
        moveBg:true, 
        transitionText:"Penyesalan" ,
        minigameURL: ""

    },
    { 
        text: "\"Terkadang, keinginan untuk membalas dendam bukanlah cara untuk meredakan luka. Karena pada akhirnya, yang terluka bukan hanya orang lain, tetapi juga diri kita sendiri\"", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg58.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Semua yang telah kulakukan, semua yang kuinginkan, semuanya sia-sia. Aku tidak tahu apakah ada kesempatan kedua. Semua ini sudah terlambat", 
        speaker: "left", 
        name:"Aisyah",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg58.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Aisyah akhirnya melangkah pergi, meninggalkan masa lalu di belakangnya, tetapi dengan hati yang penuh penyesalan dan pelajaran yang terlalu mahal untuk dipelajari. Begitulah akhir dari cerita ini. Tamat.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg58.png", 
        moveBg:true, 
        transitionText:"" ,
        minigameURL: ""

    },
    { 
        text: "Merasa tersakiti bukan berarti kita harus membalas. Karena jika kita memilih membalas, kita hanya menjadi cermin dari luka yang sama. Balas dendam tidak menyembuhkan—ia hanya memperpanjang rasa sakit. Maka, ayo kita coba lagi... bukan sebagai orang yang menyimpan dendam, tapi sebagai pribadi yang memilih untuk memaafkan. Karena dari maaf, kita belajar menjadi lebih kuat, lebih bijak, dan lebih manusiawi.", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg31.png", 
        moveBg:true, 
        transitionText:"Tamat???" ,
        minigameURL: ""

    },
    { 
        text: "", 
        speaker: "left", 
        name:"Narator",
        expression: "Nothing", 
        background: "../../asset/BackGroun/bg.png", 
        moveBg:true, 
        transitionText:"Menjadi Yang Lebih Baik" ,
        minigameURL: "../Minigame/index.html"

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
