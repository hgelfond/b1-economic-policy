# read intldebt.csv
import csv
import json

with open('intldebt.csv', 'r') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# convert to JSON
#print(key)

#print rows
#print(json.dumps(rows,indent=2))

# save Json as an intldebt1.json
with open('intldebt1.json', 'w', encoding='utf-8') as f:
    json.dump(rows, f, indent=2)