# What is this?
This is an interactive map visualizing the number of criminal court summonses by precinct in New York City.

I chose this as a simple project for me to learn some data visualization using D3.js,  
modern front-end tools and techniques like React, Redux, webpack, Babel, npm,  
and related topics such as data cleaning and exploratory analysis with Python/pandas.

# See it live
https://nabilhassein.github.io/nyc-summons-precinct-visualization/

# Running locally
After `git clone`-ing this repo, from within the directory:  
```
npm install  
npm run build  
npm run start  
```

Then the map should be live on localhost:8080. Let me know if these steps don't work on your machine so I can fix the issue.  
Also let me know of any suggestions you have to improve the code. I'm new at this frontend stuff.  
Tips about styling, whether inline React or CSS, would be especially appreciated!  

# Data sources
- https://data.cityofnewyork.us/Public-Safety/Criminal-Court-Summonses/j8nm-zs7q
- https://raw.githubusercontent.com/dwillis/nyc-maps/master/police_precincts.geojson

# A few useful examples
- https://bl.ocks.org/mbostock/4060606
- https://github.com/maptime-ams/animated-borders-d3js
- https://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/

# Possible future work
- add ability to show/hide all tooltips
- figure out how to show svg titles (used for precinct tooltips) on mobile
- improve use of whitespace on mobile
- add more precinct-based datasets!
