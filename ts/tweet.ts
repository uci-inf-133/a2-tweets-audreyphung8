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
        if (this.text.toLowerCase().includes("completed") || this.text.toLowerCase().includes("posted"))
        {
            return "completed_event";
        }
        else if (this.text.toLowerCase().includes("right now"))
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
        if (this.source != 'completed_event') 
        {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let parseUnit = this.text.indexOf("mi");
        if (parseUnit == -1)
        {
            parseUnit = this.text.indexOf("km");
        }

        let findUnit = this.text.slice(parseUnit + 2).trim();
        const m = findUnit.match(/\b([A-Za-z]+)\b/);
        if (m == null)
        {
            return "";
        }
        else
        {
            if (m[1] == "nordic")
            {
                return "walk";
            }
            return m[1];
        }
    }
    
    get distance():number 
    {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        // https://www.geeksforgeeks.org/typescript/how-to-convert-string-to-number-in-typescript/ 

        let distance = this.text.match(/\d+\.\d+/);
        let parsedDistance;
        if (distance == null)
        {
            return NaN;
        }
        else
        {
            parsedDistance = parseFloat(distance[0]);
        }
        
        let unit = distance[2];
        if (unit == "km")
        {
            return parsedDistance / 1.609;
        }
        else
        {
            return parsedDistance;
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}