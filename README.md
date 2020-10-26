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
<img src="proposal_images/example_graph1.png/">
<br>
<img src="proposal_images/example_graph2.png/">
<br>
<img src="proposal_images/map_inspo.png/">
<br>
<img src="proposal_images/terra_proj.png/">
<br>
<br>
<img src="proposal_images/proj2_map_idea.jpeg/">
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
            <li>Save the original csvs into a data folder inside your project repository</li>
            </ul></ol>
        <br>
<h3>Transform</h3>
<br>
<ol>
    <li>Note which parks are considered "NPRES" and remove those rows (use Excel or pandas module in Jupyter Notebook)</li>
    <li>Reformat any names and dates that don't match and fill park codes</li>
    <li>Remove redundant columns</li>
    <li>Import data from csv into jupyter notebook using pandas module</li>
    <li>Split area columns, add miles squared by applying math functions to acres column</li>
    <li>Convert data types from strings to integers or floats where necessary</li>
    <li>Combine and reformat yearly attendence data tables into one master table</li>
    <li>Export cleaned master csv into the data folder in your repository</li>
</ol>
<br>
<h3>Load</h3>
<br>
<ol>
<li>In a new notebook, pull in cleaned master data csv using pandas</li>
<li>Establish a connection with you local MongoDB database software</li>
<li>Name the database, and the collections it will have</li>
<li>Create a post by iterrating through the rows in the dataframe and assinging the keys and values</li>
<li>Insert each post into the collection</li>
<li>Visit your MongoDB Compass application on your local machine to ensure the database and collections have been populated</li>
</ol>
<br><br>