// Build a function for the charts
function chartBuilder(park_name) {
    // Pull in data from samples.json  
    d3.json('/parks_data').then((data) => {
        // var park_name = d3.select("#selDataset").node().value;
        // console.log(park_name);
      var visits_list = [];
      var specific_year = [];
      var years_list = data[0].years
      years_list.forEach(year => {
        if ((data[0][park_name]['visits'][year]) > 0) {
            visits_list.push(data[0][park_name]['visits'][year]);
            specific_year.push(year)
        }
      });
      console.log(years_list)
      console.log(visits_list)
      // Build a Line chart of park visits
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
      // Line graph layout
      let lineLayout = {
        title: `${park_name} Annual Visitations`,
        margin: { t: 30, l: 150 },
  
    };
      // call plotly to make the bar chart
      Plotly.newPlot("line", lineData, lineLayout);
    });
}

// Dropdown Change handler
function dropDown() {
    // Select the input value from the form
    var park = d3.select("#selDataset").node().value;
    console.log(park);
    // Build the plot with the new park
    chartBuilder(park);
  }
  d3.select("#selDataset").on("change", dropDown);


// Build a fucntion (initial function) to populate page with default park and populate drop down selection
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json('/parks_data').then((data) => {
      var parkNames = data[0].parks;
      parkNames.forEach((park_name) => {
        selector
          .append("option")
          .text(park_name)
          .property("value", park_name);
      });
      // Use the first sample from the list to build the initial plots
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