function continueGame() {
    const confirmation = confirm("Are you sure you want to continue? Any unsaved progress will be lost.");
    if (confirmation) {
        window.location.href = './prolog/index.html'; // Replace with the actual continue game URL
    }
}

let isPlaying = false;
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const buttons = document.querySelectorAll('.menu-button');
let currentIndex = 0;
let loadSlotIndex = 0;
const saveSlots = document.querySelectorAll('.save-slot');

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.textContent = "🎵 Music Off";
    } else {
        music.play();
        musicBtn.textContent = "🎵 Music On";
    }
    isPlaying = !isPlaying;
}

function showAbout() {
    document.getElementById('aboutSection').style.display = 'block';
}

function closeAbout() {
    document.getElementById('aboutSection').style.display = 'none';
}

function showLoad() {
    document.getElementById('loadSection').style.display = 'block';
}

function closeLoad() {
    document.getElementById('loadSection').style.display = 'none';
}

function showExtras() {
    document.getElementById('extrasSection').style.display = 'block';
}

function closeExtras() {
    document.getElementById('extrasSection').style.display = 'none';
}

function updateActiveButton(index) {
    buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function updateActiveSaveSlot(index) {
    saveSlots.forEach((slot, i) => {
        if (i === index) {
            slot.classList.add('active');
        } else {
            slot.classList.remove('active');
        }
    });
}

function confirmNewGame() {
    const confirmation = confirm("Are you sure you want to start a new game? All unsaved progress will be lost.");
    if (confirmation) {
        localStorage.clear(); // Hapus semua progress
        window.location.href = './prolog/index.html'; // Replace with the actual new game URL
    }
}

function confirmQuit() {
    const confirmation = confirm("Are you sure you want to quit the game?");
    if (confirmation) {
        window.close(); // This will close the browser tab/window
    }
}

document.addEventListener('keydown', (event) => {
    const loadSection = document.getElementById('loadSection');
    
    if (event.key === 'Escape') {
        if (loadSection.style.display === 'block') {
            closeLoad();
            return;
        }
        closeAbout();
        closeExtras();
        return;
    }
    
    if (loadSection.style.display === 'block') {
        if (event.key === 'ArrowDown') {
            loadSlotIndex = (loadSlotIndex + 1) % saveSlots.length;
            updateActiveSaveSlot(loadSlotIndex);
        } else if (event.key === 'ArrowUp') {
            loadSlotIndex = (loadSlotIndex - 1 + saveSlots.length) % saveSlots.length;
            updateActiveSaveSlot(loadSlotIndex);
        } else if (event.key === 'Enter') {
            saveSlots[loadSlotIndex].click();
        }
    } else {
        if (event.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % buttons.length;
            updateActiveButton(currentIndex);
        } else if (event.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            updateActiveButton(currentIndex);
        } else if (event.key === 'Enter') {
            buttons[currentIndex].click();
        }
    }
});

updateActiveButton(currentIndex);

