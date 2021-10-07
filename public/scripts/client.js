/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
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
      alert('tweet content is not present! please input tweet content.');
    } else if (tweetText.length > 140) {
      alert('tweet content is too long! please input 140 or less letters.');
    } else {
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, (response) => {
        $("#tweet-text").val('');
        loadTweets();
      });
    }
  });

});
