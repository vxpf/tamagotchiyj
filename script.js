let hunger = 10;
let energy = 10;
let happiness = 10;
let feedCount = 0;
let playCount = 0;
let sleepCount = 0;

function updateBars() {
    document.getElementById('hunger-bar').style.width = hunger * 10 + '%';
    document.getElementById('hunger-value').textContent = hunger;
    document.getElementById('energy-bar').style.width = energy * 10 + '%';
    document.getElementById('energy-value').textContent = energy;
    document.getElementById('happiness-bar').style.width = happiness * 10 + '%';
    document.getElementById('happiness-value').textContent = happiness;
    checkGameOver();
}

function decreaseBars() {
    if (hunger > 0) hunger = Math.max(hunger - 1, 0);
    if (energy > 0) energy = Math.max(energy - 1, 0);
    if (happiness > 0) happiness = Math.max(happiness - 1, 0);
    updateBars();
    updateChat();
}

function checkGameOver() {
    if (hunger === 0 || energy === 0 || happiness === 0) {
        document.getElementById('game-over').style.display = 'block';
        clearInterval(gameInterval);  
    }
}

function feed() {
    hunger = Math.min(hunger + 1, 10);
    feedCount++;
    if (feedCount === 20) {
        addAchievement('Achievement Unlocked: 20x Feed!');
    }
    document.getElementById('tamagotchi-image').src = 'EatTM.png';
    setTimeout(() => {
        document.getElementById('tamagotchi-image').src = 'StartTM.png';
    }, 3000);
    updateBars();
    updateChat();
}

function play() {
    if (energy > 0) {
        happiness = Math.min(happiness + 1, 10);
        energy = Math.max(energy - 2, 0);
        playCount++;
        if (playCount === 20) {
            addAchievement('Achievement Unlocked: 20x Play!');
        }
        document.getElementById('tamagotchi-image').src = 'PlayTM.png';
        setTimeout(() => {
            document.getElementById('tamagotchi-image').src = 'StartTM.png';
        }, 3000);
        updateBars();
        updateChat();
    }
}

function sleep() {
    energy = Math.min(energy + 2, 10);
    sleepCount++;
    if (sleepCount === 20) {
        addAchievement('Achievement Unlocked: 20x Sleep!');
    }
    document.getElementById('tamagotchi-image').src = 'SleepTM.png';
    setTimeout(() => {
        document.getElementById('tamagotchi-image').src = 'StartTM.png';
    }, 3000);
    updateBars();
    updateChat();
}

function retry() {
    hunger = 10;
    energy = 10;
    happiness = 10;
    updateBars();
    document.getElementById('game-over').style.display = 'none';
    gameInterval = setInterval(decreaseBars, 5000);  
}

function updateChat() {
    const chat = document.getElementById('tamagotchi-chat');
    if (hunger <= 3) {
        chat.textContent = "I'm so hungry! Please feed me!";
    } else if (energy <= 2) {
        chat.textContent = "I'm so tired... I need to sleep!";
    } else if (happiness <= 2) {
        chat.textContent = "I'm feeling lonely... let's play!";
    } else if (hunger <= 3) {
        chat.textContent = "Getting a bit hungry!";
    } else if (energy <= 3) {
        chat.textContent = "Feeling a bit tired...";
    } else if (happiness <= 3) {
        chat.textContent = "Could use some fun!";
    } else {
        chat.textContent = "I'm feeling great! Keep taking care of me!";
    }
}

function addAchievement(achievementText) {
    const achievementList = document.getElementById('achievement-list');
    const newAchievement = document.createElement('li');
    newAchievement.textContent = achievementText;
    achievementList.appendChild(newAchievement);
}

updateBars();
let gameInterval = setInterval(decreaseBars, 5000);

// Check if music is already playing
let audio = document.getElementById('background-music');
if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'background-music';
    audio.loop = true;
    audio.src = 'background-music.mp3';
    document.body.appendChild(audio);
}

// Function to check localStorage for music preference
function checkMusicPreference() {
    const musicPreference = localStorage.getItem('playMusic');
    if (musicPreference === 'yes') {
        audio.play();
    }
}

// Modal logic for the first page (if not already set)
if (localStorage.getItem('musicPromptShown') !== 'true') {
    const musicModal = document.createElement('div');
    musicModal.id = 'music-modal';
    musicModal.className = 'modal';
    musicModal.innerHTML = `
        <div class="modal-content">
            <p>Wil je achtergrondmuziek tijdens het spelen van het spel?</p>
            <button onclick="setMusicPreference('yes')">Yes</button>
            <button onclick="setMusicPreference('no')">No</button>
        </div>
    `;
    document.body.appendChild(musicModal);
    musicModal.style.display = 'block';
}

function setMusicPreference(preference) {
    localStorage.setItem('playMusic', preference);
    localStorage.setItem('musicPromptShown', 'true');
    if (preference === 'yes') {
        audio.play();
    }
    document.getElementById('music-modal').style.display = 'none';
}

// Call the function to check and play music
checkMusicPreference();

const muteButton = document.getElementById('mute-icon');
const musicModal = document.getElementById('music-modal');

// Show the modal on page load
window.onload = () => {
    musicModal.style.display = 'block';
};

function playMusic() {
    audio.play();
    musicModal.style.display = 'none';
}

function closeModal() {
    musicModal.style.display = 'none';
}

function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.src = "unmute-icon.png"; 
    } else {
        audio.muted = true;
        muteButton.src = "volume-mute.png"; 
    }
}

function togglePauseMenu() {
    const pauseMenu = document.getElementById('pause-menu');
    if (pauseMenu.style.display === 'none') {
        pauseMenu.style.display = 'flex';
    } else {
        pauseMenu.style.display = 'none';
    }
}