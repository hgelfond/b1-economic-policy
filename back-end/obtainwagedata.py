

#Get NYSDOL wage data in zipped CSV
#wget --no-check-certificate https://www.labor.ny.gov/stats/qcew.zip 

#Unzip
import zipfile
with zipfile.ZipFile("/home/alex/Downloads/qcew.zip","r") as zip_ref:
    zip_ref.extractall(".")

#Append and Convert to CSV

cat qcew_annual_2000.txt qcew_annual_2001.txt qcew_annual_2002.txt qcew_annual_2003.txt qcew_annual_2004.txt qcew_annual_2005.txt qcew_annual_2006.txt qcew_annual_2007.txt qcew_annual_2008.txt qcew_annual_2009.txt qcew_annual_2010.txt qcew_annual_2011.txt qcew_annual_2012.txt qcew_annual_2013.txt qcew_annual_2014.txt qcew_annual_2015.txt qcew_annual_2016.txt qcew_annual_2017.txt > qcew_all.CSV

#filter NYC region

red_cars = []
whitelist = ['Metropolitan Statistical Area']
for car in cars:
    if car['color'] in whitelist:
        red_cars.append(car)