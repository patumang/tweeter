/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
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

    const $footerTime = $('<span>').addClass('time-passed').text(tweet.created_at);
    const $footerIcons = $('<div>').addClass('respond-icons');
    const $flagIcon = $('<i>').addClass('fas fa-flag fa-sm');
    const $retweetIcon = $('<i>').addClass('fas fa-retweet fa-sm');
    const $heartIcon = $('<i>').addClass('fas fa-heart fa-sm');
    $footerIcons.append($flagIcon, $retweetIcon, $heartIcon);

    $articleFooter.append($footerTime, $footerIcons);

    $tweetArticle.append($articleHeader, $articleBody, $articleFooter);
    return $tweetArticle;
  };


  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
