#this file calculates the rom for each measurement for each character and writes it to an excel file

import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter
import itertools
import sys
import xlrd 

typeDict = {}
measurementDict = {}
types = "luruh,gagah,lanyap,raksasa,wanara,jatayu".split(",")
xyz = "x","y","z"
measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")

#read book
book = xlrd.open_workbook("../data/all.xlsx") 
sh = book.sheet_by_index(0)	

#write book
workbook = xlsxwriter.Workbook('../data/rom.xlsx')
worksheet = workbook.add_worksheet()
worksheet.write(0, 0, "name")

for t in types:
	typeDict[t] = types.index(t) + 1
	worksheet.write(types.index(t) + 1, 0, t)
	
counter = 1;
for d in xyz:
	for m in measurements:
		measurementDict["%s_%s" % (m,d)] = counter
		worksheet.write(0, counter, "%s_%s" % (m,d))
		counter+=1

for x in range(0, sh.ncols):
	colName = sh.cell_value(rowx=0, colx=x).split("_")
	typeName = colName[0]
	measurementName = "%s_%s" % (colName[1],colName[2])
	
	#get all the values
	allValues = []
	for y in range(1, sh.nrows):
		if (sh.cell_value(rowx=y, colx=x)):
			allValues.append(sh.cell_value(rowx=y, colx=x))
	
	#find where to write this in the excel file
	rowNumber = typeDict[typeName]
	colNumber = measurementDict[measurementName]
	if (allValues):
		value = max(allValues) -min(allValues)
	worksheet.write(rowNumber,colNumber,value)
	
print "File finished!"
workbook.close()
