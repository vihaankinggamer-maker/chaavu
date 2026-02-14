// ===== SONGS PLAYLIST (16 Songs) =====
const songs = [
    { name: 'Terenaina', file: 'terenaina.mp3' },
    { name: 'Merenishaan', file: 'merenishaan.mp3' },
    { name: 'Line Without A Hook', file: 'linewithoutahook.mp3' },
    { name: 'Breathe', file: 'breathe.mp3' },
    { name: 'Ikkudi', file: 'ikkudi.mp3' },
    { name: 'Teri Jhukin Nazar', file: 'terijhukinazar.mp3' },
    { name: 'With You', file: 'withyou.mp3' },
    { name: 'Peeloon', file: 'peeloon.mp3' },
    { name: 'Dekha Hi Nahi', file: 'dekhahinahi.mp3' },
    { name: 'Dooron Dooron', file: 'doorondooron.mp3' },
    { name: 'Bargad', file: 'bargad.mp3' },
    { name: 'Naam Tera', file: 'naamtera.mp3' },
    { name: 'Kithe Reh Gaya', file: 'kitheregaya.mp3' },
    { name: 'Tum Mere Hirahenge Hum', file: 'tumarehirahengehum.mp3' },
    { name: 'Kaise Piyase', file: 'kaisepiyase.mp3' },
    { name: 'Abhi Kuch Din Se', file: 'abhikuchdinnose.mp3' }
];

let currentSongIndex = 0;
let isPlaying = false;

// ===== PAGE NAVIGATION =====
function goToPage(pageNum) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(`page${pageNum}`).classList.add('active');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // ===== PAGE 1: NO BUTTON ESCAPE LOGIC =====
    const noBtn1 = document.getElementById('noBtn1');
    
    if (noBtn1) {
        noBtn1.disabled = true;
        noBtn1.style.pointerEvents = 'none';
        noBtn1.style.cursor = 'not-allowed';
        noBtn1.style.opacity = '0.6';
        
        let escapeActive = true;
        
        document.addEventListener('mousemove', function(event) {
            if (!escapeActive) return;
            
            if (!document.getElementById('page1').classList.contains('active')) {
                escapeActive = false;
                return;
            }
            
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const buttonRect = noBtn1.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - buttonCenterX, 2) + 
                Math.pow(mouseY - buttonCenterY, 2)
            );
            
            if (distance < 150) {
                const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX);
                const moveDistance = 100 + Math.random() * 100;
                
                const newX = buttonCenterX + Math.cos(angle) * moveDistance;
                const newY = buttonCenterY + Math.sin(angle) * moveDistance;
                
                const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
                const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));
                
                noBtn1.style.position = 'fixed';
                noBtn1.style.left = constrainedX + 'px';
                noBtn1.style.top = constrainedY + 'px';
                noBtn1.style.transition = 'all 0.3s ease-out';
                noBtn1.style.transform = 'scale(0.95) rotate(' + (Math.random() * 10 - 5) + 'deg)';
                
                showEscapeMessage();
            }
        });
        
        document.addEventListener('touchmove', function(event) {
            if (!escapeActive) return;
            if (!document.getElementById('page1').classList.contains('active')) return;
            
            const touch = event.touches[0];
            const mouseX = touch.clientX;
            const mouseY = touch.clientY;
            const buttonRect = noBtn1.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - buttonCenterX, 2) + 
                Math.pow(mouseY - buttonCenterY, 2)
            );
            
            if (distance < 150) {
                const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX);
                const moveDistance = 100 + Math.random() * 100;
                
                const newX = buttonCenterX + Math.cos(angle) * moveDistance;
                const newY = buttonCenterY + Math.sin(angle) * moveDistance;
                
                const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
                const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));
                
                noBtn1.style.position = 'fixed';
                noBtn1.style.left = constrainedX + 'px';
                noBtn1.style.top = constrainedY + 'px';
                noBtn1.style.transition = 'all 0.3s ease-out';
            }
        });
    }
    
    // ===== PAGE 1 YES BUTTON =====
    const yesBtn1 = document.getElementById('yesBtn1');
    if (yesBtn1) {
        yesBtn1.addEventListener('click', function(e) {
            e.preventDefault();
            escapeActive = false;
            showCuteReaction();
            setTimeout(() => goToPage(2), 1500);
        });
    }
    
    // ===== PAGE 2 YES BUTTON =====
    const yesBtn2 = document.getElementById('yesBtn2');
    if (yesBtn2) {
        yesBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            showCuteReaction();
            setTimeout(() => goToPage(3), 1500);
        });
    }
    
    // ===== PAGE 2 NO BUTTON =====
    const noBtn2 = document.getElementById('noBtn2');
    if (noBtn2) {
        noBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            goToPage(1);
        });
    }
    
    // ===== VOLUME CONTROL =====
    const volumeSlider = document.getElementById('volumeSlider');
    const audioPlayer = document.getElementById('audioPlayer');
    if (volumeSlider && audioPlayer) {
        volumeSlider.addEventListener('input', function() {
            audioPlayer.volume = this.value / 100;
        });
    }
    
    // ===== MUSIC CONTROLS =====
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (playBtn) {
        playBtn.addEventListener('click', toggleMusic);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSong);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
    }
    
    // ===== UPDATE PROGRESS BAR =====
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
    }
    
    // Initialize music player
    initializeMusic();
    displaySongList();
});

