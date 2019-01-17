(function() {
	const sample = [
		{
			sector: 'DJIA', 
			value: 33.19,
			companies: 30,
			color: '#000000'
		},
		{
			sector: 'Basic Materials',
			value: 61.97,
			companies: 1,
			color: '#00a2ee'
		},
		{
			sector: 'Communication Services',
			value: 7.42,
			companies: 1,
			color:'#fbcb39'
		},
		{
			sector: 'Consumer Cyclical',
			value: 26.32,
			companies: 4,
			color: '#007bc8'
		},
		{
			sector: 'Consumer Defensive',
			value: 38.18,
			companies: 4,
			color: '#65cedb'
		},
		{
			sector: 'Energy',
			value: 14.39,
			companies: 2,
			color: '#ff6e52'
		},
		{
			sector: 'Financial Services',
			value: 18.62,
			companies: 5,
			color: '#f9de3f'
		},
		{
			sector: 'Healthcare',
			value: 80.00,
			companies: 4,
			color: '#5d2f8e'
		},
		{
			sector: 'Industrials',
			value: 21.59,
			companies: 4,
			color: '#008fc9'
		},
		{
			sector: 'Technology',
			value: 35.37,
			companies: 5,
			color: '#507dca'
		}

	];
    const svg = d3.select('svg#DJIA-Valuation');
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    // Height and width of the container mirror the h/w of the chart
    svg.attr('height', 600 + 80)
    	.attr('width', 1000);

	const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);

    chart.append('g')
    .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.sector))
    .padding(0.2)

	chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    	.selectAll('text')
    	.style('text-anchor', 'end')
    	.attr('dx', '-.8em')
    	.attr('dy', '.15em')
    	.attr('transform', 'rotate(-65)');

    const barGroups = chart.selectAll()
    .data(sample)
    .enter()
    .append('g')

    barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.sector))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
    	d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.sector) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        line = chart.append('line')
	        .attr('id', 'limit')
	        .attr('x1', 0)
	        .attr('y1', y)
	        .attr('x2', width)
	        .attr('y2', y)
        	.attr('stroke', 'red')
        
        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.sector) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })


        // const y = yScale(actual.value)

    })
    .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.sector))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
     })

    chart.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .tickFormat(''))

    svg.append('text')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('P/E Ratio')


    
})();