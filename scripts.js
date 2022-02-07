document.addEventListener("DOMContentLoaded", function(event) {
  const reviews = document.querySelectorAll(".review, .boosting, .bio");
  const closeButtons = document.querySelectorAll(".close-box");
  let topPos = 2;
  let currentReview;

  reviews.forEach((review) => {
    if (!review.classList.contains('bio') && !review.classList.contains('boosting')) {
      var left = (Math.random() * (window.innerWidth - 540)).toFixed();
      var top = (Math.random() * (window.innerHeight - review.offsetHeight - 80)).toFixed();

      review.style.left = left + 'px';
      review.style.top = top + 'px';
    }

    review.addEventListener('mousedown', function(e) {
      const offset = [
        review.offsetLeft - e.clientX,
        review.offsetTop - e.clientY
      ];

      review.setAttribute('data-offset', JSON.stringify(offset));
      topPos = topPos + 1;
      review.style.zIndex = topPos;
      currentReview = review;
    }, true);


  });

  document.addEventListener('mouseup', function() {
    currentReview  = null;
  }, true);

  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (currentReview) {
      event.preventDefault();
      const mousePosition = {
        x : event.clientX,
        y : event.clientY,
      };

      const offset = JSON.parse(currentReview.getAttribute('data-offset'));
      currentReview.style.left = (mousePosition.x + offset[0]) + 'px';
      currentReview.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
  }, true);

  closeButtons.forEach(closeButton => {
    closeButton.onclick = () => {
      closeButton.parentNode.parentNode.remove();
    }
  });
});