// ===== ESCAPE MESSAGE =====
let escapeMessageTimeout;
function showEscapeMessage() {
    if (escapeMessageTimeout) {
        clearTimeout(escapeMessageTimeout);
    }
    
    const oldMessage = document.querySelector('.escape-message');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    const messages = [
        "You can't click me! 😄",
        "Try harder! 😜",
        "I'm too fast! 🏃",
        "You'll have to say YES! 💕",
        "I'm running away! 🏃‍♀️",
        "Not today! 😊",
        "Nice try! 🤣",
        "Say YES instead! 💖",
        "Can't catch me! ✨",
        "Come on, say YES! 🥰"
    ];
    
    const message = document.createElement('div');
    message.className = 'escape-message';
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    message.style.position = 'fixed';
    message.style.left = Math.random() * window.innerWidth + 'px';
    message.style.top = Math.random() * window.innerHeight + 'px';
    message.style.fontSize = '1.2rem';
    message.style.color = '#ff1493';
    message.style.fontWeight = 'bold';
    message.style.pointerEvents = 'none';
    message.style.zIndex = '999';
    message.style.animation = 'messageFloat 2s ease-out forwards';
    message.style.textShadow = '2px 2px 4px rgba(255,255,255,0.8)';
    
    document.body.appendChild(message);
    
    escapeMessageTimeout = setTimeout(() => {
        message.remove();
    }, 2000);
}

// ===== CUTE REACTIONS =====
function showCuteReaction() {
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '✨'];
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = Math.random() * window.innerHeight + 'px';
        emoji.style.fontSize = '2rem';
        emoji.style.animation = 'floatUp 2s ease-out forwards';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '999';
        document.body.appendChild(emoji);

        setTimeout(() => emoji.remove(), 2000);
    }

    createConfetti();
}

function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ffe4e1'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        confetti.style.animation = `floatDown ${2 + Math.random() * 1}s ease-in forwards`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ===== SECTION MANAGEMENT =====
function openSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        document.querySelector('.close-section-btn').classList.add('show');

        if (sectionId === 'camera') {
            startCamera();
        } else if (sectionId === 'music') {
            initializeMusic();
        }
    }
}

function closeSection() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('hidden'));
    document.querySelector('.close-section-btn').classList.remove('show');
}

function closeAllSections() {
    closeSection();
}

// ===== CAMERA FUNCTIONALITY =====
let cameraStream = null;

function startCamera() {
    const video = document.getElementById('cameraVideo');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                cameraStream = stream;
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.log("Camera access denied");
                alert("Please enable camera access! 📷");
            });
    }
}

