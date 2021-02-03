(function () {
  const canPlayHandler = (event) => event.target.play();

  document.addEventListener('DOMContentLoaded', (event) => {
    const autoplayVideos = document.querySelectorAll('video[data-autoplay]');

    if (autoplayVideos.length > 0) {
      autoplayVideos.forEach((video) => {
        video.addEventListener('canplay', canPlayHandler, { once: true })
      });

      if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((videos) => {
          videos.forEach((video) => {
            if (video.intersectionRatio <= 0) return;

            videoObserver.unobserve(video.target);
            video.target.load();
          });
        });

        autoplayVideos.forEach((video) => videoObserver.observe(video));
      } else {
        autoplayVideos.forEach((video) => video.load());
      }
    }
  });
})();
