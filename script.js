/* =====================================================
   SAFEBAIT — Interactive Phishing Awareness Platform
   script.js — All interactivity & animations
===================================================== */

// ─── LOADER ───────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => loader.style.display = 'none', 600);
    initAll();
  }, 2200);
});

function initAll() {
  initParticles();
  initNavbar();
  initTyping();
  initScrollAnimations();
  initQuiz();
}

// ─── PARTICLE CANVAS ──────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const NEON = 'rgba(163,255,18,';
  const particles = [];
  const COUNT = Math.floor(W * H / 15000);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.a = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = NEON + this.a + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = NEON + (0.05 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// ─── NAVBAR ──────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ─── TYPING ANIMATION ────────────────────────────────
function initTyping() {
  const el = document.getElementById('typingText');
  const phrases = [
    'Phishing Awareness Training Platform',
    'Learn to Identify Cyber Threats',
    'Your First Line of Digital Defense',
    'Stay Safe. Stay Informed. Stay Vigilant.'
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = phrases[pIdx];
    if (!deleting) {
      el.innerHTML = current.slice(0, ++cIdx) + '<span class="cursor">|</span>';
      if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.innerHTML = current.slice(0, --cIdx) + '<span class="cursor">|</span>';
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 40 : 70);
  }
  type();
}

// ─── SCROLL ANIMATIONS ───────────────────────────────
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// ─── QUIZ ─────────────────────────────────────────────
const QUESTIONS = [
  {
    q: "An email from 'paypa1-support@gmail.com' asks you to verify your account. What do you do?",
    opts: ["Click the link immediately", "Check the sender domain carefully and report it", "Reply with your login details", "Forward it to your friends"],
    ans: 1,
    exp: "The domain 'paypa1' uses a '1' instead of 'l' — a classic typosquatting trick."
  },
  {
    q: "Which of these is a phishing red flag?",
    opts: ["Email from support@yourbank.com", "Message creating urgent fear: 'Act NOW or lose your account!'", "A newsletter you subscribed to", "A password reset you requested"],
    ans: 1,
    exp: "Artificial urgency and threats are hallmark social engineering tactics."
  },
  {
    q: "You receive an SMS saying you won a prize. It asks you to click a link and enter your details. What should you do?",
    opts: ["Click the link and enter details", "Call the number provided", "Delete the message — it's smishing", "Share it on social media"],
    ans: 2,
    exp: "Unsolicited prize messages via SMS are almost always smishing attacks."
  },
  {
    q: "What does MFA (Multi-Factor Authentication) protect against?",
    opts: ["Malware downloads", "Stolen passwords being used to log in", "Spam emails", "Slow internet connections"],
    ans: 1,
    exp: "MFA requires a second factor, so stolen passwords alone can't grant access."
  },
  {
    q: "A person calls claiming to be from IT support and asks for your password to fix an issue. What do you do?",
    opts: ["Give them the password immediately", "Ask for their employee ID and verify through official channels", "Hang up and report the call", "Both B and C are correct"],
    ans: 3,
    exp: "Legitimate IT staff never need your password. Verify and report suspicious calls."
  },
  {
    q: "Which URL is likely a phishing site?",
    opts: ["https://www.amazon.com/orders", "https://amazon-secure-login.xyz/verify", "https://aws.amazon.com", "https://smile.amazon.com"],
    ans: 1,
    exp: "'amazon-secure-login.xyz' is a fake domain designed to look like Amazon."
  },
  {
    q: "What is Spear Phishing?",
    opts: ["Mass emails sent to thousands of random users", "Targeted phishing using personal info about the victim", "Phishing via SMS messages", "Phishing using voice calls"],
    ans: 1,
    exp: "Spear phishing uses personal details (name, job title, manager) to craft convincing attacks."
  },
  {
    q: "You get an email that looks exactly like a previous legitimate email but the link has changed. This is called:",
    opts: ["Vishing", "Smishing", "Clone Phishing", "Whaling"],
    ans: 2,
    exp: "Clone phishing creates a copy of a legitimate email with malicious links substituted."
  },
  {
    q: "Which is the SAFEST action when using public Wi-Fi?",
    opts: ["Log into your bank account", "Use a VPN and avoid sensitive transactions", "Share your Wi-Fi password with others", "Disable your firewall for better speed"],
    ans: 1,
    exp: "A VPN encrypts your traffic on public networks, protecting your data from sniffing."
  },
  {
    q: "An email says your account was accessed from a foreign country and you must reset your password using a link. What do you do?",
    opts: ["Click the link immediately", "Ignore it completely", "Go directly to the official website by typing the URL yourself", "Reply asking for more information"],
    ans: 2,
    exp: "Always navigate to official sites directly. Never click password reset links in suspicious emails."
  }
];

let currentQ = 0, score = 0, answered = [];

function initQuiz() {
  document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
  document.getElementById('retakeQuizBtn').addEventListener('click', retakeQuiz);
}

function startQuiz() {
  currentQ = 0; score = 0; answered = [];
  document.getElementById('quizStart').classList.add('hidden');
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizActive').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;
  document.getElementById('quizProgressFill').style.width = `${(currentQ / total) * 100}%`;
  document.getElementById('questionCounter').textContent = `Question ${currentQ + 1} / ${total}`;
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  document.getElementById('questionNum').textContent = String(currentQ + 1).padStart(2, '0');
  document.getElementById('questionText').textContent = q.q;

  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    grid.appendChild(btn);
  });
}