function openPhotoBooth() {
    document.getElementById('photoBooth').classList.remove('hidden');
    startCamera();
}

function closPhotoBooth() {
    document.getElementById('photoBooth').classList.add('hidden');
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('photoCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);
    addCuteStickers(ctx, canvas);

    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ff1493';
    ctx.textAlign = 'center';
    ctx.fillText('The Cutest Baby in the World! 💕', canvas.width / 2, 40);

    video.style.display = 'none';
    canvas.style.display = 'block';
}

function addCuteStickers(ctx, canvas) {
    const stickers = ['❤️', '💕', '✨', '🌹', '💖'];
    const positions = [
        { x: 50, y: 50 },
        { x: canvas.width - 50, y: 50 },
        { x: 50, y: canvas.height - 50 },
        { x: canvas.width - 50, y: canvas.height - 50 },
        { x: canvas.width / 2, y: canvas.height / 2 }
    ];

    ctx.font = '40px Arial';
    positions.forEach((pos, i) => {
        ctx.fillText(stickers[i % stickers.length], pos.x, pos.y);
    });
}

function downloadPhoto() {
    const canvas = document.getElementById('photoCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'valentine-photo-for-chaavu.png';
    link.click();
}

// ===== GAMES =====

// Love Quiz
function startLoveQuiz() {
    document.getElementById('loveQuizGame').classList.remove('hidden');
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '<p>Coming Soon! 💕</p>';
}

function closeLoveQuiz() {
    document.getElementById('loveQuizGame').classList.add('hidden');
}

// Heart Match Game
function startHeartMatch() {
    document.getElementById('heartMatchGame').classList.remove('hidden');
    const gameBoard = document.querySelector('.match-game');
    gameBoard.innerHTML = '';

    const hearts = ['❤️', '💕', '💖', '💗', '💝', '✨', '🌹', '💘'];
    const gameHearts = [...hearts, ...hearts];

    for (let i = gameHearts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameHearts[i], gameHearts[j]] = [gameHearts[j], gameHearts[i]];
    }

    gameHearts.forEach((heart, index) => {
        const card = document.createElement('div');
        card.textContent = '❓';
        card.dataset.heart = heart;
        card.onclick = () => revealHeart(card, gameBoard);
        gameBoard.appendChild(card);
    });
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function revealHeart(card, gameBoard) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.textContent = card.dataset.heart;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.heart === secondCard.dataset.heart) {
        setTimeout(() => {
            firstCard.style.opacity = '0.5';
            secondCard.style.opacity = '0.5';
            lockBoard = false;
            firstCard = null;
            secondCard = null;

            if (document.querySelectorAll('.match-game div:not([style*="opacity: 0.5"])').length === 0) {
                alert('🎉 You found all hearts! You\'re amazing! 💕');
                closeHeartMatch();
            }
        }, 600);
    } else {
        setTimeout(() => {
            firstCard.textContent = '❓';
            secondCard.textContent = '❓';
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }, 600);
    }
}

function closeHeartMatch() {
    document.getElementById('heartMatchGame').classList.add('hidden');
    firstCard = null;
    secondCard = null;
}

// Heart Clicker Game
function startHeartClicker() {
    document.getElementById('heartClickerGame').classList.remove('hidden');
    let score = 0;
    document.getElementById('clickerScore').textContent = '0';

    const board = document.querySelector('.clicker-board');
    board.innerHTML = '';

    for (let i = 0; i < 16; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.onclick = () => {
            score++;
            document.getElementById('clickerScore').textContent = score;
            heart.style.background = 'linear-gradient(135deg, #ffc0cb, #ffb6c1)';
            setTimeout(() => {
                heart.style.background = 'linear-gradient(135deg, #ff1493, #ff69b4)';
            }, 200);
        };
        board.appendChild(heart);
    }
}

function closeHeartClicker() {
    document.getElementById('heartClickerGame').classList.add('hidden');
}

