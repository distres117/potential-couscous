import arcpy, sys, os
XML_PATH = r"\\vnxfileserver\GIS_FILES\SDE_IMPORT\READY_TO_LOAD\metadata_export"
TRANSLATOR = r"\\vnxfileserver\GIS_FILES\GIS_TOOLS\Translator\ARCGIS2FGDC.xml"
GDB = r"\\vnxfileserver\GIS_FILES\SDE_IMPORT\READY_TO_LOAD\Data_to_import.gdb"
datasetName = sys.argv[1]
datasetType = sys.argv[2]
arcpy.env.overwriteOutput = True
arcpy.env.workspace = GDB

def exportMetadata(datasetN, datasetT):
    if not datasetN:
        print("arguments are invalid")
        return
    dataset = []
    if datasetT == "3":
        pass
    elif datasetT == "2":
        pass
    elif datasetT == "1":
        dataset = arcpy.ListFeatureClasses(str(datasetN))
    else:
        return
    if dataset.count == 0:
        print("cannot find dataset")
        return
    outXml = os.path.join(XML_PATH, datasetN + ".xml")
    if os.path.exists(outXml) == False:
        arcpy.ExportMetadata_conversion(dataset[0], TRANSLATOR, outXml)
        print("success with export")
        return
    else:
        print("success")
        return

exportMetadata(datasetName, datasetType)