(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('#full-service-citation') && document.querySelector('#full-service-definition')) {
      const citation = document.querySelector('#full-service-citation');
      const definition = document.querySelector('#full-service-definition');
      definition.classList.add('hide');
      citation.addEventListener('click', () => definition.classList.toggle('hide'));
    }
  });
})();