// Memory Game
let memoryCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    document.getElementById('memoryGame').classList.remove('hidden');
    const board = document.querySelector('.memory-board');
    board.innerHTML = '';
    memoryCards = [];
    matchedPairs = 0;
    document.getElementById('moves').textContent = '0';

    const symbols = ['❤️', '💕', '💖', '💗', '💝', '✨', '🌹', '💘'];
    const gameSymbols = [...symbols, ...symbols];

    for (let i = gameSymbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameSymbols[i], gameSymbols[j]] = [gameSymbols[j], gameSymbols[i]];
    }

    gameSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.textContent = '🎀';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.onclick = () => flipMemoryCard(card);
        board.appendChild(card);
        memoryCards.push(card);
    });
}

let flippedCards = [];

function flipMemoryCard(card) {
    if (card.dataset.flipped === 'true' || flippedCards.length >= 2) return;

    card.textContent = card.dataset.symbol;
    card.dataset.flipped = 'true';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        document.getElementById('moves').textContent = parseInt(document.getElementById('moves').textContent) + 1;

        if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === 8) {
                setTimeout(() => {
                    alert('🎉 You completed the memory game! 💕');
                    closeMemoryGame();
                }, 500);
            }
        } else {
            setTimeout(() => {
                flippedCards[0].textContent = '🎀';
                flippedCards[1].textContent = '🎀';
                flippedCards[0].dataset.flipped = 'false';
                flippedCards[1].dataset.flipped = 'false';
                flippedCards = [];
            }, 1000);
        }
    }
}

function closeMemoryGame() {
    document.getElementById('memoryGame').classList.add('hidden');
    flippedCards = [];
    matchedPairs = 0;
}

// Love Puzzle
function startLovePuzzle() {
    document.getElementById('lovePuzzleGame').classList.remove('hidden');
    const board = document.querySelector('.puzzle-board');
    board.innerHTML = '<p style="color: #ff1493; font-size: 1.2rem; font-weight: bold;">Coming Soon! 💕</p>';
}

function closeLovePuzzle() {
    document.getElementById('lovePuzzleGame').classList.add('hidden');
}

// ===== MUSIC PLAYER =====
function initializeMusic() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.volume = 0.7;
        if (songs.length > 0) {
            audioPlayer.src = songs[0].file;
            updateSongDisplay();
        }
    }
}

function updateSongDisplay() {
    const currentSongDisplay = document.getElementById('currentSongTitle');
    if (currentSongDisplay && songs[currentSongIndex]) {
        currentSongDisplay.textContent = songs[currentSongIndex].name;
    }
}

function displaySongList() {
    const songList = document.getElementById('songListDisplay');
    if (songList) {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const item = document.createElement('p');
            item.className = 'song-item';
            if (index === currentSongIndex) {
                item.classList.add('active');
            }
            item.textContent = `🎵 ${song.name}`;
            item.onclick = () => playSong(index);
            songList.appendChild(item);
        });
    }
}

function playSong(index) {
    currentSongIndex = index;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songs[index].file;
    audioPlayer.play();
    document.getElementById('playBtn').textContent = '⏸️';
    isPlaying = true;
    updateSongDisplay();
    displaySongList();
}

function toggleMusic() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');

    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = '▶️';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playBtn.textContent = '⏸️';
        isPlaying = true;
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function updateProgress() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    
    if (audioPlayer.duration) {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percentage + '%';
        
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function updateDuration() {
    const audioPlayer = document.getElementById('audioPlayer');
    const duration = document.getElementById('duration');
    
    const minutes = Math.floor(audioPlayer.duration / 60);
    const seconds = Math.floor(audioPlayer.duration % 60);
    duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// ===== MOUSE TRAIL =====
document.addEventListener('mousemove', function(event) {
    if (Math.random() > 0.98) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = event.clientX + 'px';
        heart.style.top = event.clientY + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp 1s ease-out forwards';
        heart.style.zIndex = '999';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', function() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
});

console.log('🎉 Valentine Website Loaded! 💕');
