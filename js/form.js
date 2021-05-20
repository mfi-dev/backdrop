(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.querySelector('#request-a-quote-form');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var result = document.querySelector('#request-a-quote-result');
      var action = form.getAttribute('action');
      var method = form.getAttribute('method');
      var button = document.querySelector('button[type="submit"]', form);
      var buttons = button.parentElement;
      var spinner = document.createElement('div');

      spinner.setAttribute('class', 'spinner');
      button.setAttribute('disabled', true);
      buttons.append(spinner);

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

        button.removeAttribute('disabled');
        spinner.remove();
      })
      .catch(function (error) {
        if (result) {
          result.innerHTML = 'Error: ' + error;
        }

        button.removeAttribute('disabled');
        spinner.remove();

        throw new Error(error);
      });
    });
  });
})();
