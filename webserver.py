from StaticHelper import StaticHelper as static
from DynamicHelper import DynamicHelper as dynamic
from pprint import pprint
import json

def app(environ, start_response):
  data = ""

  #Get Subpath and figure out which page the user should go to, but ignore "subpaths"
  mainPath, fullPath = GetPathString(environ["PATH_INFO"])

  #Get Params and put them in a sensible dictionary
  sentParams = environ["QUERY_STRING"].split('&')
  params = {}
  if len(sentParams)>0:
    for param in sentParams: 
      param = param.strip()
      parts = param.split("=")
      if len(parts)>=2:
        params[parts[0]] = parts[1]

  content_type = ""
  if mainPath != "static" and mainPath != "passback":
    #Route the user to the right page
    data, content_type = dynamic.GetDynamicContent(mainPath)

  elif mainPath == "static":
    #Get the static content resource that is being asked for
    data, content_type = static.GetStaticContent(fullPath)
  elif mainPath == "passback":
    try:
      request_body_size = int(environ.get('CONTENT_LENGTH', 0))
    except (ValueError):
      request_body_size = 0

    #If the request is empty, then just ignore the data and wait for one that has legit content.
    if request_body_size > 0:
      request_body = environ['wsgi.input'].read(request_body_size)
      sentData = json.loads(request_body)
      data, content_type = dynamic.GetPassBackContent(mainPath, sentData)
    else:
      data = '{"status": "no_data_sent"}'
      content_type = "application/json"


  start_response("200 OK", [
    ("Content-Type", content_type),
    ("Content-Length", str(len(data)))
  ])

  if data:
    return iter([data])
  else:
    return ""

def GetPathString(path_info):
  subpaths = path_info.split('/')
  mainPath = ""
  if len(subpaths)>=2:
    mainPath = subpaths[1]

  fullpath = path_info[1:]
  if fullpath == "favicon.ico":
    mainPath = "static"
    fullpath = "static/images/favicon.ico"
  elif fullpath == "signups.json":
    mainPath = "static"
    fullpath = "signups.json"

  return mainPath, fullpath
