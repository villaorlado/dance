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

#Velocity
book = xlrd.open_workbook("../data/all.xlsx") 
sh = book.sheet_by_index(0)
workbook = xlsxwriter.Workbook('../data/velocity.xlsx')
worksheet = workbook.add_worksheet()

for y in range(0, sh.ncols):
	joint = sh.cell_value(rowx=0, colx=y)
	worksheet.write(0, y, joint)

	for x in range(2, sh.nrows):
		currentVal = sh.cell_value(rowx=x, colx=y)
		previousVal = sh.cell_value(rowx=x-1, colx=y)
		difference = currentVal - previousVal
		worksheet.write(x, y, difference)

print "Velocity finished!"
workbook.close()

#Acceleration
book = xlrd.open_workbook("../data/velocity.xlsx") 
sh = book.sheet_by_index(0)
workbook = xlsxwriter.Workbook('../data/acceleration.xlsx')
worksheet = workbook.add_worksheet()

for y in range(0, sh.ncols):
	joint = sh.cell_value(rowx=0, colx=y)
	worksheet.write(0, y, joint)

	for x in range(3, sh.nrows):
		currentVal = sh.cell_value(rowx=x, colx=y)
		previousVal = sh.cell_value(rowx=x-1, colx=y)
		difference = currentVal - previousVal
		worksheet.write(x, y, difference)

print "Acceleration finished!"
workbook.close()

#Jerkiness
book = xlrd.open_workbook("../data/acceleration.xlsx") 
sh = book.sheet_by_index(0)
workbook = xlsxwriter.Workbook('../data/jerkiness.xlsx')
worksheet = workbook.add_worksheet()

for y in range(0, sh.ncols):
	joint = sh.cell_value(rowx=0, colx=y)
	worksheet.write(0, y, joint)

	for x in range(4, sh.nrows):
		currentVal = sh.cell_value(rowx=x, colx=y)
		previousVal = sh.cell_value(rowx=x-1, colx=y)
		difference = currentVal - previousVal
		worksheet.write(x, y, difference)

print "Jerkiness finished!"
workbook.close()
