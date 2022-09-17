import cohere
import numpy as np
import re
import pandas as pd
from tqdm import tqdm
from datasets import load_dataset
import umap
import altair as alt
from sklearn.metrics.pairwise import cosine_similarity
from annoy import AnnoyIndex
import warnings
warnings.filterwarnings('ignore')
pd.set_option('display.max_colwidth', None)
import random
import math

api_key = 'Pl9CRr5m9EgVoN0zx8QZDVr7G9pXqQGk2weUGKRz'
co = cohere.Client(api_key)

d = {'text': ["I had a wonderful day!", "I had good day", "My day was alright", "My day was bad", "My day was terrible"]}

# you need to give me arr here

def afunc(arr):
    user_input = {'text': arr}

    d = pd.DataFrame(data=d)
    user_input = pd.DataFrame(user_input)

    embeds = co.embed(texts=list(d["text"]), model="large", truncate="LEFT").embeddings
    embeds = np.array(embeds)

    search_index = AnnoyIndex(embeds.shape[1], 'angular')
    for i in range(len(embeds)):
        search_index.add_item(i, embeds[i])
    search_index.build(3)
    search_index.save('test.ann')

    def getConnections(user_input):
        arr = []
        for i in range(user_input.shape[0]):
            similar_item_ids = search_index.get_nns_by_item(i,3, include_distances=True)
            arr.append([i, similar_item_ids[0][1:]])
        return arr

    connections = getConnections(user_input)
    #connections is the second thing we need to give anton

    def getSpots(user_input, d):
        arr = []
        print(user_input["text"])
        count = 0
        for i in user_input["text"]:
            query = i
            #print("HELP ME")
            #print(i)
            query_embed = co.embed(texts=[query],
                    model="large",
                    truncate="LEFT").embeddings
            similar_item_ids = search_index.get_nns_by_vector(query_embed[0],10, include_distances=True)
            arr.append([count, query, d.iloc[similar_item_ids[0][0]]['text'], random.uniform(0, 1)])
            count += 1
        print(arr)
        for i in arr:
            count = 0
            for j in d["text"]:
                #print(i[2], j)
                if i[2] == j:
                    print(count/5)
                    i[2] = (0.8 - count/5) + 0.1 + random.uniform(-0.05, 0.05)
                    break
                count += 1
        return arr

    nodes = getSpots(user_input, d)
    # first thing we need to give ainthinee

    def computeStats(main_arr):
        mean = 0
        l = len(main_arr)
        for i in main_arr:
            mean += i[2]
        mean /= l
        sd = 0
        for i in main_arr:
            sd += (i[2] - mean)
        sd /= l
        sd = math.sqrt(sd)
        if (sd > 1):
            st = "There is high standard deviations in employees today"
        if (sd > 2):
            st = "There is extremely high standard deviations in employees today"
        else:
            st = "Most employees are feeling the same today"
        if (mean > 0.8):
            m = "On average the employees are feeling really happy today"
        elif (mean > 0.6):
            m = "On average the employees are feeling happiesh today"
        elif (mean < 0.2):
            m = "On average the employees are feeling very low today"
        elif (mean < 0.4):
            m = "On average the employees are feeling sadish today"
        else:
            m = "They're alive"
        return m, st

    ms, sds = computeStats(nodes)

    return nodes, connections, ms, sds

# third thing to pass to mantoine