// Build a function for the charts
function chartBuilder(park_name) {
    // Pull in data from samples.json  
    d3.json('/parks_data').then((data) => {
    
      // Create lists for line graph axis data
      var visits_list = [];
      var specific_year = [];
      var years_list = data[0].years
      years_list.forEach(year => {
        if ((data[0][park_name]['visits'][year]) > 0) {
            visits_list.push(data[0][park_name]['visits'][year]);
            specific_year.push(year)
        }
      });
      // check that lists are populating correctly
      console.log(years_list)
      console.log(visits_list)

      // Build a line chart of park visits
      let lineData = [
      {
        y: visits_list,
        x: specific_year,
        text: park_name,
        marker: {
          colorscale: 'Portland'},
        type: "line",
        orientation: "h"
      }
    ];
      // Line chart layout
      let lineLayout = {
        title: `${park_name} Annual Visitations`,
        margin: { t: 30, l: 150 },
  
    };
      // call plotly to make the line chart
      Plotly.newPlot("line", lineData, lineLayout);
    });
}

// Dropdown Change handler
function dropDown() {
    // Select the input value from the form
    var park = d3.select("#selDataset").node().value;
    console.log(park);
    // Build the plot with the new park data
    chartBuilder(park);
  }
  d3.select("#selDataset").on("change", dropDown);


// Build a fucntion (initial function) to populate page with default park and populate drop down selection
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of park names to populate the select options
    d3.json('/parks_data').then((data) => {
      var parkNames = data[0].parks;
      parkNames.forEach((park_name) => {
        selector
          .append("option")
          .text(park_name)
          .property("value", park_name);
      });
      // Use the first park name from the list to build the initial plots
      var firstPark = parkNames[0];
      chartBuilder(firstPark);
    });
  }
  
  // Build a function to update plots on a park name change
  function optionChanged(park_name) {
    // Fetch new data each time a new park name is selected
    chartBuilder(park_name);
}
  // Set up the dashboard
  init();