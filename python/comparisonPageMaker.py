#imports
from bs4 import BeautifulSoup

#variables
types = "luruh,lanyap,gagah,raksasa,wanara,jatayu".split(",")
measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")
xyz = "x,y,z".split(",")
html = open("comparison_dummy.html").read()

soup = BeautifulSoup(html, "html.parser")
	
	
select = soup.find("select", {"id" : "joint1"})
for m in measurements:
	newOption= soup.new_tag("option", value=m)
	optionName = m.replace("L", "Left ", 1)
	optionName = optionName.replace("R", "Right ", 1)
	optionName = optionName.replace("Angles","")
	newOption.string = optionName
	select.append(newOption)

select = soup.find("select", {"id" : "joint2"})
for m in measurements:
	newOption= soup.new_tag("option", value=m)
	optionName = m.replace("L", "Left ", 1)
	optionName = optionName.replace("R", "Right ", 1)
	optionName = optionName.replace("Angles","")
	newOption.string = optionName
	select.append(newOption)
	
with open("../html/comparisons.html", "w") as file:
	file.write(soup.prettify())
print "comparisons.html created succesfully!"
