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
<ol>
    <li>Visit NPS site to find data</li>
    <li>Download or copy data from origin sites into Excel files</li>
        <ol>
            <li>1979 data to present(20 years at a time are available, select appropriate dropdowns) <a href="https://irma.nps.gov/STATS/SSRSReports/National%20Reports/Annual%20Visitation%20By%20Park%20(1979%20-%20Last%20Calendar%20Year)">from NPS.gov</a></li>
            <li>Park inception attendence to 1979 <a href="https://irma.nps.gov/STATS/SSRSReports/National%20Reports/Query%20Builder%20for%20Historic%20Annual%20Recreation%20Visits%20(1904%20-%201979)">from NPS.gov</a></li>
            <li>Park inception date, image, and description information <a href="https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States">from Wikipedia</a></li>
            <li>Note which parks are considered "NPRES" and remove those rows</li>
            <li>Reformat any names and dates that don't match and fill park codes</li>
            <li>Remove redundant columns</li>
            <li>Polygon </li>
            </ol>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ol>

<br><br>

Terras advice:
for each national park in excel file
make blank dictionalry with some keys as defined in the loop
loop througha dn assign data to that "post"
add number of visitors per year (if list, loop through)
create a dictionary as you go, 
two different collections for example,
park collection and date collection

