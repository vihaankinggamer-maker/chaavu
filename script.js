// ===== SONGS PLAYLIST =====
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

// Page 1 Buttons
document.addEventListener('DOMContentLoaded', function() {
    // ===== PAGE 1: NO BUTTON ESCAPE LOGIC =====
    const noBtn1 = document.getElementById('noBtn1');
    
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
            noBtn1.style.left = constrainedX +