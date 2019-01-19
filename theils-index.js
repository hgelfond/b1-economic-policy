  // theil index clean data
 d3.json("/data/theil/theil-elements.json", function(theilElements)) {
  // instantiate d3plus
   var visualization = d3plus.viz()
    .container("#theil-viz")  // container DIV to hold the visualization
    .data(theilElements)  // data to use with the visualization
    .type("stacked")    // visualization type
    .id("variables")         // key for which our data is unique on
    .text("variables")       // key to use for display text
    .y("data")         // key to use for y-axis
    .x("year")          // key to use for x-axis
    .time("year")       // key to use for time
    .draw()             // finally, draw the visualization!
 }