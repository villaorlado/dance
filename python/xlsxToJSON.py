import re
import xlrd # this is for reading the exisitng file
import glob
from xlsxwriter.workbook import Workbook
import xlsxwriter

def col2num(col_str):
    """ Convert base26 column string to number. """
    expn = 0
    col_num = 0
    for char in reversed(col_str):
        col_num += (ord(char) - ord('A') + 1) * (26 ** expn)
        expn += 1
    return col_num-1

#open names and write to file
for fileItem in glob.glob("../data/*ah.xlsx"):	
	
	newcsv = "lkneex,lkneey,rkneex,rkneey,lwristx,lwristy,lwristz,rwristx,rwristy,rwristz,lhipx,lhipy,lhipz,rhipx,rhipy,rhipz,lshoulderx,lshouldery,rshoulderx,rshouldery"
	
	fileName = re.sub("(\.\.\/data\/|\.xlsx)","",fileItem)
	print "Reading %s" % fileItem
	
	book = xlrd.open_workbook(fileItem) 
	sh = book.sheet_by_index(0)
	
	print "File open..."
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
	
	with open ("../html/data/%s.csv" %fileName, "w") as f:
		f.write(newcsv)
	
	print "%s done!" % fileItem
