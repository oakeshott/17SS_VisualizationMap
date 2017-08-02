import json
import networkx as nx
import sys
import math
from math import sqrt

def parseNodes(filename="data/map.geojson"):
    with open(filename, "r") as f:
        data = json.load(f, encoding="utf-8")
    features = [feature for feature in data["features"]]
    nodes    = []
    for feature in features:
        coordinates = feature['geometry']['coordinates']
        nodes.append(str(coordinates[0]))
        nodes.append(str(coordinates[-1]))
    return list(set(nodes))
def parseEdges(filename="data/map.geojson"):
    with open(filename, "r") as f:
        data = json.load(f, encoding="utf-8")
    features = [feature for feature in data["features"]]
    edges    = []
    for feature in features:
        coordinates = feature["geometry"]["coordinates"]
        heisoku2    = feature["properties"]["Heisoku2"]
        Link_ID     = feature["properties"]["Link_ID"]
        if 1-math.fabs(heisoku2) == 0:
            p = 1000000000000
        else:
            p = math.fabs(math.log(1-math.fabs(heisoku2), 10))
        edges.append((str(coordinates[0]), str(coordinates[-1]), {"distance": sqrt((coordinates[0][0]*111263.283 - coordinates[-1][0]*111263.283)**2 + (coordinates[0][1]*111263.283 - coordinates[-1][1]*111263.283)**2), "reliability": p, "blockage": heisoku2, "Link_ID": Link_ID}))
    return edges
def str2ary(string):
    coordinates = [float(string.replace("[", "").replace("]", "").split(", ")[0]), float(string.replace("[", "").replace("]", "").split(", ")[1])]
    return coordinates
def save_file(path, filepath="data/path.geojson"):
    new_path = [str2ary(n) for n in path]
    features = {"type": "LineString", "coordinates": new_path}
    with open(filepath, "w") as f:
        f.write(json.dumps(features))
    print("convert dict to geojson")
