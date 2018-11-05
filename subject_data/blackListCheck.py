import sys

data = sys.argv[1:]

blackList = open('blackList.txt','r').read().split(',')[:-1]

d = {}

for entry in blackList:
	for file in data:
		if entry in file:
			if entry not in d.keys():
				d[entry] = 1
			else:
				d[entry] += 1

for key in d:
	if d[key] < 4:
		print key

print len(d.keys()) == len(blackList)