from bs4 import BeautifulSoup as bs
import json
from pprint import pprint
from datetime import datetime
import requests

class DynamicHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetDynamicContent(mainPath):
    if mainPath == "canvas":
      data = "<html><head></head><body>This page is not real</body></html>"
      content_type = "text/html"

    else:
      with open('static/home.html', 'r') as myHome:
        #data = myHome.read()
        pageData = myHome.read()
      pageSoup = bs(pageData)
      templateBlocks = pageSoup.find_all("svgtemplate")

      for block in templateBlocks:
        pageURL = block.get_text()
        
        with open("static/images/"+pageURL) as svg:
          SVG_content = svg.read()
          SVG_soup = bs(SVG_content)

        block.replaceWith(SVG_soup.find("svg"))

      data = (pageSoup.prettify()).encode('utf-8').strip()
      content_type = "text/html"

    return data, content_type