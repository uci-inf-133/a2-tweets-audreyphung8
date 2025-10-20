function parseTweets(runkeeper_tweets) 
{
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) 
	{
		return new Tweet(tweet.text, tweet.created_at);

		
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//Lines 20-30 finds the earliest and latest tweets
	//Begins with default values
	var earliestTweet = tweet_array[0].time; 
	var latestTweet = tweet_array[0].time; 
	//Takes the min and max between the times
	tweet_array.forEach(tweet => {
		earliestTweet = Math.min(earliestTweet,tweet.time); 
		latestTweet = Math.max(latestTweet, tweet.time);
	});
	//Math function changes the time to integers so must convert back to Date object
	earliestTweet = new Date(earliestTweet);
	latestTweet = new Date(latestTweet);

	//Finds the firstDate/lastDate ID and update the text
	document.getElementById('firstDate').innerText = formatDates(earliestTweet);
	document.getElementById('lastDate').innerText = formatDates(latestTweet);
}

function formatDates(date)
{
	const format = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return format;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});