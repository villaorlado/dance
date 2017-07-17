import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter
import itertools
import sys
import xlrd 

romDict = {}
types = "gagah,luruh,lanyap,raksasa,wanara,jatayu".split(",")



book = xlrd.open_workbook("../data/all.xlsx") 
sh = book.sheet_by_index(0)	

for t in types:
	romDict[t] = {}

csv = ""

for x in range(0, sh.ncols):
	colName = sh.cell_value(rowx=0, colx=x).split("_")
	characterName = colName[0]
	measurementName = "%s_%s" % (colName[1],colName[2])
	
	allValues = []
	for y in range(1, sh.nrows):
		allValues.append(sh.cell_value(rowx=y, colx=x))
	romDict[characterName][measurementName] = min(allValues)
	
for key,value in romDict.items():
	print key


#print romDict

'''
data = csv.reader(open('../html/data/all.csv', 'rb'), delimiter=",", quotechar='|')
column1, column2 = [], []

for row in data:
    column1.append(row[0])
    column2.append(row[1])

print min(column1)
print min(column2)
'''
