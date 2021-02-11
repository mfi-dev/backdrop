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

  const movingLettersEffect12 = (element) => {

    anime({
      targets: element.querySelectorAll('.letter'),
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    });
  };

  const slideUp = (element) => {
    anime({
      targets: element,
      translateY: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.animation-module--cube')) {
      cubeAnimation(document.querySelector('.animation-module--cube'));
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module .module__kicker')) {
      const projectModuleKickerElements = document.querySelectorAll('.project-module .module__kicker');

      const projectModuleKickerObserver = new IntersectionObserver((elements) => {
        elements.forEach((element) => {
          if (element.intersectionRatio <= 0) return;

          projectModuleKickerObserver.unobserve(element.target);
          movingLettersEffect12(element.target);
        });
      });

      projectModuleKickerElements.forEach((element) => {
        element.innerHTML = element.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        const letters = element.querySelectorAll('.letter');
        letters.forEach((item) => item.style.opacity = 0);
        projectModuleKickerObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module .module__heading')) {
      const projectModuleHeadingElements = document.querySelectorAll('.project-module .module__heading');

      const projectModuleHeadingObserver = new IntersectionObserver((elements) => {
        elements.forEach((element) => {
          if (element.intersectionRatio <= 0) return;

          projectModuleHeadingObserver.unobserve(element.target);
          slideUp(element.target);
        });
      });

      projectModuleHeadingElements.forEach((element) => {
        element.style.opacity = 0;
        projectModuleHeadingObserver.observe(element);
      });
    }

    if ('IntersectionObserver' in window && document.querySelectorAll('.project-module__services')) {
      const projectModuleServicesElements = document.querySelectorAll('.project-module__services');

      const projectModuleServicesObserver = new IntersectionObserver((elements) => {
        elements.forEach((element) => {
          if (element.intersectionRatio <= 0) return;

          projectModuleServicesObserver.unobserve(element.target);
          slideUp(element.target.querySelectorAll('li'));
        });
      });

      projectModuleServicesElements.forEach((element) => {
        const items = element.querySelectorAll('li');
        items.forEach((item) => item.style.opacity = 0);
        projectModuleServicesObserver.observe(element);
      });
    }
  });
})(anime);
