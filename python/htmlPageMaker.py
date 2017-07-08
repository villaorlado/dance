#imports
#try:
from bs4 import BeautifulSoup

#except ImportError:
#    from bs4 import BeautifulSoup

#variables
types = "luruh,lanyap,gagah,raksasa,wanara,jatayu".split(",")
html = open("dummy.html").read()

for t in types:	
	
	newhtml = html.replace("&&&",t);
	soup = BeautifulSoup(newhtml, "html.parser")
	soup.title.string = t.title();
	
	heather = soup.find("h1", {"class" : "page-header"})
	heather.string = t.title(); 
	
	video =  soup.find("source")
	video["src"] = "videos/%s.mp4" %t
	
	for li in soup.find_all('li'):
		if (li.a.text.replace(" ","") == t.title()):
			li['class'] = 'active'
	
	with open("../html/%s.html" % t, "w") as file:
		file.write(soup.prettify())
	print "%s.html created succesfully!" % t