function selectAnswer(idx, btn) {
  const q = QUESTIONS[currentQ];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);

  if (idx === q.ans) {
    btn.classList.add('correct');
    score++;
    answered.push({ q: currentQ, correct: true });
  } else {
    btn.classList.add('wrong');
    buttons[q.ans].classList.add('correct');
    answered.push({ q: currentQ, correct: false });
  }

  setTimeout(() => {
    currentQ++;
    if (currentQ < QUESTIONS.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  document.getElementById('quizActive').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');

  const pct = (score / QUESTIONS.length) * 100;
  document.getElementById('finalScore').textContent = score;
  document.getElementById('quizProgressFill').style.width = '100%';

  let icon, title, msg;
  if (pct >= 90) {
    icon = '🏆'; title = 'Security Expert!';
    msg = 'Outstanding! You have excellent phishing awareness. Share this training with your team!';
  } else if (pct >= 70) {
    icon = '🛡️'; title = 'Well Protected!';
    msg = 'Great job! You understand most phishing tactics. Review the sections you missed.';
  } else if (pct >= 50) {
    icon = '⚠️'; title = 'Needs Improvement';
    msg = 'You passed, but there\'s room to grow. Review the safety tips and retake the quiz.';
  } else {
    icon = '🎣'; title = 'Phishing Risk Detected!';
    msg = 'Don\'t worry — learning is the first step. Study the training modules and try again!';
  }

  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMessage').textContent = msg;

  const breakdown = document.getElementById('resultBreakdown');
  const correct = answered.filter(a => a.correct).length;
  const wrong = answered.filter(a => !a.correct).length;
  breakdown.innerHTML = `> Correct Answers: ${correct}/${QUESTIONS.length}\n> Wrong Answers: ${wrong}/${QUESTIONS.length}\n> Score: ${pct.toFixed(0)}% | Status: ${pct >= 70 ? 'PASS ✅' : 'FAIL ❌'}`;
}

function retakeQuiz() {
  startQuiz();
}

// ─── PRESENTATION BUTTONS ─────────────────────────────
function viewPresentation() {
  const url = 'assets/presentation/SafeBait-Presentation.pdf';
  window.open(url, '_blank') || alert('Please add your presentation PDF to: assets/presentation/SafeBait-Presentation.pdf');
}

function downloadPresentation() {
  const link = document.createElement('a');
  link.href = 'assets/presentation/SafeBait-Presentation.pdf';
  link.download = 'SafeBait-Phishing-Awareness-Presentation.pdf';
  link.click();
}

// ─── SMOOTH SCROLL for anchor links ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
