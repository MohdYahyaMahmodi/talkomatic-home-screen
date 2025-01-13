// fireworks.js
(function() {
  const container = document.querySelector('.fireworks');
  // How often to create a new firework (ms)
  const LAUNCH_INTERVAL_MIN = 500;
  const LAUNCH_INTERVAL_MAX = 1500;

  // How many sparks in each firework (try 30 for fuller look)
  const SPARK_COUNT = 30;
  // Possible spark colors
  const COLORS = [
    '#ff0000', '#ff7f00', '#ffff00', '#7fff00',
    '#00ff00', '#00ff7f', '#00ffff', '#007fff',
    '#0000ff', '#7f00ff', '#ff00ff', '#ff007f'
  ];

  function launchFirework() {
    // 1) Create a firework container
    const firework = document.createElement('div');
    firework.classList.add('firework');

    // 2) Random position within the viewport
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7; 
    // *0.7 so it’s not too close to the bottom

    firework.style.left = x + 'px';
    firework.style.top = y + 'px';

    // 3) Create sparks
    for (let i = 0; i < SPARK_COUNT; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      // Random color from the COLORS array
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      spark.style.backgroundColor = COLORS[colorIndex];
      
      // Random angle & distance for each spark
      const angle = Math.random() * 2 * Math.PI; // from 0 to 2π
      // Let’s expand the distance range to make the explosion bigger
      const distance = 80 + Math.random() * 120; // from 80px to 200px
      const sparkX = Math.cos(angle) * distance;
      const sparkY = Math.sin(angle) * distance;

      // Using CSS variables to pass the offset
      spark.style.setProperty('--sparkX', sparkX + 'px');
      spark.style.setProperty('--sparkY', sparkY + 'px');

      firework.appendChild(spark);
    }

    container.appendChild(firework);

    // 4) Remove the firework from DOM after animation completes
    //    We can wait a bit longer than sparkFly (1.5s) to be safe
    setTimeout(() => {
      if (firework && firework.parentNode) {
        firework.parentNode.removeChild(firework);
      }
    }, 2500);
  }

  function scheduleNextFirework() {
    // Random delay between intervals
    const delay =
      Math.random() * (LAUNCH_INTERVAL_MAX - LAUNCH_INTERVAL_MIN) +
      LAUNCH_INTERVAL_MIN;
    setTimeout(() => {
      launchFirework();
      scheduleNextFirework();
    }, delay);
  }

  // Start the chain
  scheduleNextFirework();
})();
