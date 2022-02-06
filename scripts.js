document.addEventListener("DOMContentLoaded", function(event) {
  const reviews = document.querySelectorAll(".review, .boosting, .bio");
  const closeButtons = document.querySelectorAll(".close-box");
  let topPos = 2;

  reviews.forEach((review) => {
    if (!review.classList.contains('bio') && !review.classList.contains('boosting')) {
      var left = (Math.random() * (window.innerWidth - 540)).toFixed();
      var top = (Math.random() * (window.innerHeight - review.offsetHeight - 80)).toFixed();

      review.style.left = left + 'px';
      review.style.top = top + 'px';
    }

    review.addEventListener('mousedown', function(e) {
      review.setAttribute('js-moving', '');
      offset = [
        review.offsetLeft - e.clientX,
        review.offsetTop - e.clientY
      ];

      topPos = topPos + 1;
      review.style.zIndex = topPos;
    }, true);

    review.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (review.hasAttribute('js-moving')) {
        mousePosition = {
          x : event.clientX,
          y : event.clientY,
        };
        review.style.left = (mousePosition.x + offset[0]) + 'px';
        review.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);
  });

  document.addEventListener('mouseup', function() {
    reviews.forEach((review) => {
      review.removeAttribute('js-moving');
    });
  }, true);

  closeButtons.forEach(closeButton => {
    closeButton.onclick = () => {
      closeButton.parentNode.parentNode.remove();
    }
  });
});
