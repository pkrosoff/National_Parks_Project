# National_Parks_Project
This is the repository for the group "The Impenetrable Puddings", and will have the contents of our Bootcamp Project 2
<br><br>
<strong>Project Proposal:</strong>
<br><br>
Analysis of National Park Attendance over time
By utilizing monthly attendance data from all 62 national parks, we will track attendance over time, comparative attendance between parks in different regions/states, and research a narrative exploring any significant increases or decreases in attendance.
We plan to utilize CSV data of the monthly attendance by park, GEOJSON data for both pin markers and polygons for each park, and historical research into potential socio/economic/political factors influencing significant attendance changes.
<br><br>
Some images for inspiration:
<br><br>
<img src="proposal_images/example_graph1.png/" width="200" height="auto"> <img src="proposal_images/example_graph2.png/" width="200" height="auto"> <img src="proposal_images/map_inspo.png/" width="200" height="auto"> <img src="proposal_images/terra_proj.png/" width="200" height="auto"> <img src="proposal_images/proj2_map_idea.jpeg/" width="200" height="auto">
<br>
<hr><hr>
<br>
<h1>How to Create This Website</h1>
<hr>
<br>
<h2>ETL</h2>
<br>
<h3>Extract</h3>
<br>
<ol>
    <li>Visit NPS site to find data</li>
    <li>Download or copy data from origin sites into Excel files</li>
        <ul>
            <li>1979 data to present(20 years at a time are available, select appropriate dropdowns) <a href="https://irma.nps.gov/STATS/SSRSReports/National%20Reports/Annual%20Visitation%20By%20Park%20(1979%20-%20Last%20Calendar%20Year)">from NPS.gov</a></li>
            <li>Park inception attendence to 1979 <a href="https://irma.nps.gov/STATS/SSRSReports/National%20Reports/Query%20Builder%20for%20Historic%20Annual%20Recreation%20Visits%20(1904%20-%201979)">from NPS.gov</a></li>
            <li>Park inception date, image, and description information <a href="https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States">from Wikipedia</a></li>
            <li>Monthly Attendence Data <a href="https://irma.nps.gov/STATS/SSRSReports/Park%20Specific%20Reports/Visitation%20by%20Month?Park=MORA">From NPS.gov</a></li>
            <li>Save the original csvs into a data folder inside your project repository</li>
            </ul></ol>
        <br>
<h3>Transform</h3>
<br>
<ol>
    <li>Inception, Attendent, and General Info Data:</li>
        <ul>
            <li>Note which parks are considered "NPRES" and remove those rows (use Excel or pandas module in Jupyter Notebook)</li>
            <li>Reformat any names and dates that don't match and fill park codes</li>
            <li>Remove redundant columns</li>
            <li>Combine and reformat yearly attendence data tables into one master table</li>
            <li>Export cleaned master csv into the data folder in your repository</li>
        </ul>
    <li>Monthly Attendence Data:
    <ul>
            <li>Gather last four years of data for each park</li>
            <li>Find the average of the monthly numbers to get a four year running average</li>
            <li>Create new csv using Excel with data averages</li>
            <li>Export csv to data folder in repository</li>
        </ul>
</ol>
<br>
<h3>Load</h3>
<br>
    <li>Run the np_data_ETL.py file in you terminal, which will:</li>
    <ul>
    <li>Import cleaned data from csv files</li>
    <li>Split area columns, add miles squared by applying math functions to acres column</li>
    <li>Convert data types from strings to integers or floats where necessary</li>
    <li>Create a dicionary of park data by looping through data and assigning keys and values</li>
    <li>Establish a connection with mongoDB</li>
    <li>Clear any old databases, and push data into mongoDB to create fresh database collections</li>
    </ul>
<br><br>
<h2>Create a Flask powered API</h2>
<br>
Using Anaconda's Flask module, we created an app.py file which leads users to endpoints of our API and allows the data to be accessed in JSON format from the MongoDB databases and query URLs.
<br>
Dependencies imported, data accessed, and homepage routed to the index.html file which will render the main page
<img src="static/images/readme_pics/app_py2.png/" width="400" height="auto">
<br>
Multiple endpoints were created, one for each of the datasets used:
<ul>
<li>General Park Info and Yearly Attendence Data (MongoDB)</li>
<li>Averaged Monthly Park Attendence Data (MongoDB)</li>
<li>GeoJson Park Perimeter Coordinate Data (URL Query)</li>
</ul>
<img src="static/images/readme_pics/app_py.png/" width="400" height="auto">
<br>
<h2>JavaScript</h2>
<br>
<p>Each team member tackled a visualization which tells a story about the National Parks. Using JavaScript, data was accessed from our API and transformed into interactive graphs, charts, and maps.
<br>
<p>The first visualization on the homepage after the park posters is an interactive leaflet map with park boundaries, adorable star shaped markers, and mouseover popups with park info inside. Get a full picture of where the parks are, and how much space they cover. Don't be shy, zoom in! You can explore the code for the map [here](/static/js/np_parkboundariesMap.js).
<br>
<p>The second visualization is a line graph depicting the history of each park's visitor attendence in a given year from inception to the year 2019. This graph features a dropdown menu that allows you to explore the history of each park in detail, as well as a mouseover feature on the line ittself which specifies the year and visitors for any time you'd like to learn about. Feast your eyes on the graph code [here](/static/js/np_lineGraph.js).
<br>
<p> The third visualization is an interactive video map combo, and dare I say the feature of the project. It boasts a play button that gives way to a map of the US that populates over the years with park markers as they became established over time, as well as circle radius markers that change in magnitude over the course of the video to signify park visitation and popularity over the years. Dive into the code for the map [here](/static/js/np_timelineMap.js).
<br>
<p>Our final visualization on the homepage is a nifty tool that helps you plan your park visit when it is convenient for you, adding the ability to see when most poeple are or aren't also visiting. What's your preference? It allows the user to see an average attendence for each park for each month using attendence data for the last four years. It is interactive upon mouse-over with opacity changes and popups with data. You can check out the code [here](/static/js/np_heatmap.js).