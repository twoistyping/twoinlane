document.addEventListener("DOMContentLoaded", function(event) {
  const reviews = document.querySelectorAll(".review, .boosting, .bio");
  const closeButtons = document.querySelectorAll(".close-box");
  let topPos = 2;

  reviews.forEach((item, i) => {
    if (!item.classList.contains('bio') && !item.classList.contains('boosting')) {
      var left = (Math.random() * (window.innerWidth - 540)).toFixed();
      var top = (Math.random() * (window.innerHeight - item.offsetHeight - 80)).toFixed();

      item.style.left = left + 'px';
      item.style.top = top + 'px'; 
    }

    item.addEventListener('mousedown', function(e) {
      item.setAttribute('js-moving', '');
      offset = [
        item.offsetLeft - e.clientX,
        item.offsetTop - e.clientY
      ];
      topPos = topPos + 1;
      item.style.zIndex = topPos;
    }, true);

    item.addEventListener('mouseup', function() {
      reviews.forEach((other, i) => {
        other.removeAttribute('js-moving');
      });
    }, true);

    document.addEventListener('mouseup', function() {
      item.removeAttribute('js-moving');
    }, true);

    item.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (item.hasAttribute('js-moving')) {
        mousePosition = {
          x : event.clientX,
          y : event.clientY
        };
        item.style.left = (mousePosition.x + offset[0]) + 'px';
        item.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);
  });

  closeButtons.forEach(closeButton => {
    closeButton.onclick = () => {
      closeButton.parentNode.parentNode.remove();
    }
  });
});
