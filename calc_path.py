import json
import networkx as nx
from utility import parseEdges, parseNodes, save_file

def main():
    # Definenation
    G     = nx.Graph()
    nodes = parseNodes()
    edges = parseEdges()
    for node in nodes:
        G.add_node(node, pos=(float(node.split(',')[0].replace('[', '')), float(node.split(',')[1].replace(']', ''))))
    G.add_edges_from(edges)

    target = '[136.867128691108, 35.134484437244]'
    source = '[136.883788628839, 35.143526564199]'

    """
    Calculate a path from source to target
    ここを編集
    """
    path = nx.dijkstra_path(G, source=source, target=target, weight="distance") # calculate the shortest path

    # save path
    save_file(path)

if __name__ == '__main__':
    main()
