(function () {
  const cubeAnimation = (element) => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(element.offsetHeight, element.offsetHeight);
    element.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();

    var material = new THREE.MeshBasicMaterial({
      color: 0xa3cfbb,
      wireframe: true
    });

    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 1.5;

    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', (event) => { 
      renderer.setSize(element.offsetHeight, element.offsetHeight);
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    const lazyLoadVideos = document.querySelectorAll('video[data-autoplay]');

    if (lazyLoadVideos.length > 0) {
      lazyLoadVideos.forEach((video) => video.addEventListener('canplay', (event) => video.play()));

      if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((videos) => {
          videos.forEach((video) => {
            if (video.intersectionRatio <= 0) return;

            videoObserver.unobserve(video.target);
            video.target.load();
          });
        });

        lazyLoadVideos.forEach((video) => videoObserver.observe(video));
      } else {
        lazyLoadVideos.forEach((video) => video.load());
      }
    }

    if (document.querySelector('.animation-module--cube')) {
      cubeAnimation(document.querySelector('.animation-module--cube'));
    }
  });
})();
