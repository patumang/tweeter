/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const charLimit = 140;
  $('.counter').text(charLimit);
  const $sectionNewTweet = $('.new-tweet');
  const $errorContainer = `
    <div class="error-container text-danger">
      <i class="fas fa-exclamation-triangle"></i>
      <span class="error-message"></span>
      <i class="fas fa-exclamation-triangle"></i>
    </div>
  `;
  $sectionNewTweet.prepend($errorContainer);
  $('.error-container').hide();
  $('.new-tweet').hide();

  $('.link-new-tweet').click(() => {
    if ($(".new-tweet").is(":hidden")) {
      $('.new-tweet').slideDown("slow");
      $("#tweet-text").focus();
    } else {
      $('.new-tweet').slideUp("slow");
    }
  });

  // making a get request to see some data
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        console.log("data:", tweets);
        tweets.reverse();
        renderTweets(tweets);

      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      }
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    }
  };

  const createTweetElement = (tweet) => {
    const $tweetArticle = $('<article>').addClass('tweet');

    const $articleHeader = $('<header>');
    
    const $userProfile = $('<div>').addClass('user-profile');
    const $profileImage = $('<img>').attr({
      'src': tweet.user.avatars,
      'alt': 'user-avatar'
    });
    const $profileName = $('<span>').text(tweet.user.name);
    $userProfile.append($profileImage, $profileName);
    const $userHandler = $('<span>').addClass('text-muted').text(tweet.user.handle);

    $articleHeader.append($userProfile, $userHandler);

    const $articleBody = $('<div>').addClass('article-body');
    const $bodyParagraph = $('<p>').text(tweet.content.text);
    $articleBody.append($bodyParagraph);

    const $articleFooter = $('<footer>');

    const $footerTime = $('<span>').addClass('time-passed').text(timeago.format(tweet.created_at));
    const $footerIcons = $('<div>').addClass('respond-icons');
    const $flagIcon = $('<i>').addClass('fas fa-flag fa-sm');
    const $retweetIcon = $('<i>').addClass('fas fa-retweet fa-sm');
    const $heartIcon = $('<i>').addClass('fas fa-heart fa-sm');
    $footerIcons.append($flagIcon, $retweetIcon, $heartIcon);

    $articleFooter.append($footerTime, $footerIcons);

    $tweetArticle.append($articleHeader, $articleBody, $articleFooter);
    return $tweetArticle;
  };

  const $form = $("#new-tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();

    const tweetText = $("#tweet-text").val();

    if (!tweetText) {
      $('.error-container').slideUp("slow", () => {
        $('.error-message').text('tweet content is not present! please input tweet content.');
      });
      $('.error-container').slideDown("slow");
    } else if (tweetText.length > 140) {
      $('.error-container').slideUp("slow", () => {
        $('.error-message').text('tweet content is too long! please input 140 or less letters.');
      });
      $('.error-container').slideDown("slow");
    } else {
      $('.error-container').slideUp();
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, () => {
        $("#tweet-text").val('');
        $('.new-tweet').slideUp();
        $('.counter').text(charLimit);
        loadTweets();
      });
    }
  });

});
