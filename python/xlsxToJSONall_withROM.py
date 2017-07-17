import re
import xlrd # this is for reading the exisitng file
import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter
import itertools
import sys

types = "gagah,luruh,lanyap,raksasa,wanara,jatayu".split(",")
xyz = {"x":0,"y":1,"z":2}
measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")

#output file
workbook = xlsxwriter.Workbook('../data/all.xlsx')
worksheet = workbook.add_worksheet()
writingColNumber = 0

#csv file
workbook2 = xlsxwriter.Workbook('../data/rom.xlsx')
worksheet2 = workbook2.add_worksheet()
worksheet2.write(0, 0, "name")
writingRowNumber2 =1
writingColNumber2 =1

#iterate through body types
for fileItem in types:
	
	sys.stdout.write('\r' + "Reading %s... " % fileItem)
	sys.stdout.flush()
	worksheet2.write(writingRowNumber2, 0, fileItem)
	writingRowNumber2+=1
	
	book = xlrd.open_workbook("../data/%s.xlsx" % fileItem) 
	sh = book.sheet_by_index(0)	
	print "ready!"
	
	#inside the body type, iterate through the measurements
	for y in range(0, sh.ncols):
		for measurement in measurements:
			reading = sh.cell_value(rowx=36, colx=y)
	
			if (measurement == reading):
				for key,value in sorted(xyz.items()):
					
					#write to all
					worksheet.write(0, writingColNumber, "%s_%s_%s" %(fileItem,measurement,key))
					
					#write to rom
					worksheet2.write(0, writingColNumber2, "%s_%s" %(measurement,key))
					
					writingRowNumber = 1
					
					for x in range(38, sh.nrows):
						worksheet.write(writingRowNumber, writingColNumber, sh.cell_value(rowx=x, colx=y+value))
						writingRowNumber +=1
						
					writingColNumber +=1

#column names for file

print "File finished!"
workbook.close()
workbook2.close()	
