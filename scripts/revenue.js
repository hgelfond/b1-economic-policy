(function(){
  var margin = {top: 40, right: 160, bottom: 35, left: 30};

  var width = 350 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg = d3.select("div#revenue")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "revenue");

  /* Data in strings like it would be if imported from a csv */

  var data = [
    {"year": "2018", "individual_income_tax": "8.2", "payroll_tax": "5.9", "corporate_income_tax": "1.2", "other_tax": "1.4"}];

  var parse = d3.time.format("%Y").parse;

  // Transpose the data into layers
  var dataset = d3.layout.stack()(["individual_income_tax", "payroll_tax", "corporate_income_tax", "other_tax"].map(function(fruit) {
    return data.map(function(d){
      return {x: parse(d.year), y: +d[fruit]};
    });
  }));


  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  var colors = ["#001f3f", "#003399", "#0074D9", "#7FDBFF"];


  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat( function(d) { return d } );

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat("Revenue");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });

  var rect = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand())
    .on("mouseover", function(){ 
      tooltip.style("display", null); 
    })
    .on("mouseout", function(){ 
      tooltip.style("display", "none"); 
    })
    .on("mousemove", function(d){
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y);
    });


  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
   
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});
   
  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
      switch (i) {
        case 0: return "Other";
        case 1: return "Corporate Tax";
        case 2: return "Payroll Tax";
        case 3: return "Indiv. Income Tax";
      }
    });

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "fisc-tooltip")
    .style("display", "none")
    .attr("id", "revenue")
      
  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 1)
    .attr("id", "revenue")

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("id", "revenue")
})();
