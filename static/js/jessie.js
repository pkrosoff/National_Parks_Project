d3.json('/parks_data').then(data=> {
    console.log(data);
    console.log(data[0]["Big Bend"]["state"]);
})

// function pullParks(park) {
//     // Pull in data from parks_data app page
//     d3.json("parks_data").then((data) => {
//     // Grab park names and populate into an array
//     var park_names = data[0].park_name;
//     var park_list = [];
//     // loop to populate
//     park_names.forEach(name=>{
//       var parkname = name
//       park_list.push(parkname)
//     })

// });

// function pullVisits(data) {
//     // Grab park names and populate into an array
//     var year = data.visits[0];
//     var year_list = [];
//     var visits = data.visits[1];
//     var visitnum = [];
//     // loop to populate years
//     year.forEach(date => {
//       var datenum = date
//       year_list.push(datenum)
//     });
//     // loop to populate visits
//     visits.forEach(number => {
//         var people = number
//         visitnum.push(people)
//       })

// }};

//   // main function with data call to parks_data app page
// d3.json("parks_data").then(data => pullParks(data));

// Build a function for the charts
function chartBuilder(np) {
    // Pull in data from samples.json  
    d3.json('/parks_data').then((data) => {
      // Grab the park name data
      let park_name = data.park_name;
      // Filter data object and pull name, years, and visit numbers
    //   let results = park_name.filter(sampleObj => sampleObj.id == park_name);
    //   let result = results[0];
      let year = data.visits[0]
      let years_list = []
      year.forEach(date => {
          var time = date
          years_list.push(time)
      });
      let visit_num = data.visits[1]
      let visits_list = []
      visit_num.forEach(visit => {
        var human = visit
        visits_list.push(human)
    });

      // Build a Line chart of park visits
      let lineData = [
      {
        y: visits,
        x: years,
        text: park_name,
        marker: {
          colorscale: 'Portland'},
        type: "line",
        orientation: "h"
      }
    ];
      // Line graph layout
      let lineLayout = {
        title: "Park Visitaions",
        margin: { t: 30, l: 150 },
  
    };
      // call plotly to make the bar chart
      Plotly.newPlot("line", lineData, lineLayout);
    });
}

// Build a fucntion (initial function) to populate page with default park and populate drop down selection
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json('/parks_data').then((data) => {
      var parkNames = data.park_name;
      parkNames.forEach((park_name) => {
        selector
          .append("option")
          .text(park_name)
          .property("value", park_name);
      });
      // Use the first sample from the list to build the initial plots
      var firstPark = parkNames[0];
      chartBuilder(firstPark);
      PullSampledata(firstPark);
    });
  }
  
  // Build a function to update plots on a sample ID change
  function optionChanged(newPark) {
    // Fetch new data each time a new sample is selected
    chartBuilder(newPark);
    PullSampledata(newPark);
  }
  
  // Set up the dashboard
  init();