This readme file contains information about how our website was created. Each section of this document corresponds to a page on the 
website


----------------------------------------------------------------------------
INDEX
----------------------------------------------------------------------------

1. World Map
GDP per capita data was downloaded from the Wolrd Bank website: https://data.worldbank.org/indicator/NY.GDP.PCAP.CD and saved as 'world_map_GDP_per_capita_ORIGINAL_data.csv'
Modified the cvs data using Excel to extract only header, country name, and GDP per capita data in 2017. File saved as 'worldmap.csv' and read into the 'scripts/worldmap' D3 visualization.


----------------------------------------------------------------------------
INCOME INEQUALITY
----------------------------------------------------------------------------

1. Picketty, Saez and Zucman chart
The estimate of the rise in income inequality in the US was developed by Thomas Picketty, Emmanuel Saez and Gabriel Zucman in the 
following paper: http://gabriel-zucman.eu/files/PSZ2018QJE.pdf. The data for this site was sourced from the Table B1 of the file 'Appendix 
Tables II.xlsx, found on their website: http://gabriel-zucman.eu/usdina/ and in the data file, with the title 'zucman_inequality.xlsx'. 
The data was pulled and copied into 'data/inequality_distr.xlsx,' where a static image of income inequality was made with Excel's graphing 
tools. The PNG file, titled 'inequality.png' can also be found in the images folder and referenced on income-inequality.html. 

2. Absolute Economic Mobility
The mobility data presented in the economic mobility maps was estimated by a research team led by Raj Chetty at Harvard. See the following 
link for the research paper describing their methodology and original data sources: https://opportunityinsights.org/wp-
content/uploads/2018/03/abs_mobility_paper.pdf
For this site, data was used from table 1 of the authors' online data repository, found here: https://opportunityinsights.org/data/. The 
original Stata file can be found in 'data/mobility_all.dta.' State abbreviations were replaced with state names by merging the 
state_name.dta file into this file. After this, individual csv files containing income mobility estimates by cohort were created. See the 
.do file titled 'mobility data setup.do' for the full code.

The map for the 1980 cohort reads the '1980_mobility.csv' data into 'map-inequality1980.js'. The map for the 1940 cohort reads the 
'1940_mobility.csv' into 'map-inequality1940.js.' Both of these files produce interactive D3 heat maps showing absolute income mobility 
across states and over time.

The source code for the US state map can be found online at: https://bl.ocks.org/dnprock/5215cc464cfb9affd283


----------------------------------------------------------------------------
ASSET VALUATION
----------------------------------------------------------------------------

1. Dow Jones Industrial Average Over-Valued Or Under-Valued by Sector
Data scraped using custom scraper from yahoo.finance.com for all 30 stocks in the Dow Jones Industrial Average (DJIA), converted into JSON 
file and then transformed into CSV format with custom data stamp. CSV files then moved into Output folder containing the files. Shell 
protocal written to streamline workflow. Data calculation conducted in CSV file and saved into XLSX file. Files inputted into D3 
Javascript file. Data visualized into interactive D3 bar chart using this tutorial: https://blog.risingstack.com/d3-js-tutorial-bar-
charts-with-javascript/. Attempted to overlay a line chart to show under-valued or over-valued. Difficult to implement. Work in progress.

----------------------------------------------------------------------------
FISCAL
----------------------------------------------------------------------------

1. Revenue and spending charts
Original data is sourced from the Congressional Budget Office's April 2018 Update to the Budget and Economic Outlook. See 
'CBO_10yr_projections.xlsx' for the 2018 values of revenue, mandatory spending and discretionary spending by major category. Revenue and 
Spending were copied from Excel into their own CSV files, titled 'data/revenue.csv' and 'data/spending.csv'. The data in each of these CSV 
files was then used to create a D3 visualization of a stacked bar chart, meant to show each category's contribution to the total fiscal 
outcome. The code for  the visualizations can be found in 'scripts/revenue.js' and 'scripts/spending.js'.

The source code for the stacked bar chart can be found online at: http://bl.ocks.org/mstanaland/6100713


2. Historical and projected US debt chart
Historical debt data (1968-2017) is sourced from the Congressional Budget Office's April 2018 Update to the Budget and Economic Outlook 
Historical Data supplement. The original data can be found in Tab 1 of the 'CBO_historical.xlsx' file within the data folder. This data 
was copied into a csv, titled 'debt.csv' and also found in the data folder. The data for 2018-2028 is sourced from 
'CBO_10yr_projections.xlsx' and was copied into 'debt.csv' for use in the dynamic debt visualization. The 'debt.csv' data was read into the 'scripts/debt.js' D3 visualization.

The source code for the mouseover line chart can be found online at: https://bl.ocks.org/mbostock/3902569

3. International Debt bar chart
2016 data is sourced from the OECD data. The original data can be found in intldebt folder as 'DP_LIVE_19012019023113482.csv' Changed the header using excel and saved as 'intldebt.csv' Created 'convertintldebt.py' to convert the file to json format in 'intldebt1.json' Outcome came with '\ufeff' in fron of the each key but could not encode without it thus deleted manually on the json file. 'intldebt.json' data was read into the 'scripts/fiscal-barchar.js' for the D3 visualization.






