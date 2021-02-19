(function (anime) {
  const cubeAnimation = (element) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0xa3cfbb,
      wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    scene.add(cube);
    camera.position.z = 1.5;
    renderer.setSize(element.offsetHeight, element.offsetHeight);
    element.appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', (event) => {
      renderer.setSize(element.offsetHeight, element.offsetHeight);
    });
  };

  const intersectionObserverFactory = (callback) => {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0) return;
        observer.unobserve(entry.target);
        callback(entry.target);
      });
    });
  };

  const animeDefaults = {
    translateX: 0,
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 500
  };

  const movingLettersEffect12 = (element) => {
    anime({
      ...animeDefaults,
      targets: element.querySelectorAll('.letter'),
      translateX: [40, 0],
      delay: (el, i) => 500 + 30 * i
    });
  };

  const slideUp = (element) => {
    anime({
      ...animeDefaults,
      targets: element,
      translateY: [40, 0],
      delay: (el, i) => 500 + 30 * i
    });
  };

  const slideLeft = (element) => {
    anime({
      ...animeDefaults,
      targets: element,
      translateX: [100, 0],
      duration: 2400
    });
  };

  const slideRight = (element) => {
    anime({
      ...animeDefaults,
      targets: element,
      translateX: [-100, 0],
      duration: 2400
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.animation-module--cube')) {
      cubeAnimation(document.querySelector('.animation-module--cube'));
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module .module__kicker')) {
      const projectModuleKickerElements = document.querySelectorAll('.project-module .module__kicker');
      const projectModuleKickerObserver = intersectionObserverFactory(movingLettersEffect12);

      projectModuleKickerElements.forEach((element) => {
        element.innerHTML = element.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        const letters = element.querySelectorAll('.letter');
        letters.forEach((item) => item.style.opacity = 0);
        projectModuleKickerObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module .module__heading')) {
      const projectModuleHeadingElements = document.querySelectorAll('.project-module .module__heading');
      const projectModuleHeadingObserver = intersectionObserverFactory(slideUp);

      projectModuleHeadingElements.forEach((element) => {
        element.style.opacity = 0;
        projectModuleHeadingObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module__services')) {
      const projectModuleServicesElements = document.querySelectorAll('.project-module__services');
      const projectModuleServicesObserver = intersectionObserverFactory((element) => slideUp(element.querySelectorAll('li')));

      projectModuleServicesElements.forEach((element) => {
        const items = element.querySelectorAll('li');
        items.forEach((item) => item.style.opacity = 0);
        projectModuleServicesObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.slide-left')) {
      const slideLeftElements = document.querySelectorAll('.slide-left');
      const slideLeftObserver = intersectionObserverFactory(slideLeft);

      slideLeftElements.forEach((element) => {
        element.style.opacity = 0;
        slideLeftObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.slide-right')) {
      const slideRightElements = document.querySelectorAll('.slide-right');
      const slideRightObserver = intersectionObserverFactory(slideRight);

      slideRightElements.forEach((element) => {
        element.style.opacity = 0;
        slideRightObserver.observe(element);
      });
    }
  });
})(anime);
