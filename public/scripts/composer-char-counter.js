/* eslint-disable no-undef */
$(document).ready(function() {
  let charLimit = 140;
  let counter;
  $("#tweet-text").on('input', function() {
    counter = charLimit - $(this).val().length;
    const counterElement = $(this).next().children(".counter");
    if (counter < 0) {
      counterElement.addClass('text-danger');
    } else {
      counterElement.removeClass('text-danger');
    }
    counterElement.text(counter);
  });
});