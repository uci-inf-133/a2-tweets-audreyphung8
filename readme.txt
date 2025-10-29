--Readme document for *Audrey Phung*, *audreyp4@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

9/10
- 2.5/3 Summarizing tweets
- 3.5/4 Identifying the most popular activities
- 3/3 Adding a text search interface
I believe I followed the directions for each part of the project. However, I may not have the exact percentages or filtering
of the activities. For example, the directions stated that 95% of Runkeeper Tweets are completed events, but my results
came out to be 96.87%. 25% of completed events are user-written tweets, but my results came out to be 23.04%.


2. How long, in hours, did it take you to complete this assignment?
I dedicated at least 2 hours every day, so it took me about 18 hours complete this assignment.


3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)
Online resources I consulted when completing this assignment are:
- //https://www.w3schools.com/jsref/dom_obj_tbody.asp  (Creating table cell)
- https://www.geeksforgeeks.org/typescript/how-to-convert-string-to-number-in-typescript/ (Convert string to number)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString (Formatting the dates)
- https://vega.github.io/vega-lite/docs/data.html (Graphing activities)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions (Parsing strings)
The times I consulted Generative AI:
- Before making the links in the Tweets clickable (which requires the getHTMLTableRow() function), I manually created elements
of table row and body, then appended it to the overall table each time the event handler was called. When I realized that the
links had to be clickable, I moved the logic into the class method, but was unsure on how to append the row to the table. I 
consulted Generative AI by asking, "How to use .appendChild() to append the returned row to the table", but it suggested me to create
a string, adding the rows to it, and appending it to the table.
- I utilized the Google AI Overview results to help me use regex expressions and .match() functions to parse specific parts of the tweets. 
I searched phrases like "parsing hashtags from a string typescript" and "parsing urls from a string typescript".


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
I consulted Nathan Tang to compare and contrast our RunKeeper statistics. I also consulted Allison Hua about using regex expressions
to extract certain parts of the tweets and whether she parsed the activity type dynamically or hard-coded it. 


5. Is there anything special we need to know in order to run your code?
N/A