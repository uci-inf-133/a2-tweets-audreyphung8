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

	const activityCount = {
		run: 0,
		walk: 0,
		hike: 0,
		bike: 0,
		elliptical: 0,
		swim: 0,
		skate: 0,
		snowboard: 0,
		row: 0
	};
	
	const completed = tweet_array.filter(t => t.source === "completed_event");
	completed.forEach(tweet => {
		const activity = tweet.activityType;
		activityCount[activity] += 1;
	});

	console.log(activityCount);

	//Number of different types of activities
	let nonzeroActivityCount = 0;
	for (let v of Object.values(activityCount))
	{
		if (v > 0)
		{
			nonzeroActivityCount += 1;
		}
	}
	document.getElementById('numberActivities').innerText = nonzeroActivityCount;

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	// Create array of activity counts for visualization
	const activityData = Object.entries(activityCount)
		.map(([activity, count]) => ({activity, count}))
		.sort((a, b) => b.count - a.count);

	const activity_vis_spec =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {"values": activityData},
		//TODO: Add mark and encoding
		"mark": "bar",
		"width": 400,
		"height": 250,
		"encoding": 
		{
			"x": {"field": "activity", "type": "nominal", "title": "Activity", "axis": {"labelAngle": 0}},
			"y": {"field": "count", "type": "quantitative", "title": "Number of Tweets"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, { actions: false });
	document.getElementById('firstMost').innerText = activityData[0].activity;
	document.getElementById('secondMost').innerText = activityData[1].activity;
	document.getElementById('thirdMost').innerText = activityData[2].activity;


	const top3 = Object.entries(activityCount)
		//Sort descending order 
		.sort((a, b) => b[1] - a[1])
		//Take the largest 3 numbers
		.slice(0, 3)
		//Extracts activity name into variable
		.map(([activity]) => activity);
	
	const weekly_names = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Friday", "Sat"];
	const activity_info = [];
	
	for (const tweet of completed)
	{
		if (top3.includes(tweet.activityType))
		{
			const d = tweet.time.getDay();

			if (Number.isFinite(tweet.distance))
			{
				activity_info.push({ 
					distance: tweet.distance,
					activity: tweet.activityType,
					day: weekly_names[d]
				});
			}
		}
	}

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	const distances_vis_spec =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for all of the three most tweeted-about activities",
		"data": {"values": activity_info},
		"mark": "point",
		"width": 200,
		"height": 150,
		"encoding": 
		{
			"x": {
				"field": "day",
				"type": "ordinal",
				"title": "Time(day)",
				"sort": weekly_names,
				"axis": {"labelAngle": 0}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"title": "Distance (mi)"
			},
			"color": {
				"field": "activity",
				"type": "nominal"
			}
		}
	};
	vegaEmbed('#distanceVis', distances_vis_spec, { actions: false });

	const mean_vis_spec = 
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the average distances by day of the week for all of the three most tweeted-about activities",
		"data": {"values": activity_info},
		"mark": "point",
		"width": 200,
		"height": 150,
		"encoding": 
		{
			"x": {
				"field": "day",
				"type": "ordinal",
				"title": "Time(day)",
				"sort": weekly_names,
				"axis": {"labelAngle": 0}
			},
			"y": {
				"aggregate": "mean",
				"field": "distance",
				"type": "quantitative",
				"title": "Mean of Distance"
			},
			"color": {
				"field": "activity",
				"type": "nominal"
			},
		}
	};
	vegaEmbed('#distanceVisAggregated', mean_vis_spec, { actions: false });
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	document.getElementById('longestActivityType').innerText = "bike";
	document.getElementById('shortestActivityType').innerText = "walk";
	document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";

	document.getElementById('distanceVisAggregated').style.display = 'none';
	const toggleButton = document.getElementById('aggregate');
	toggleButton.addEventListener('click', () => {
		if (toggleButton.textContent == "Show means")
		{
			document.getElementById('distanceVis').style.display = 'none';
			document.getElementById('distanceVisAggregated').style.display = 'block';
			toggleButton.innerText = "Show all activities";
		}
		else
		{	
			document.getElementById('distanceVis').style.display = 'block';
			document.getElementById('distanceVisAggregated').style.display = 'none';
			toggleButton.innerText = "Show means";
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});

