'''

!!!!!!!!!!

MAKE SURE THAT THE ADDITIONAL JATAYU VALUES HAVE BEEN DELETED!!!!!!

!!!!!!!!!!


Read the angles and output velocity, acceleration and jerkiness

'''

import re
import xlrd # this is for reading the exisitng file
import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter
import itertools
import sys
import numpy as np

#create Dictionary
typeDict = {}
measurementDict = {}
types = "luruh,lanyap,gagah,raksasa,wanara,jatayu".split(",")
xyz = "x","y","z"
measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")

#open Data
book = xlrd.open_workbook("../data/jerkiness.xlsx") 
sh = book.sheet_by_index(0)

#write book
workbook = xlsxwriter.Workbook('../data/jerkiness_zerocrossings.xlsx')
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

for y in range(0, sh.ncols):
	
	colName = sh.cell_value(rowx=0, colx=y).split("_")
	typeName = colName[0]
	measurementName = "%s_%s" % (colName[1],colName[2])
	
	joint_list = []
	
	#calculate the zero crossings, equivalent to how rom.py calculates ROM
	for x in range(4, sh.nrows):
		currentVal = sh.cell_value(rowx=x, colx=y)
		if (currentVal):
			print currentVal
			joint_list.append(currentVal)
	
	zeroCrossings = (np.diff(np.sign(joint_list)) != 0).sum()	
	#zeroCrossings = 0
	
	#find where to write this in the excel file
	rowNumber = typeDict[typeName]
	colNumber = measurementDict[measurementName]
	#if (zeroCrossings):
	#	value = max(allValues) -min(allValues)
	worksheet.write(rowNumber,colNumber,zeroCrossings)
	
print "Jerkiness finished!"
workbook.close()
