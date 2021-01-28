(function () {
  if (document.querySelector('#connect-with-your-customers-vendors-and-prospects')) {
    setTimeout(function () {
      var container = document.querySelector('#connect-with-your-customers-vendors-and-prospects');
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.offsetHeight, container.offsetHeight);
      container.appendChild(renderer.domElement);

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
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', onWindowResize);

      function onWindowResize() {
        renderer.setSize(container.offsetHeight, container.offsetHeight);
      }
    }, 500);
  }
})();
