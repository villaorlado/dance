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

#iterate through body types
for fileItem in types:
	
	sys.stdout.write('\r' + "Reading %s... " % fileItem)
	sys.stdout.flush()
	#print "Reading %s ..." % fileItem	
	book = xlrd.open_workbook("../data/%s.xlsx" % fileItem) 
	sh = book.sheet_by_index(0)	
	print "% open" % fileItem
	
	for y in range(0, sh.ncols):
		for measurement in measurements:
			reading = sh.cell_value(rowx=36, colx=y)
	
			if (measurement == reading):
				for key,value in sorted(xyz.items()):
					worksheet.write(0, writingColNumber, "%s_%s_%s" %(fileItem,measurement,key))
					writingRowNumber = 1
					for x in range(38, sh.nrows):
						worksheet.write(writingRowNumber, writingColNumber, sh.cell_value(rowx=x, colx=y+value))
						writingRowNumber +=1
					writingColNumber +=1
			
print "File finished!"
workbook.close()		
#print sorted(allvalues)

'''
for x in range(38, sh.nrows):
	newcsv += "\n"
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("FT"))) #leftKneeX CH
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("FU"))) #leftKneeY 
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GF"))) #rightKneeX 
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GG"))) #rightKneeY 
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GU"))) #leftWristX
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GV"))) #leftWristY
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GW"))) #leftWristZ
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("HD"))) #rigthWristX
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("HE"))) #rigthWristY
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("HF"))) #rigthWristZ
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("FQ"))) #lhipx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("FR"))) #lhipy
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("FS"))) #lhipz
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GC"))) #rhipx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GD"))) #rhipy
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GE"))) #rhipz
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GO"))) #lshoulderx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GP"))) #lshouldery
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GX"))) #rshoulderx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GY"))) #rshouldery
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GO"))) #lelbowx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GP"))) #lelbowy
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GX"))) #relbowx
	newcsv += "%s," % str(sh.cell_value(rowx=x, colx=col2num("GY"))) #relbowy
	
#end
with open ("../html/data/all.csv" %fileName, "w") as f:
	f.write(newcsv)
	
print "all.csv done!"
'''
