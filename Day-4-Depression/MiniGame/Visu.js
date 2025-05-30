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

// Quiz state variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// Quiz questions data
const quizData = [
    {
        question: "Aisyah tidak masuk sekolah dengan alasan sakit, padahal ia sedang mengalami depresi berat. Apa ciri umum dari seseorang yang mengalami depresi?",
        options: ["Marah terus-menerus", "Selalu ceria di depan orang lain", "Merasa putus asa dan tidak memiliki energi", "Makan terus-menerus"],
        correctAnswer: 2,
        background: "../../asset/BackGroun/bg46.png",
        explanation: "Depresi sering membuat seseorang merasa hampa, kelelahan, dan tidak ingin melakukan apa pun, termasuk hal yang biasanya disukai. Ini bukan sekadar “sedih biasa” tetapi perasaan kehilangan harapan yang mendalam."
    },
    {
        question: "Guru BK memanggil Vania, bukan untuk memarahinya, tetapi untuk menasehati. Mengapa pendekatan ini lebih baik dalam kasus seperti Vania?",
        options: ["Karena Vania pasti akan melawan jika dimarahi", "Karena pendekatan lembut lebih membuka ruang perubahan", "Karena BK takut dengan Vania", "Supaya tidak memperpanjang masalah"],
        correctAnswer: 1,
        background: "../../asset/BackGroun/bg26.png",
        explanation: "Dalam konseling, pendekatan empati dan komunikasi non-menghakimi lebih efektif dalam menyentuh hati seseorang dan mengubah perilaku secara sadar, bukan karena tekanan atau hukuman."
    },
    {
        question: "Alex dan Rizqi merasa bersalah karena selama ini hanya mengikuti Vania. Apa sikap terbaik setelah menyadari kesalahan masa lalu?",
        options: ["Berpura-pura tidak tahu", "Menyalahkan Vania sepenuhnya", "Mengakui dan meminta maaf dengan tulus", "Menjauhi semua orang"],
        correctAnswer: 2,
        background: "../../asset/BackGroun/bg19.png",
        explanation: "Mengakui kesalahan dan meminta maaf adalah langkah awal menuju pertumbuhan pribadi dan perbaikan hubungan. Ini adalah bentuk tanggung jawab dan kematangan emosional."
    },
    {
        question: "Aisyah berdoa, berharap semuanya segera berakhir. Apa arti penting dari spiritualitas saat seseorang berada dalam masa depresi?",
        options: ["Untuk menyembuhkan secara ajaib", "Untuk menyalahkan takdir", "Sebagai bentuk harapan dan kekuatan batin", "Agar orang lain menganggap kita sabar"],
        correctAnswer: 2,
        background: "../../asset/BackGroun/bg44.png",
        explanation: "Dalam situasi depresi, spiritualitas bisa menjadi penguat dari dalam: bukan untuk kabur dari kenyataan, tapi untuk mencari makna, penghiburan, dan harapan dalam masa sulit."
    },
    {
        question: "Vania mulai merenung setelah mendengar semua yang terjadi. Ia sadar bahwa tindakan buruknya berdampak dalam. Apa yang bisa dilakukan untuk memperbaiki luka yang sudah terlanjur terjadi?",
        options: ["Meminta maaf dan tidak mengulangi lagi", "Memberi hadiah agar dimaafkan", "Menghindari korban selamanya", "Membela diri dan menyangkal"],
        correctAnswer: 0,
        background: "../../asset/BackGroun/bg34.png",
        explanation: "Permintaan maaf yang tulus dan perubahan sikap adalah bentuk pertanggungjawaban terbaik. Meski luka tidak selalu langsung sembuh, langkah ini membuka pintu penyembuhan dan rekonsiliasi."
    }
    // Add more questions here
];

// Score meter elements
const scoreMeter = document.createElement("div");
scoreMeter.id = "score-meter";
scoreMeter.innerHTML = `
    <div class="score-container">
        <div class="score-label">Benar</div>
        <div class="score-bar">
            <div class="correct-score" style="width: 0%"></div>
            <div class="wrong-score" style="width: 0%"></div>
        </div>
        <div class="score-label">Salah</div>
    </div>
`;
document.body.appendChild(scoreMeter);

