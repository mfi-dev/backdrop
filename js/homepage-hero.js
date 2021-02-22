(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('#full-service-citation') && document.querySelector('#full-service-definition')) {
      const citation = document.querySelector('#full-service-citation');
      const definition = document.querySelector('#full-service-definition');
      citation.addEventListener('mouseover', () => definition.classList.toggle('active'));
      citation.addEventListener('mouseout', () => definition.classList.toggle('active'));
    }
  });
})();
