/* =================================================================
   PORTFOLIO V2 - JAVASCRIPT (Connecté à Cloudflare Workers)
   Animations, particules, navigation, modales & IA Gemini
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Init AOS (Animations on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100
    });
  }

  // Initialisation de toutes les fonctionnalités
  initParticles();
  initNavigation();
  initModals();
  initTypewriter();
  initScrollIndicator();
  initMobileMenu();
  initChatbot(); // Initialise le chatbot au chargement
});

// ===============================================
// 1. MENU BURGER MOBILE
// ===============================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.mobile-drawer .nav-item');

  if (!menuBtn || !drawer || !overlay) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    drawer.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      drawer.classList.remove('open');
      overlay.classList.remove('show');
    });
  });
}

// ===============================================
// 2. SYSTÈME DE PARTICULES (CANVAS)
// ===============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

// ===============================================
// 3. NAVIGATION & SMOOTH SCROLL
// ===============================================
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section, .hero');

  function highlightActiveSection() {
    let currentSection = '';
    const scrollY = window.scrollY;
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 300) {
        currentSection = section.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) item.classList.add('active');
    });
  }

  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection();
}

// ===============================================
// 4. GESTION DES MODALES
// ===============================================
function initModals() {
  const modals = document.querySelectorAll('.modal');
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[href^="#"][href*="-modal"], [href^="#projet-"]');
    if (!trigger) return;
    e.preventDefault();
    const modal = document.getElementById(trigger.getAttribute('href').substring(1));
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const close = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
  });
}

// ===============================================
// 5. EFFET TYPEWRITER
// ===============================================
function initTypewriter() {
  const element = document.querySelector('.typing-text');
  if (!element) return;
  const text = element.textContent;
  element.textContent = '';
  let index = 0;
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  setTimeout(type, 500);
}

// ===============================================
// 6. SCROLL INDICATOR
// ===============================================
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
  });
}

// ... (garder le début du fichier pour les animations et particules)

// ===============================================
// 7. CHATBOT IA (Connecté à Cloudflare Workers)
// ===============================================



const knowledge = {
    'fallback': 'Je ne suis pas sûr de comprendre. Veuillez reformuler votre question ou essayer l\'une des suggestions ci-dessus !',
};

async function getApiResponse(question) {
    try {
        // Remplacez par VOTRE URL Cloudflare exacte
        const CLOUDFLARE_WORKER_URL = 'https://gemini-chat.brehelin-e.workers.dev'; 

        const response = await fetch(CLOUDFLARE_WORKER_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }), 
        });

        if (!response.ok) {
            console.error(`Erreur Worker: ${response.status}`);
            return "Désolé, j'ai un souci technique. Réessayez plus tard.";
        }

        const data = await response.json();
        return data.answer || "Je n'ai pas pu obtenir de réponse.";

    } catch (error) {
        console.error("Erreur de connexion au Worker:", error);
        return 'Erreur réseau. Impossible de contacter mon IA.';
    }
}
// ... gardez le reste de vos fonctions addMessage(), sendMessage(), etc.

function addMessage(text, isBot = true) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = document.createElement('div');
    message.className = `chat-message ${isBot ? 'bot' : 'user'}`;
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, false);
    input.value = '';
    showTyping();
    
    const responseText = await getApiResponse(question); 

    hideTyping();
    addMessage(responseText, true);
}

function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const suggestions = document.querySelectorAll('.suggestion-chip');

    if (!toggle || !chatWindow) return;

    toggle.addEventListener('click', () => chatWindow.classList.toggle('open'));
    close.addEventListener('click', () => chatWindow.classList.remove('open'));
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            input.value = chip.dataset.question;
            sendMessage(); 
        });
    });
}

console.log('%c🚀 Portfolio Ewen Bréhélin V2 - IA Active', 'color: #6366f1; font-size: 20px; font-weight: bold;');