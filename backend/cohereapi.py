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
#user_input = arr

user_input = []

d = pd.DataFrame(data=d)
user_input = pd.DataFrame(user_input)

