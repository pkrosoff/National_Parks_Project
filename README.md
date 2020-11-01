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
<img src="proposal_images/example_graph1.png/" | width=100>
<br>
<img src="proposal_images/example_graph2.png/" | width=100>
<br>
<img src="proposal_images/map_inspo.png/" | width=100>
<br>
<img src="proposal_images/terra_proj.png/" | width=100>
<br>
<br>
<img src="proposal_images/proj2_map_idea.jpeg/" | width=100>
<br>


<h2>ETL</h2>
<br><br>
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