(function(){
    var colors = d3.scale.category20();

    var chart;
//Load data from JSON file
    d3.json("/data/sample-chart-muni.json", function(d){
        //define nested variable with data
        var chartData = d.data
        nv.addGraph(function() {
            //define chart schema and x and y data
            chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .controlLabels({stacked: "Stacked"})
            .duration(300);

            // chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
            chart.yAxis.tickFormat(d3.format(',.4f'));

            chart.legend.vers('furious');

            d3.select('#theil-elements')
            .datum(chartData)
            .transition().duration(1000)
            .call(chart)
            .each('start', function() {
                setTimeout(function() {
                    d3.selectAll('#chart1 *').each(function() {
                        if(this.__transition__)
                            this.__transition__.duration = 1;
                    })
                }, 0)
            });

            nv.utils.windowResize(chart.update);
            return chart;
        });
        
    })
})();
