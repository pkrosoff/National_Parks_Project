d3.json('/parks_data').then(data=> {
    console.log(data);
    console.log(data[0]["Big Bend"]["state"]);
})

// function PullParkdata(park) {
//     // Pull in data from samples.json
//     d3.json('/parks_data').then(data=> {
//       // grab the park data tied to park name
//       let np = data.np;
//       // Filter the data for the specific park
//       let results = np.filter(sampleObj => sampleObj.park_name == park);
//       let result = results[0];
//       // Use d3 to select the display panel (#sample-metadata) for the specific sample number
//       let display = d3.select("#sample-metadata");
//       // clear any existing metadata
//       display.html("");
//     // add each key and value pair to the display box
//     Object.entries(result).forEach(([key, value]) => {
//       display.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });
//   });
// }

// // Build a function for the charts
// function chartBuilder(parknames) {
//     // Pull in data from samples.json  
//     d3.json('/parks_data').then(data=> {
//       // Grab the UTO data - samples 
//       let parknames = data.np.park_name;
//       // Filter data object and pull ids, labels, and values
//       let results = samples.filter(sampleObj => sampleObj.id == sample);
//       let result = results[0];
//       let otu_ids = result.otu_ids;
//       let otu_labels = result.otu_labels;
//       let sample_values = result.sample_values;
  
//       // Build a bar chart of top 10 Bacteria Cultures found
//       // use slice (0,10) to grab top 10 and .reverse to order decending
//       let y = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
//       let barData = [
//       {
//         y: y,
//         x: sample_values.slice(0, 10).reverse(),
//         text: otu_labels.slice(0, 10).reverse(),
//         marker: {
//           color: otu_ids,
//           colorscale: 'Portland'},
//         type: "bar",
//         orientation: "h"
//       }
//     ];