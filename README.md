# WebApplication_Project1
exercise 2

Steps to activate the project:
1. Open the project's folder in cmd and run the command
    "npm install"
2. In the same folder run the command "Node app.js"
3. Enter your preferred browser and go to "http://localhost:8080"

Additional Info:
1. The file "ads.json" contains all the ads that will be shown,
    however the file contains ads that are shown in specific times and dates as requested
    for this project which might cause a white empty page to be shown as no ad is loaded because
    none of the ads are in their time frame
2. Another file named "altads.json" which stands for "Alternative Ads" was added
    to the project although not asked to do so,
    the file contains ads that should work at almost any hour at any date
    to use this file instead simply backup "ads.json" to a different folder
    and change the file name of: "altads.json" to: "ads.json"
3. The "altads.json" contains ads that should be active until the year 2032
4. Ads with specific screen types can be shown by appending to the URL
    /screen=number for example http://localhost:8080/screen=1
    currently supported screens are 1, 2 and 3