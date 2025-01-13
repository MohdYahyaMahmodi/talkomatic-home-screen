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

  /**
   * Launches a firework at the specified x,y coordinates.
   * If x,y are omitted or null, we choose random coordinates.
   */
  function launchFirework(x = null, y = null) {
    const firework = document.createElement('div');
    firework.classList.add('firework');

    // If no coordinates are provided, pick random ones
    if (x === null || y === null) {
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight * 0.7;
    }

    firework.style.left = x + 'px';
    firework.style.top = y + 'px';

    // Create SPARK_COUNT sparks
    for (let i = 0; i < SPARK_COUNT; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      // Random color from the COLORS array
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      spark.style.backgroundColor = COLORS[colorIndex];

      // Random angle & distance
      const angle = Math.random() * 2 * Math.PI; // 0 to 2π
      const distance = 80 + Math.random() * 120; // 80px to 200px
      const sparkX = Math.cos(angle) * distance;
      const sparkY = Math.sin(angle) * distance;

      // Use CSS variables for the offset
      spark.style.setProperty('--sparkX', sparkX + 'px');
      spark.style.setProperty('--sparkY', sparkY + 'px');

      firework.appendChild(spark);
    }

    container.appendChild(firework);

    // Remove the firework from the DOM after ~2.5s
    setTimeout(() => {
      if (firework && firework.parentNode) {
        firework.parentNode.removeChild(firework);
      }
    }, 2500);
  }

  /**
   * Randomly spawns fireworks on an interval.
   */
  function scheduleRandomFirework() {
    const delay = Math.random() * (LAUNCH_INTERVAL_MAX - LAUNCH_INTERVAL_MIN) + LAUNCH_INTERVAL_MIN;
    setTimeout(() => {
      launchFirework(); // No coords => random
      scheduleNextFirework();
    }, delay);
  }

  /**
   * Helper function to keep chaining random fireworks.
   */
  function scheduleNextFirework() {
    scheduleRandomFirework();
  }

  // (1) Start the chain of random fireworks
  scheduleNextFirework();

  // (2) Spawn a firework wherever you click
  document.addEventListener('click', (event) => {
    launchFirework(event.clientX, event.clientY);
  });
})();
