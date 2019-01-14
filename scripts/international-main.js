
(function(){
  var svg = d3.select("svg"),
      margin = {top: 120, right: 20, bottom: 20, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleBand().paddingInner(0.4).paddingOuter(0.4).rangeRound([0, height]),
      t = d3.scaleLinear().range([0, width - 50]).clamp(true);

  var data,
      title,
      handle,
      currentValue;

  d3.select(window)
      .on("keydown", keydowned);

  d3.csv("intldata3.csv", function(error, _data) {
    if (error) throw error;

    title = _data.columns[0];
    data = d3.entries(_data).slice(0,-1).map(function(d) { return d.value; });

    x.domain([0, Math.round(d3.max(data, function(d) { return +d3.max(d3.values(d).slice(0,-1)); }) / 10) * 10]);
    y.domain(data.map(function(d) { return d[title]; }));
    t.domain(d3.extent(d3.keys(data[0]).slice(0,-1)));
    currentValue = t.domain()[1];

    g.append("text")
        .attr("class", "total")
        .attr("x", width)
        .attr("y", -80)
        .attr("dy", "0.35em")
        .text("");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
          .ticks(4, ".0s")
          .tickSize(-height))
        .select(".tick:last-of-type text")
        .select(function() { return this.parentNode.appendChild(this.cloneNode()); })
          .attr("y", -12)
          .attr("text-anchor", "end")
          .text("(trillion US$)");

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + margin.top / 1.5 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", t.range()[0])
        .attr("x2", t.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
              currentValue = Math.round(t.invert(d3.event.x));
              update();
            }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(t.ticks(5))
      .enter().append("text")
        .attr("x", t)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });

    slider.append("text")
        .attr("class", "year")
        .attr("x", width)
        .attr("dy", "0.35em")
        .text("year");

    handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 8);

    update();
  });

  function update() {
    var bar = g.selectAll(".bar")
        .data(data, function(d) { return d[title]; });

    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("y", function (d) { return y(d[title]); })
        .attr("height", y.bandwidth())
        .attr("width", function(d) { return x(d[currentValue]); });

    bar.append("text").text(function(d) { return d[currentValue]; });

    bar.transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr("width", function(d) { return x(d[currentValue]); });

    handle.attr("cx", t(currentValue));
    
  }

  function keydowned() {
    if (d3.event.metaKey || d3.event.altKey) return;
    switch (d3.event.keyCode) {
      case 37: currentValue = Math.max(t.domain()[0], currentValue - 1); break;
      case 39: currentValue = Math.min(t.domain()[1], currentValue + 1); break;
      default: return;
    }
    update();
    d3.event.preventDefault();
  }

})();
