// Dynamic today's date in top bar
(function () {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    document.getElementById('today-date').textContent = `${dd}/${mm}/${yyyy}`;
})();

// Countdown to end of day
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
    function tick() {
        const now = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const diff = Math.max(0, end - now);
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    tick();
    setInterval(tick, 1000);
}

// Carousel
(function () {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('#carouselDots .dot');
    const total = track.children.length;
    let current = 0;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    document.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
    document.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Touch/swipe support
    let startX = 0;
    track.parentElement.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.parentElement.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // Auto-advance every 4s
    setInterval(() => goTo(current + 1), 4000);
})();

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
    });
});
