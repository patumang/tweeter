/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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


  renderTweets(data);

  const $form = $("#new-tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    console.log('form was submitted');

    const serializedData = $(this).serialize();

    console.log(serializedData);
    $.post("/tweets/", serializedData, (response) => {
      console.log(response);
      //fetchBlogs();
    });
  });

});
