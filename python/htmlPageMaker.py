#imports
from bs4 import BeautifulSoup

#variables
types = "luruh,lanyap,gagah,raksasa,wanara,jatayu".split(",")
measurements = "LKneeAngles,RKneeAngles,LWristAngles,RWristAngles,LHipAngles,RHipAngles,RShoulderAngles,LShoulderAngles,RElbowAngles,LElbowAngles".split(",")
xyz = "x,y,z".split(",")
html = open("dummy.html").read()

for t in types:		
	newhtml = html.replace("&&&",t);
	soup = BeautifulSoup(newhtml, "html.parser")
	soup.title.string = t.title();
	
	heather = soup.find("h1", {"class" : "page-header"})
	heather.string = t.title(); 
	
	video =  soup.find("source")
	video["src"] = "videos/%s.mp4" %t
	
	select = soup.find("select")
	for m in measurements:
		for dimension in xyz:
			optionValue = "%s_%s_%s" % (t,m,dimension)
			optionName = m.replace("L", "Left ", 1)
			optionName = optionName.replace("R", "Right ", 1)
			optionName = optionName.replace("Angles","")
			optionName = "%s (%s)" % (optionName,dimension)
			newOption= soup.new_tag("option", value=optionValue)
			newOption.string = optionName
			select.append(newOption)
	
	for li in soup.find_all('li'):
		if (li.a.text.replace(" ","") == t.title()):
			li['class'] = 'active'
	
	with open("../html/%s.html" % t, "w") as file:
		file.write(soup.prettify())
	print "%s.html created succesfully!" % t
