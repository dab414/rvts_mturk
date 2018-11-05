#!/home/dave/anaconda2/bin/python

## unfinished, see notes in ./index.html

import cgi, os, sys, pickle
sys.stderr = sys.stdout

def save_obj(obj, name ):
	with open('obj/'+ name + '.pkl', 'wb') as f:
		pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name ):
	with open('obj/' + name + '.pkl', 'rb') as f:
		return pickle.load(f)



try:
	workerDict = load_obj('workerDict')
except:
	workerDict = {}

try:
	fs = cgi.FieldStorage()

	workerId = fs['workerId']
	experimentName = fs['experimentName']

	if workerId in workerDict.keys():
		workerDict[workerId] += experimentName

