/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//document ready function
$(() => {
  //display char limit for new tweet = 140
  const charLimit = 140;
  $('.counter').text(charLimit);

  //add error container for new tweet
  const $sectionNewTweet = $('.new-tweet');
  const $errorContainer = `
    <div class="error-container text-danger">
      <i class="fas fa-exclamation-triangle"></i>
      <span class="error-message"></span>
      <i class="fas fa-exclamation-triangle"></i>
    </div>
  `;
  $sectionNewTweet.prepend($errorContainer);

  //initially hide error container and new tweet form container
  $('.error-container').hide();
  $('.new-tweet').hide();

  //on click event listner on nav bar button, slideup and slidedown new tweet form container
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
        //reverse the order of tweets so that latest tweet come up on top
        tweets.reverse();
        //call function to renter the tweets array of object to the DOM
        renderTweets(tweets);

      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      }
    });
  };

  //call function to render all the tweets on document redy
  loadTweets();

  //render tweets to DOM
  const renderTweets = function(tweets) {
    //empty existing tweets in the container element
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty();

    //loop through each tweet and call the function to create individual tweet article
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      //add each tweet article to tweets container element
      $tweetContainer.append($tweet);
    }
  };

  //function to create article element for a tweet
  const createTweetElement = (tweet) => {
    //create article element
    const $tweetArticle = $('<article>').addClass('tweet');

    //create and append header elements
    // (containing : user avatar, name, handler)
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

    //create and append body elements
    // (containing : text paragraph)
    const $articleBody = $('<div>').addClass('article-body');
    const $bodyParagraph = $('<p>').text(tweet.content.text);
    $articleBody.append($bodyParagraph);

    //create and append footer elements
    // (containing : time when tweet created, and group of response icons)
    const $articleFooter = $('<footer>');

    const $footerTime = $('<span>').addClass('time-passed').text(timeago.format(tweet.created_at));
    const $footerIcons = $('<div>').addClass('respond-icons');
    const $flagIcon = $('<i>').addClass('fas fa-flag fa-sm');
    const $retweetIcon = $('<i>').addClass('fas fa-retweet fa-sm');
    const $heartIcon = $('<i>').addClass('fas fa-heart fa-sm');
    $footerIcons.append($flagIcon, $retweetIcon, $heartIcon);

    $articleFooter.append($footerTime, $footerIcons);

    //append header, body and footer to article
    $tweetArticle.append($articleHeader, $articleBody, $articleFooter);

    return $tweetArticle;
  };
  
  //create form event listener for submit
  const $form = $("#new-tweet-form");
  $form.on("submit", function(event) {
    //prvent default submit behaviour
    event.preventDefault();

    //check if tweet is empty or exceeding char limit
    const tweetText = $("#tweet-text").val();
    if (!tweetText) {
      //show animated error box with appropriate message
      $('.error-container').slideUp("slow", () => {
        $('.error-message').text('tweet content is not present! please input tweet content.');
      });
      $('.error-container').slideDown("slow");
    } else if (tweetText.length > 140) {
      //show animated error box with appropriate message
      $('.error-container').slideUp("slow", () => {
        $('.error-message').text('tweet content is too long! please input 140 or less letters.');
      });
      $('.error-container').slideDown("slow");
    } else {
      //on succes disable error container and post form data to server to store in db
      $('.error-container').slideUp();
      //serialize data to make querystring
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, () => {
        //affter suceess, empty text area, reset counter and hide new tweet form container
        $("#tweet-text").val('');
        $('.new-tweet').slideUp();
        $('.counter').text(charLimit);
        //load tweets with newly added tweet
        loadTweets();
      });
    }
  });

});
