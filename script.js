// Dynamic today's date in top bar
(function () {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    document.getElementById('today-date').textContent = `${dd}/${mm}/${yyyy}`;
})();

// Countdown to end of day
function tick() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const diff = Math.max(0, end - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown').textContent =
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
tick();
setInterval(tick, 1000);

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
    });
});
