(function () {
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

  document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.animation-module--cube')) {
      cubeAnimation(document.querySelector('.animation-module--cube'));
    }
  });
})();
