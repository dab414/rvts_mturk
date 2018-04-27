#!/usr/local/bin/python

import cgi, os, sys
sys.stderr = sys.stdout


try:
  fs = cgi.FieldStorage()

  if not os.path.exists('../turk/data/' + fs['experiment'].value):
    os.makedirs('../turk/data/' + fs['experiment'].value)

  f = open('../turk/data/' + fs['experiment'].value + '/' + fs['curId'].value + '.txt','w')

  f.write(fs['current_data'].value)

  f.close()

  print "Status: 200 OK"
  print "Content-type: text/plain"
  print
  print fs["id"].value + " saved"

except:
	# Tell jQuery something went wrong
  print "Status: 400 Bad Request"
  print "Content-type: text/plain"
  print
  print "Error"