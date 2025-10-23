class Tweet 
{
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) 
    {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string 
    {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.toLowerCase().includes("completed"))
        {
            return "completed_event";
        }
        else if (this.text.toLowerCase().includes("posted"))
        {
            return "live_event";
        }
        else if (this.text.toLowerCase().includes("achieved"))
        {
            return "achievement";
        }
        else
        {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.writtenText.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    get writtenText():string 
    {
        //TODO: parse the written text from the tweet
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
        const hashtagRegex = /#\w+/g;
        let parseEnding = this.text.replace(urlRegex, "").trim();
        parseEnding = parseEnding.replace(hashtagRegex, "").trim();
        
        let indexOfDash = parseEnding.indexOf("-");
        if (indexOfDash == -1)
        {
            return "";
        }
        else
        {
            return parseEnding.slice(indexOfDash+1).trim();
        }
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}