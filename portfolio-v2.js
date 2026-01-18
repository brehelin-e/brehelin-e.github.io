/* =================================================================
   PORTFOLIO V2 - JAVASCRIPT (Connecté à l'API Gemini via /api/chat)
   Animations, particules, navigation, modales
   ================================================================= */

// ===============================================
// 1. INITIALISATION AOS (Animations on Scroll)
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  // Init AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100
    });
  }

  // Init toutes les fonctionnalités
  initParticles();
  initNavigation();
  initModals();
  initTypewriter();
  initScrollIndicator();
  initMobileMenu();
});

// ===============================================
// 2. MENU BURGER MOBILE
// ===============================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  // Sélecteur corrigé pour s'assurer que les liens dans le tiroir mobile ferment le menu
  const navLinks = document.querySelectorAll('.mobile-drawer .nav-item');

  if (!menuBtn || !drawer || !overlay) return;

  // Toggle menu
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    drawer.classList.toggle('open');
    overlay.classList.toggle('show');
    // Gérer le focus pour l'accessibilité
    if (drawer.classList.contains('open')) {
      drawer.focus();
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  });

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Ferme le menu après le clic
      menuBtn.classList.remove('active');
      drawer.classList.remove('open');
      overlay.classList.remove('show');
    });
  });
}

// ===============================================
// 3. SYSTÈME DE PARTICULES ANIMÉES (CANVAS)
// ===============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Redimensionner le canvas
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Classe Particle
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

      // Rebond sur les bords
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

  // Créer particules
  function createParticles() {
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Lignes de connexion
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    animationId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  // Cleanup
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

// ===============================================
// 3. NAVIGATION ACTIVE & SMOOTH SCROLL
// ===============================================
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section, .hero');

  // Smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      
      if (href && href.startsWith('#') && !href.includes('-modal')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          // Correction pour mieux gérer le smooth scroll sur mobile sans sidebar
          const headerOffset = 80; 
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
        }
      }
    });
  });

  // Highlighter section active
  function highlightActiveSection() {
    let currentSection = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      // Utilisation d'un offset plus grand pour le highlight
      if (scrollY >= sectionTop - 300) { 
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      // Pour la navigation desktop/sidebar 
      if (!item.closest('.mobile-drawer')) { 
          item.classList.remove('active');
          const href = item.getAttribute('href');
          if (href === `#${currentSection}`) {
            item.classList.add('active');
          }
      }
      // Pour la navigation mobile (si elle est affichée)
      const mobileNavItem = document.querySelector(`.mobile-drawer a[href="#${currentSection}"]`);
      if (mobileNavItem) {
          // Retire active de tous les liens mobiles, puis l'ajoute au bon
          document.querySelectorAll('.mobile-drawer .nav-item').forEach(li => li.classList.remove('active'));
          mobileNavItem.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Init
}

// ===============================================
// 4. GESTION DES MODALES
// ===============================================
function initModals() {
  const modals = document.querySelectorAll('.modal');

  // Ouvrir modale
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[href^="#"][href*="-modal"], [href^="#projet-"]');
    if (!trigger) return;

    e.preventDefault();
    const modalId = trigger.getAttribute('href').substring(1);
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      window.location.hash = modalId;
    }
  });

  // Fermer modales
  modals.forEach(modal => {
    // Bouton close
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    // Click backdrop
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => closeModal(modal));
    }
  });

  // Touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'flex') {
          closeModal(modal);
        }
      });
    }
  });

  // Fonction fermeture
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname);
    }
  }

  // Ouvrir modale depuis hash URL
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const modal = document.getElementById(hash);
    if (modal && modal.classList.contains('modal')) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  // Exposer fonction globalement
  window.closeModal = (modalId) => {
    const modal = typeof modalId === 'string' 
      ? document.getElementById(modalId) 
      : modalId;
    if (modal) closeModal(modal);
  };
}

