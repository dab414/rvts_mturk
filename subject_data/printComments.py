import sys, ast

fNames = sys.argv[1:]

f = []

for file in fNames:
	f.append(ast.literal_eval(open(file,'r').read()))

for line in f:
	print 'New Comment:\n'
	print line['comments']
	print '\n'