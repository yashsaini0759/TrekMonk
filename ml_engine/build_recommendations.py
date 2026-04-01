import json
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Paths
SOURCE_FILE = 'treks_source.json'
# We will save the output directly to the frontend src/data directory
OUTPUT_DIR = '../src/data'
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'ml_recommendations.json')
UNIFIED_DATA_FILE = os.path.join(OUTPUT_DIR, 'unifiedTrekData.json')

def load_data():
    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def build_recommendations():
    print("🚀 Starting TrekMonk ML Engine...")
    treks = load_data()
    
    # 1. Convert to DataFrame
    df = pd.DataFrame(treks)
    print(f"Loaded {len(df)} treks from dataset.")
    
    # 2. Feature Engineering - Combine text fields into a single "content" document for NLP
    # We heavily weight 'mood', 'feel', and 'tags'
    df['tags_string'] = df['tags'].apply(lambda x: " ".join(x))
    df['combined_features'] = (
        df['mood'] + " " + 
        df['feel'] + " " + 
        df['tags_string'] + " " + 
        df['type'] + " " + 
        df['region']
    )
    
    # 3. TF-IDF Vectorization
    print("📊 Computing TF-IDF vectors...")
    # remove english stopwords and compute TF (Term Frequency) - IDF (Inverse Document Frequency)
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['combined_features'])
    
    # 4. Compute Cosine Similarity Matrix
    print("🧮 Calculating Cosine Similarity Matrix...")
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # 5. Generate Recommendations Map
    # For each trek, find the top 8 most similar treks
    recommendations_map = {}
    
    for idx, row in df.iterrows():
        trek_id = row['id']
        trek_region = row['region']
        
        # Get similarity scores for this trek against all others
        sim_scores = list(enumerate(cosine_sim[idx]))
        
        # Sort treks based on similarity scores (highest first)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        same_region_matches = []
        other_region_matches = []
        
        for i, score in sim_scores:
            # Skip the first one because it's the trek itself (similarity = 1.0)
            if df.iloc[i]['id'] == trek_id:
                continue
                
            match_region = df.iloc[i]['region']
            if match_region == trek_region:
                same_region_matches.append(df.iloc[i]['id'])
            else:
                other_region_matches.append(df.iloc[i]['id'])
        
        # 1st priority: Same region (Top 5)
        # 2nd priority: Similar places from other categories (Top 3)
        top_similar = same_region_matches[:5] + other_region_matches[:3]
        
        # Fallback padding if data is sparse
        if len(top_similar) < 8:
            top_similar = (same_region_matches + other_region_matches)[:8]
            
        recommendations_map[trek_id] = top_similar
        
    # 6. Save outputs
    # Ensure export directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Save the ML recommendations map mapping Trek ID -> [Related Trek IDs]
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(recommendations_map, f, indent=2)
        
    # Also save the source dataset to the frontend so it can be used to render the cards
    with open(UNIFIED_DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(treks, f, indent=2)
        
    print(f"✅ ML recommendations saved to: {OUTPUT_FILE}")
    print(f"✅ Unified trek data saved to: {UNIFIED_DATA_FILE}")
    print("Engine finished successfully.")

if __name__ == "__main__":
    build_recommendations()
