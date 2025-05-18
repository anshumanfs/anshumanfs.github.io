// Create SVG tractor with theme colors
const tractorSVG = `
<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet">
  <path fill="#276749" d="M28.2 38.6H5.1v6.5l9.1 7.5h33.7v-14z"></path>
  <path d="M52.6 17H29.2l-2.8 21.4H5.1V40h21.1l4.4 6.4h7.1l17.8-7.8L52.6 17m-4.7 19.7V24.3c-5.2 0-2.3 4.5-4.2 7.3c-2.6 3.7-7.4.4-7.4 5h-7.1l1.9-17.8h1.2v1.8c-.5.3-.8.8-.8 1.4v6.3c0 .9.8 1.7 1.7 1.7c.9 0 1.7-.8 1.7-1.7V22c0-.9-.8-1.7-1.7-1.7v-1.5h17.6l1.9 17.8l-4.8.1" fill="#2F855A"></path>
  <g fill="#48BB78">
    <path d="M54 17c0 .7-.2 1-.9 1H28.9c-.7 0-.9-.3-.9-1v-2c0-.7.2-1 .9-1h24.2c.7 0 .9.3.9 1v2"></path>
    <path d="M6.9 33.3L28.2 30v8.4H4.3s1.7-4.1 2.6-5.1"></path>
    <path d="M37.3 45.1c2-4.3 6-7.3 10.7-7.3c4.6 0 8.5 2.8 10.6 7l3.4-1.6c-2.5-5.8-7.8-9.4-14-9.4c-6.3 0-11.6 3.4-14.1 9.4l3.4 1.9"></path>
  </g>
  <circle cx="47.9" cy="49.8" r="12.2" fill="#2F855A"></circle>
  <path d="M54.5 49.8c0 3.6-2.9 6.6-6.6 6.6c-3.6 0-6.6-2.9-6.6-6.6c0-3.6 2.9-6.6 6.6-6.6c3.7 0 6.6 3 6.6 6.6" fill="#48BB78"></path>
  <circle cx="47.9" cy="49.8" r="2.8" fill="#2F855A"></circle>
  <path d="M15.3 43.6c-2.3-1.1-4.8-1.5-7.1-.9c-.7-1.7-2.4-2.9-4.3-2.9V28.4H2v14.1h1.9v-.9c1.1 0 2.1.7 2.5 1.6c-.7.3-1.5.7-2.1 1.2H2v2.9h3l13.6 6.6h2.7c.2-4.5-2-8.4-6-10.3" fill="#48BB78"></path>
  <circle cx="10.4" cy="53.6" r="8.4" fill="#2F855A"></circle>
  <path d="M15.1 53.6c0 2.6-2.1 4.7-4.7 4.7s-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7s4.7 2.1 4.7 4.7" fill="#48BB78"></path>
  <circle cx="10.4" cy="53.6" r="1.9" fill="#2F855A"></circle>
</svg>`;

// Update container styling
document.getElementById('tractor-container').style.alignItems = 'flex-start';
document.getElementById('tractor-container').style.paddingTop = '15vh';
document.getElementById('tractor-container').style.zIndex = '1';
document.getElementById('tractor-container').style.overflow = 'visible';

// Insert SVG into container
document.getElementById('tractor').innerHTML = tractorSVG;

// Calculate screen width plus tractor width for complete exit
const fullTravelDistance = window.innerWidth + 300; // 300px accounts for tractor width

// Modify animation timeline
const timeline = gsap.timeline({
  defaults: { duration: 1 },
  onComplete: () => {
    // Continuous right-to-left animation
    gsap.to("#tractor", {
      x: -fullTravelDistance,  // Move completely off screen to the left
      duration: 10,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set("#tractor", { x: window.innerWidth + 100 }); // Reset from right side
      }
    });

    // Add slight bouncing effect
    gsap.to("#tractor", {
      y: "-=10",
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }
});

// Initial animations
timeline
  .from("#intro-slideshow", { opacity: 0, duration: 0.5 })
  .from("#title-text", { y: -50, opacity: 0, duration: 1 })
  .from(".developers", { x: -50, opacity: 0, duration: 1 })
  .from(".designer", { x: 50, opacity: 0, duration: 1 })
  .from("#tractor", {
    x: window.innerWidth + 100,
    scale: 0.5,
    duration: 1,
    opacity: 0
  });

// Skip intro button handler
document.getElementById('skip-intro').addEventListener('click', () => {
  gsap.to("#intro-slideshow", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.getElementById('intro-slideshow').style.display = 'none';
    }
  });
});

// Auto-hide intro after 5 seconds
setTimeout(() => {
  if (document.getElementById('intro-slideshow').style.display !== 'none') {
    gsap.to("#intro-slideshow", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.getElementById('intro-slideshow').style.display = 'none';
      }
    });
  }
}, 5000);
