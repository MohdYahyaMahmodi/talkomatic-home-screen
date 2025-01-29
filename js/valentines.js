// valentines.js
(function() {
  const container = document.querySelector('.valentines-container');
  
  // Configuration
  const CONFIG = {
      heartColors: [
          '#ff69b4', // hot pink
          '#ff1493', // deep pink
          '#ff0000', // red
          '#ff007f', // rose
          '#e84393', // pretty pink
          '#fd79a8'  // light pink
      ],
      minSpawnTime: 500,    // Time between spawns
      maxSpawnTime: 2000,    // Max spawn time
      minFloatDuration: 15,  // Minimum float duration in seconds
      maxFloatDuration: 20,  // Maximum float duration in seconds
      maxElements: 15,       // Maximum elements on screen
      heartChance: 0.8       // Probability of heart vs rose
  };

  function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
  }

  function createFloatingHeart(x, fromBottom = true) {
      const heart = document.createElement('div');
      heart.classList.add('heart', 'floating-heart');
      
      // Position logic
      heart.style.left = `${x}px`;
      if (fromBottom) {
          heart.style.bottom = '-50px';
      }
      
      const color = CONFIG.heartColors[Math.floor(Math.random() * CONFIG.heartColors.length)];
      const duration = getRandomNumber(CONFIG.minFloatDuration, CONFIG.maxFloatDuration);
      
      heart.style.color = color;
      heart.style.setProperty('--float-duration', `${duration}s`);
      
      container.appendChild(heart);

      setTimeout(() => {
          if (heart && heart.parentNode) {
              heart.parentNode.removeChild(heart);
          }
      }, duration * 1000);

      return heart;
  }

  function createClickHeart(x, y, angle, speed) {
      const heart = document.createElement('div');
      heart.classList.add('heart', 'clicked-heart');
      
      // Calculate explosion direction
      const distance = speed || getRandomNumber(100, 200);
      const explodeX = Math.cos(angle) * distance;
      const explodeY = Math.sin(angle) * distance;
      
      // Position at click point
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      
      // Set explosion direction
      heart.style.setProperty('--explode-x', `${explodeX}px`);
      heart.style.setProperty('--explode-y', `${explodeY}px`);
      
      const color = CONFIG.heartColors[Math.floor(Math.random() * CONFIG.heartColors.length)];
      heart.style.color = color;
      
      container.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
          if (heart && heart.parentNode) {
              heart.parentNode.removeChild(heart);
          }
      }, 1500);
  }

  function createRose() {
      const rose = document.createElement('div');
      rose.classList.add('rose', 'floating');
      rose.textContent = '🌹';
      
      const x = Math.random() * (window.innerWidth - 50);
      const duration = getRandomNumber(CONFIG.minFloatDuration, CONFIG.maxFloatDuration);
      
      rose.style.left = `${x}px`;
      rose.style.bottom = '-50px';
      rose.style.setProperty('--float-duration', `${duration}s`);
      
      container.appendChild(rose);

      setTimeout(() => {
          if (rose && rose.parentNode) {
              rose.parentNode.removeChild(rose);
          }
      }, duration * 1000);
  }

  function spawnBackgroundElement() {
      if (container.children.length >= CONFIG.maxElements) {
          return;
      }

      const x = Math.random() * (window.innerWidth - 50);
      if (Math.random() < CONFIG.heartChance) {
          createFloatingHeart(x, true);
      } else {
          createRose();
      }
  }

  function scheduleNextSpawn() {
      const delay = getRandomNumber(CONFIG.minSpawnTime, CONFIG.maxSpawnTime);
      setTimeout(() => {
          spawnBackgroundElement();
          scheduleNextSpawn();
      }, delay);
  }

  // Start background animation
  scheduleNextSpawn();

  // Click handler with improved explosion effect
  document.addEventListener('click', (event) => {
      const count = 8; // Number of hearts to spawn
      const baseSpeed = 100; // Base explosion speed
      
      for (let i = 0; i < count; i++) {
          setTimeout(() => {
              const angle = (Math.PI * 2 * i) / count + getRandomNumber(-0.2, 0.2);
              const speed = baseSpeed + getRandomNumber(-20, 20);
              
              createClickHeart(
                  event.clientX,
                  event.clientY,
                  angle,
                  speed
              );
          }, i * 30);
      }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
      const elements = container.getElementsByClassName('floating');
      Array.from(elements).forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.left > window.innerWidth || rect.right < 0) {
              element.parentNode.removeChild(element);
          }
      });
  });
})();