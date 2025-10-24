// import './style.css'

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  document.body.classList.add('touch-device');
}

const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform += ' scale(0.8)';
    cursorDot.style.transform += ' scale(1.5)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    cursorDot.style.transform = cursorDot.style.transform.replace(' scale(1.5)', '');
  });
}

window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  scrollProgress.style.width = `${(scrolled / scrollable) * 100}%`;
});

gsap.registerPlugin(ScrollTrigger);

const introTimeline = gsap.timeline({
  onComplete: () => {
    gsap.to('.intro-animation', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.querySelector('.intro-animation').style.display = 'none';
      }
    });
  }
});

introTimeline
  .to('.intro-name', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
  .to('.intro-name', {
    backgroundPosition: '200% center',
    duration: 2,
    ease: 'power2.inOut'
  }, '-=0.5')
  .to('.intro-name', {
    scale: 1.2,
    duration: 0.5,
    ease: 'power2.in'
  })
  .to('.intro-name', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.in'
  });

gsap.to('.hero-greeting', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 4,
  ease: 'power3.out'
});

gsap.to('.hero-title-line', {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  delay: 4.3,
  ease: 'power3.out'
});

gsap.to('.hero-tagline', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 4.8,
  ease: 'power3.out'
});

gsap.to('.cta-button', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 5.2,
  ease: 'power3.out'
});

gsap.utils.toArray('.about-line').forEach((line, index) => {
  gsap.to(line, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: line,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});

gsap.utils.toArray('.skill-card').forEach((card, index) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  const progressBar = card.querySelector('.skill-progress');
  const targetWidth = progressBar.getAttribute('data-progress');

  ScrollTrigger.create({
    trigger: card,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(progressBar, {
        width: `${targetWidth}%`,
        duration: 1.5,
        ease: 'power2.out'
      });
    }
  });
});

gsap.utils.toArray('.project-card').forEach((card, index) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    delay: index * 0.1,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

gsap.utils.toArray('.contact-item').forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    x: -50,
    duration: 0.8,
    delay: index * 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

gsap.from('.contact-form', {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact-form',
    start: 'top 85%',
    toggleActions: 'play none none none'
  }
});

gsap.utils.toArray('.social-link').forEach((link, index) => {
  gsap.from(link, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.social-links',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
});

document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector('.submit-button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Sending...';
  submitButton.style.pointerEvents = 'none';

  setTimeout(() => {
    submitButton.textContent = 'Message Sent!';

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.pointerEvents = 'auto';
      e.target.reset();
    }, 2000);
  }, 1500);
});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: 'power3.inOut'
      });
    }
  });
});
