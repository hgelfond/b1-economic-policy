**********************************************
/* 
User: Jake Schneider
Date Created: 1/18/19
Date Revised: 1/18/19
Input: theil-elements-key-csv
Output: reshaped data for Alex
Data Source: CES
*/
***********************************************

*Basics

pwd
cd "~/Desktop"
pwd

import excel "theil-elements-key.xlsx", firstrow clear
br

ren B-S year20(##), addnumber(0)

* Reshape

reshape long year, i(Year) j(data)

ren year data1
ren data year
ren data1 data
ren Year variables

outsheet variables year data using theil_cleaned.csv , comma  


*reshape wide data, i(year) j(variables) string
