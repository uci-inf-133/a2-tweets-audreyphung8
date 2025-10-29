let written_tweets = [];

function parseTweets(runkeeper_tweets)
{
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//TODO: Filter to just the written tweets
	written_tweets = tweet_array.filter(t => t.written === true);

	addEventHandlerForSearch();
	
}

function addEventHandlerForSearch() 
{
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	//https://www.w3schools.com/jsref/dom_obj_tbody.asp 
	const searchBar = document.getElementById('textFilter');
	document.getElementById('searchCount').innerText = 0;
	document.getElementById('searchText').innerText = "";

	searchBar.addEventListener('input', () => {
		//Checks for empty string to cover instances of the user deleting all characters in the search bar
		if (searchBar.value.trim().toLowerCase() == "")
		{
			//Clears the search count, text, table 
			document.getElementById('searchCount').innerText = 0;
			document.getElementById('searchText').innerText = "";
			document.getElementById('tweetTable').innerHTML = "";
			return;
		}

		let countTweets = 0;
		document.getElementById('tweetTable').innerHTML = "";
		let appendRows = "";
		written_tweets.forEach((t, index) => {
			if (t.text.toLowerCase().includes(searchBar.value.toLowerCase()))
			{
				countTweets++;
				// const row = document.createElement("TR");
				appendRows += t.getHTMLTableRow(index+1);
				// const tweetNumberCol = document.createElement("TD");
				// tweetNumberCol.innerText = index + 1;
				// row.appendChild(tweetNumberCol);

				// const tweetActivityType = document.createElement("TD");
				// tweetActivityType.innerText = t.activityType;
				// row.appendChild(tweetActivityType);

				// const tweetText = document.createElement("TD");
				// tweetText.innerText = t.writtenText;
				// row.appendChild(tweetText);
			}
		});
		document.getElementById('tweetTable').innerHTML = appendRows;
		document.getElementById('searchCount').innerText = countTweets;
		document.getElementById('searchText').innerText = searchBar.value;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});