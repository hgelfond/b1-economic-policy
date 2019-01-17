cd "/Users/hilary/Development/assignments/b1-economic-policy/data/"
use  "mobility_all.dta"

*data setup
drop state_fips

merge m:m state_name using "/Users/hilary/Development/assignments/b1-economic-policy/data/state-abbrevs-to-names.dta"
drop _merge state_name
rename state state_name

*Re-order variables to make it more logical to read
gen cohort1 = cohort
drop cohort
rename cohort1 cohort
gen cohort_mean1 = cohort_mean
drop cohort_mean
rename cohort_mean1 cohort_mean

save mobility_all.dta, replace


*create individual data files for each cohort

foreach year in 1940 1950 1960 1970 1980 {
	preserve
	keep if cohort == `year'
	save `year'_mobility.dta, replace
	restore
}

*export dta files as csv
clear
use 1980_mobility.dta
outsheet state_name cohort_mean using 1980_mobility.csv, comma
clear
use 1940_mobility.dta
outsheet state_name cohort_mean using 1940_mobility.csv, comma
clear
use 1960_mobility.dta
outsheet state_name cohort_mean using 1960_mobility.csv, comma
