import pandas as pd
import os
import time
from datetime import datetime

#location of the data files
path = "~/Desktop/Code4Policy/Assignments/b1-economic-policy"

#function
def save_csv(json_variable):
	df = pd.read_json(json_variable)	
	df.to_csv("output.csv")
	print("Saved")
	
save_csv("aapl-summary.json")


