(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.querySelector('#request-a-quote');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var result = document.querySelector('#request-a-quote-result');
      var action = form.getAttribute('action');
      var method = form.getAttribute('method');

      fetch(action, {
        method: method,
        body: new FormData(form)
      })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then(function (output) {
        if (result) {
          result.innerHTML = output;
        }
      })
      .catch(function (error) {
        if (result) {
          result.innerHTML = 'Error: ' + error;
        }

        throw new Error(error);
      });
    });
  });
})();