// ===============================================
// 5. EFFET TYPEWRITER
// ===============================================
function initTypewriter() {
  const element = document.querySelector('.typing-text');
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '3px solid var(--accent)';

  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    } else {
      // Animation du curseur une fois le texte terminé
      setInterval(() => {
        element.style.borderRightColor = 
          element.style.borderRightColor === 'transparent' 
            ? 'var(--accent)' 
            : 'transparent';
      }, 500);
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
    if (window.scrollY > 100) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'auto';
    }
  });
}

// ===============================================
// 7. ANIMATIONS BARRES DE COMPÉTENCES
// ===============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        fill.style.width = fill.style.getPropertyValue('--width') || '0%';
      });
    }
  });
}, { threshold: 0.3 });

// Observer la section compétences
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  observer.observe(skillsSection);
}

// ===============================================
// 8. SMOOTH SCROLL POUR TOUS LES LIENS ANCRES
// ===============================================
document.querySelectorAll('a[href^="#"]:not([href*="-modal"]):not([href*="projet-"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;

    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      });
    }
  });
});

// ===============================================
// 9. FORMULAIRE DE CONTACT
// ===============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Le formulaire utilise FormSubmit, pas besoin de preventDefault
    console.log('Formulaire envoyé avec succès !');
  });
}

// ===============================================
// 10. PERFORMANCE - Lazy loading images
// ===============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===============================================
// 11. CONSOLE MESSAGE
// ===============================================
console.log('%c🚀 Portfolio Ewen Bréhélin V2', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé avec passion ❤️', 'color: #8b5cf6; font-size: 14px;');
console.log('%cContact: brehelin-e@saint-louis29.net', 'color: #06b6d4; font-size: 12px;');

// ===============================================
// 12. CHATBOT IA (Version connectée à l'API Gemini)
// ===============================================

// Base de connaissances statique servant de FALLBACK si l'API échoue
const knowledge = {
    'fallback': 'Je ne suis pas sûr de comprendre. Veuillez reformuler votre question ou essayer l\'une des suggestions ci-dessus !',
};

// Fonction pour appeler le proxy Serverless (/api/chat)
async function getApiResponse(question) {
    try {
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            console.error(`Erreur du proxy Serverless: ${response.status}`);
            return knowledge.fallback;
        }

        const data = await response.json();
        return data.answer || knowledge.fallback;

    } catch (error) {
        console.error("Erreur réseau ou Fetch:", error);
        return 'Erreur réseau. Je ne peux pas contacter l\'IA. Veuillez réessayer.';
    }
}

// Fonction utilitaire pour ajouter des messages
function addMessage(text, isBot = true) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = document.createElement('div');
    message.className = `chat-message ${isBot ? 'bot' : 'user'}`;
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fonction utilitaire pour l'indicateur de frappe
function showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fonction utilitaire pour masquer l'indicateur de frappe
function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Fonction principale pour envoyer le message (maintenant async pour l'API)
async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const question = input.value.trim();
    if (!question) return;

    // 1. Afficher la question de l'utilisateur
    addMessage(question, false);
    input.value = '';

    // 2. Afficher l'indicateur de frappe
    showTyping();
    
    // 3. Appel asynchrone à l'API
    const responseText = await getApiResponse(question); 

    // 4. Masquer l'indicateur et afficher la réponse
    hideTyping();
    addMessage(responseText, true);
}


function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const suggestions = document.querySelectorAll('.suggestion-chip');

    if (!toggle || !window) return;

    // Événements d'ouverture/fermeture
    toggle.addEventListener('click', () => {
        window.classList.toggle('open');
    });

    close.addEventListener('click', () => {
        window.classList.remove('open');
    });

    // Event listeners pour l'envoi de message
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Suggestions cliquables
    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.dataset.question;
            input.value = question;
            sendMessage(); 
        });
    });
}

// Initialiser le chatbot au chargement du DOM
document.addEventListener('DOMContentLoaded', initChatbot);