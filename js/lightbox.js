(function () {
  const canPlayHandler = (event) => event.target.play();

  const initLightbox = (modal) => {
    const video = modal.querySelector('video.video');
    const iframe = modal.querySelector('iframe.video');

    modal.addEventListener('show.bs.modal', (event) => {
      if (video) {
        video.addEventListener('canplay', canPlayHandler, { once: true });
        video.load();
      }

      if (iframe) {
        iframe.setAttribute('src', iframe.getAttribute('data-src') + '?autoplay=1');
      }
    });

    modal.addEventListener('hide.bs.modal', (event) => {
      if (video) {
        video.pause();
      }

      if (iframe) {
        iframe.removeAttribute('src');
      }
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    const lightboxes = document.querySelectorAll('.lightbox');
    lightboxes.forEach(initLightbox);
  });
})();
