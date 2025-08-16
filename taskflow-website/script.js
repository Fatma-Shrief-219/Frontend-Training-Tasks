const mobileBtn = document.getElementById('mobileBtn');
const mobilePanel = document.getElementById('mobilePanel');
mobileBtn.addEventListener('click', () => { mobilePanel.classList.toggle('hidden'); });
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('in-view'); }); }, {threshold: 0.12});
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.getElementById('ctaTop')?.addEventListener('click', () => alert('Free trial started — Prototype'));
document.getElementById('ctaMobile')?.addEventListener('click', () => alert('Free trial started — Prototype'));
document.getElementById('getStartedBtn')?.addEventListener('click', () => alert('Get Started — Sign up flow placeholder'));
