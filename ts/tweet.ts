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
        const hashtagRegex = /\s*#\w+\s*$/g;
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
        
        let indexOfDash = this.text.indexOf("-");
        if (indexOfDash == -1)
        {
            return "";
        }
        let written_text = this.text.slice(indexOfDash+1).trim();
        written_text =  written_text.replace(hashtagRegex, "").trim();
        return written_text.replace(urlRegex, "").trim();
    }

    get activityType():string 
    {
        if (this.source != 'completed_event') 
        {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        const activities = ["row", "walk", "bike", "hike", "elliptical", "swim", "skate", "snowboard", "run"];
        for (let i = 0; i < activities.length; i++)
        {
            if (this.text.toLowerCase().includes(activities[i]))
            {
                return activities[i];
            }
        }
        return "unknown";
    }
    
    get distance():number 
    {
        if (this.source != 'completed_event') 
        {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        // https://www.geeksforgeeks.org/typescript/how-to-convert-string-to-number-in-typescript/ 

        const distance = this.text.match(/(\d+(?:\.\d+)?)\s*(km|mi)\b/i);
        if (!distance)
        {
            return NaN;
        } 
        //console.log(distance);
        let parseDistance = parseFloat(distance[1]);
        const unit = distance[2];

        if (unit === 'km')
        {
            parseDistance /= 1.609;
        } 

        return Math.round(parseDistance * 100) / 100;
    }

    getHTMLTableRow(rowNumber:number):string 
    {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

        return `<tr>
                <td>${rowNumber + 1}</td>
                <td>${this.activityType}</td>
                <td>${this.writtenText} <a href="${this.text.match(urlRegex)}" target="_blank">${this.text.match(urlRegex)}</td>
                </tr>`;
    }
}