#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      omcrobbie
#
# Created:     16/12/2016
# Copyright:   (c) omcrobbie 2016
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import arcpy, json, os, types, sys
from xml.parsers.expat import ParserCreate

datasetName = sys.argv[1] if len(sys.argv) > 1 else ""
datasetType = sys.argv[2] if len(sys.argv) > 2 else ""
location = sys.argv[3] if len(sys.argv) > 3 else ""
localWs = r"\\vnxfileserver\GIS_FILES\SDE_IMPORT\READY_TO_LOAD\Data_to_import.gdb"
dbWs = r"\\vnxfileserver\GIS_FILES\GIS_TOOLS\SDE_connections\voemsql1_mapexporter.sde"
XML_PATH = r"\\vnxfileserver\GIS_FILES\SDE_IMPORT\READY_TO_LOAD\metadata_export"
TRANSLATOR = r"\\vnxfileserver\GIS_FILES\GIS_TOOLS\Translator\ARCGIS2FGDC.xml"

class Xml2Json:
    LIST_TAGS = ['COMMANDS']

    def __init__(self, data = None):
        self._parser = ParserCreate()
        self._parser.StartElementHandler = self.start
        self._parser.EndElementHandler = self.end
        self._parser.CharacterDataHandler = self.data
        self.result = None
        if data:
            self.feed(data)
            self.close()

    def feed(self, data):
        self._stack = []
        self._data = ''
        self._parser.Parse(data, 0)

    def close(self):
        self._parser.Parse("", 1)
        del self._parser

    def start(self, tag, attrs):
        assert attrs == {}
        assert self._data.strip() == ''
        #print "START", repr(tag)
        self._stack.append([tag])
        self._data = ''

    def end(self, tag):
        #print "END", repr(tag)
        last_tag = self._stack.pop()
        assert last_tag[0] == tag
        if len(last_tag) == 1: #leaf
            data = self._data
        else:
            if tag not in Xml2Json.LIST_TAGS:
                # build a dict, repeating pairs get pushed into lists
                data = {}
                for k, v in last_tag[1:]:
                    if k not in data:
                        data[k] = v
                    else:
                        el = data[k]
                        if type(el) is not list:
                            data[k] = [el, v]
                        else:
                            el.append(v)
            else: #force into a list
                data = [{k:v} for k, v in last_tag[1:]]
        if self._stack:
            self._stack[-1].append((tag, data))
        else:
            self.result = {tag:data}
        self._data = ''

    def data(self, data):
        self._data = data


def convert(dataset):
    pass


def getFields(dataset):
    fields = []
    for field in arcpy.ListFields(dataset):
        if (field.type not in ["OID", "Geometry"]):
            fieldDict = {}
            fieldDict["alias"] = field.aliasName
            fieldDict["name"] = field.name
            fieldDict["type"] = field.type
            fieldDict["domain"] = field.domain
            fields.append(fieldDict)
    return fields

def getMetadata(datasetN):
    outXmlPath = os.path.join(XML_PATH, datasetN + ".xml")
    try:
        outXml = open(outXmlPath,"r")
    except:
        arcpy.AddMessage('Metadata not found')
        return
    return Xml2Json(outXml.read()).result

def runProcess():
    outputDict = {}
    # get contents of db
    if datasetName == "" or not datasetName: # just list the contents of ready_to_load
        arcpy.env.workspace = localWs
        outputDict['featureClasses'] = [str(dataset) for dataset in arcpy.ListFeatureClasses()]
        outputDict['rasters'] = [str(dataset) for dataset in arcpy.ListRasters()]
        outputDict['tables'] = [str(dataset) for dataset in arcpy.ListTables()]
        return outputDict
    elif datasetName: # if name is provided, get the details for the dataset
        dataset = None
        if location == "sde": # if the location is provided as sde it will return all the versions currently in sde, also this is a strict search -- names must match exactly
            dataset = os.path.join(dbWs, datasetName)
            outputDict['sdeVersions'] = [version for version in arcpy.ListVersions(dbWs)]
        else:
            arcpy.env.workspace = localWs # else if the location is local a fuzzy search will be performed
            if datasetType == "3":
                dataset = arcpy.ListTables(datasetName)
            elif datasetType == "2":
                dataset = arcpy.ListRasters(datasetName)
            else:
                dataset = arcpy.ListFeatureClasses(datasetName)
        if dataset != None or dataset.count > 0: # if results were returned
            try: # try/except because we want a more graceful error when dataset is not found using strict searching
                if isinstance(dataset, types.ListType): # checking to see if search results are either a string or a list (results from two search types)
                    des = arcpy.Describe(dataset[0])
                    dataset = dataset[0]
                else:
                    des = arcpy.Describe(dataset)
            except:
                raise ValueError("dataset not found")
                #outputDict["error"] = 'dataset not found'
                #return outputDict #get out of here if data not found
            outputDict["catalogPath"] = des.catalogPath
            if datasetType == "table": #TODO
                pass
            elif datasetType == "raster": #TODO
                pass
            else:
                # feature class properties
                outputDict["featureType"] = des.featureType
                outputDict["shapeType"] = des.shapeType
                outputDict["fields"] = getFields(dataset)
            outputDict["metadata"] = getMetadata(des.name) # TODO: strip sde from dataset name (if exists) to allow for more flexible search
            return outputDict
        else:
            raise ValueError("dataset not found")
#****************** execution
output = json.dumps(runProcess())
print(output)