// Options container
const optionsContainer = document.createElement("div");
optionsContainer.id = "options-container";
document.getElementById("dialog-box").appendChild(optionsContainer);

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
    blackScreen.style.opacity = "0";
    
    // Fade in black screen
    setTimeout(() => {
        blackScreen.style.opacity = "1";
        
        // After fade in, navigate to new page
        setTimeout(() => {
            window.location.href = url;
        }, 1500);
    }, 0);
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

function updateScoreMeter() {
    const total = correctAnswers + wrongAnswers;
    const correctPercentage = total > 0 ? (correctAnswers / total) * 100 : 0;
    const wrongPercentage = total > 0 ? (wrongAnswers / total) * 100 : 0;
    
    document.querySelector(".correct-score").style.width = `${correctPercentage}%`;
    document.querySelector(".wrong-score").style.width = `${wrongPercentage}%`;
}

function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    const question = quizData[currentQuestionIndex];
    console.log("Current question background:", question.background); // Debug log
    
    characterName.textContent = "Pertanyaan " + (currentQuestionIndex + 1);
    
    // Add fade out effect
    dialogText.classList.add('fade-out');
    optionsContainer.classList.add('fade-out');
    
    setTimeout(() => {
        // Update background image if provided
        if (question.background) {
            console.log("Loading background:", question.background); // Debug log
            background.src = question.background;
            
            // Add error handling for background loading
            background.onerror = function() {
                console.error("Failed to load background image:", question.background);
                background.src = "../../asset/BackGroun/default.png"; // Fallback image
            };
            
            background.onload = function() {
                console.log("Background loaded successfully"); // Debug log
                background.style.opacity = "1";
            };
        }

        dialogText.textContent = question.question;
        dialogText.classList.remove('fade-out');
        dialogText.classList.add('fade-in');
        
        // Clear previous options
        optionsContainer.innerHTML = "";
        
        // Create new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.textContent = option;
            optionElement.addEventListener("click", () => handleAnswer(index));
            optionsContainer.appendChild(optionElement);
        });
        
        optionsContainer.classList.remove('fade-out');
        optionsContainer.classList.add('fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            dialogText.classList.remove('fade-in');
            optionsContainer.classList.remove('fade-in');
        }, 500);
    }, 500);
}

function handleAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswer;
    
    // Disable all options after answering
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Highlight the selected and correct answers
    options[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
        options[question.correctAnswer].classList.add('correct');
    }
    
    if (isCorrect) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    
    updateScoreMeter();
    
    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.textContent = question.explanation;
    optionsContainer.appendChild(explanationDiv);
    
    // Add continue button
    const continueButton = document.createElement('div');
    continueButton.className = 'continue-button';
    continueButton.textContent = 'Lanjut';
    continueButton.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
    });
    optionsContainer.appendChild(continueButton);
}

function showResults() {
    const totalQuestions = quizData.length;
    const resultText = document.createElement("div");
    resultText.id = "result-text";
    
    // Add fade out effect
    dialogText.classList.add('fade-out');
    optionsContainer.classList.add('fade-out');
    
    setTimeout(() => {
        if (correctAnswers > wrongAnswers) {
            resultText.textContent = `Selamat! Anda mendapatkan ${correctAnswers} dari ${totalQuestions} pertanyaan benar!`;
            setTimeout(() => {
                transitionToMinigame("../Damages/index.html");
            }, 3000);
        } else if (wrongAnswers > correctAnswers) {
            resultText.textContent = `Maaf, Anda mendapatkan ${correctAnswers} dari ${totalQuestions} pertanyaan benar.`;
            setTimeout(() => {
                transitionToMinigame("../Damages/index.html");
            }, 3000);
        } else {
            resultText.textContent = `Hasil imbang! Anda mendapatkan ${correctAnswers} dari ${totalQuestions} pertanyaan benar.`;
            setTimeout(() => {
                transitionToMinigame("neutral-ending.html");
            }, 3000);
        }
        
        dialogText.textContent = "";
        optionsContainer.innerHTML = "";
        document.getElementById("dialog-box").appendChild(resultText);
        
        // Add fade in effect for result text
        resultText.classList.add('fade-in');
        
        // Remove fade classes after animation completes
        setTimeout(() => {
            resultText.classList.remove('fade-in');
        }, 500);
    }, 500);
}

// Initialize the quiz
showQuestion();

// Remove the next button since we're using clickable options
nextText.style.display = "none";

showDialog();
