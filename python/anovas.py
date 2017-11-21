import re
import xlrd # this is for reading the exisitng file
import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter
import itertools
import sys
from scipy import stats
import pandas as pd
import matplotlib.pyplot as plt
from pyvttbl import DataFrame
import seaborn 

#open the data
measurement = "acceleration"

book = xlrd.open_workbook("../data/" + measurement +"_zerocrossings.xlsx") 
sh = book.sheet_by_index(0)

csv = ",crossings,group"
counter = 1

for x in range(1, sh.nrows):
	for y in range(1, sh.ncols-3):
		number = sh.cell_value(rowx=x, colx=y)
		types = sh.cell_value(rowx=x, colx=0)
		if (types == "luruh" or types == "lanyap"):
			group = "halus"
		elif (types == "gagah" or types == "raksasa"):
			group = "gagah"
			'''
			elif (types == "wanara" or types == "jatayu"):
			group = "other"
			'''
		else:
			group = "other"
		
		csv += "\n%s,%s,%s" % (counter, number, group)
		counter += 1;

with open("../data/" + measurement +"_zerocrossings_groups.csv", "w") as file:
		file.write(csv.decode('utf-8').encode('utf-8'))
		print "File created"

datafile="../data/" + measurement +"_zerocrossings_groups.csv"
data = pd.read_csv(datafile)
 
#Create a boxplot
data.boxplot('crossings', by='group', figsize=(12, 8))
#plt.show()
plt.savefig("../data/" + measurement + '.png', bbox_inches='tight')

#ANOVA 
df=DataFrame()
df.read_tbl(datafile)
aov_pyvttbl = df.anova1way('crossings', 'group')
#print aov_pyvttbl
with open("../data/" + measurement +"_ANOVA.txt", "w") as file:
	file.write(str(aov_pyvttbl))
	print "ANOVA File created"
