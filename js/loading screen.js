    // Loading screen
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1500);
    });