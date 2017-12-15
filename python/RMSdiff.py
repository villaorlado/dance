'''
calculate difference between curves
compare all to Jatayu

then calculate simetries
'''

import math
import xlrd
from xlsxwriter.workbook import Workbook
import xlsxwriter

book = xlrd.open_workbook("../data/all.xlsx") 
sh = book.sheet_by_index(0)

workbook = xlsxwriter.Workbook('../data/RMSdiff_jatayu.xlsx')
worksheet = workbook.add_worksheet()

mDict = {"luruh":{},"lanyap":{},"gagah":{},"raksasa":{},"wanara":{},"jatayu":{}}

types = "gagah,luruh,lanyap,raksasa,wanara,jatayu".split(",")
nonJatayu = "gagah,luruh,lanyap,raksasa,wanara".split(",")

measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")
xyz = "x","y","z"

#coorinates for Jatayu comparisons
coordinates = {"luruh":{},"lanyap":{},"gagah":{},"raksasa":{},"wanara":{}}

yCoord = 2

for nj in nonJatayu:
	xCoord = 2
	worksheet.write(0, yCoord-1, nj)
	for m in measurements:
		for d in xyz:
			worksheet.write(xCoord-1, 0, "%s (%s)"%(m,d))
			#this line was just to verify numbers in matrix are correct
			#worksheet.write(xCoord-1, yCoord-1, "%s,%s" % (yCoord,xCoord))
			coordinates[nj]["%s_%s" % (m,d)] = {"xVal":xCoord,"yVal":yCoord}
			xCoord += 1			
	yCoord +=1
	
#functions
def rmsCompare (a,b):
	rmsdiff = 0
	for (x,y) in zip(a,b):
		rmsdiff += (x-y)**2
	rmsdiff = math.sqrt(rmsdiff / min (len(a),len(b)))
	return rmsdiff

#prepopulate dictionary	
for t in types:
	for m in measurements:
		mDict[t][m] = {}

for t in types:
	for m in measurements:
		for d in xyz:
			mDict[t][m][d] = []

for y in range(0, sh.ncols):
	joint = sh.cell_value(rowx=0, colx=y).split("_")
	 
	for x in range(2, sh.nrows): 
		mDict[joint[0]][str(joint[1])][str(joint[2])].append(sh.cell_value(rowx=x, colx=y))
	
	'''
	if (joint == "luruh_RKneeAngles_x"):

		for x in range(2, sh.nrows):
			currentVal = sh.cell_value(rowx=x, colx=y)
			a.append(currentVal)
	
	
	if (joint == "luruh_LKneeAngles_x"):

		for x in range(2, sh.nrows):
			currentVal = sh.cell_value(rowx=x, colx=y)
			b.append(currentVal)
	'''
	
#rmsCompare(mDict["luruh"]["LKneeAngles"]["x"],mDict["lanyap"]["LKneeAngles"]["y"])

for n in nonJatayu:
	for m in measurements:
		for d in xyz:
			nonJatayu_values = mDict[n][m][d]
			jatayu_values = mDict["jatayu"][m][d]
			xForWorksheet = coordinates[n]["%s_%s" % (m,d)]["xVal"] - 1
			yForWorksheet = coordinates[n]["%s_%s" % (m,d)]["yVal"] - 1
			rmsValue = rmsCompare(nonJatayu_values,jatayu_values)
			print n,m,d,rmsValue
			worksheet.write(xForWorksheet,yForWorksheet,rmsValue)

workbook.close()
