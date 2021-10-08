/* eslint-disable no-undef */
/* funtion to count number of chars left until the limit */
$(document).ready(function() {
  //char limit for new tweet  = 140
  let charLimit = 140;
  let counter;
  //EventListener for new tweet text area input
  $("#tweet-text").on('input', function() {
    //count number of letters left ans display in counter element
    counter = charLimit - $(this).val().length;
    const counterElement = $(this).next().children(".counter");
    //if characters exceed to charact limit then change color to red
    if (counter < 0) {
      counterElement.addClass('text-danger');
    } else {
      counterElement.removeClass('text-danger');
    }
    counterElement.text(counter);
  });
});