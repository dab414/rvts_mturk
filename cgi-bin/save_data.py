#!/usr/bin/python

import cgi, os, sys

sys.stderr = sys.stdout

fs = cgi.FieldStorage()

f = open('subject_data/test_data2.txt','w')

f.write(fs['current_data'].value)

f.close()
