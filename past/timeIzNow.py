from datetime import date, datetime
import json

def timeIzNow():
    '''
    returns current date as a string
    '''
    now = date.today()
    date_format = "%m-%d-%Y"
    # Format example = 6-5-2013
    
    # parsed_date = datetime.strptime(now, date_format)
    date_str = now.strftime("%-m-%-d-%Y") # 01/11/2017
    full = "-" + str(now.month) + "-" + str(now.day) + "-" + str(now.year)

    return full
    print(full)

with open('djia-summary' + timeIzNow() + '.json','w') as fp:
	json.dump(master_data,fp,indent = 4)