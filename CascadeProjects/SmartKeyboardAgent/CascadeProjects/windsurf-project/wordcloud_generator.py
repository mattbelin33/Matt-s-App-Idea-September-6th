from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter

# Sample search data (in a real scenario, you'd fetch this from Google Trends API)
search_terms = [
    'AI advancements 2025', 'sustainable technology', 'quantum computing',
    'metaverse development', 'renewable energy', 'space exploration',
    'AI ethics', 'climate change solutions', '5G technology', 'smart cities',
    'artificial intelligence', 'machine learning', 'virtual reality',
    'augmented reality', 'blockchain technology', 'cybersecurity trends',
    'electric vehicles', 'autonomous driving', 'robotics', 'quantum supremacy',
    'AI healthcare', 'remote work tools', 'web3 development', 'NFTs',
    'cryptocurrency trends', 'sustainable fashion', 'clean energy',
    'space tourism', 'brain-computer interfaces', 'biotechnology',
    'AI in education', 'quantum internet', '6G technology', 'smart homes',
    'AI art generation', 'sustainable agriculture', 'ocean cleanup',
    'fusion energy', 'AI ethics guidelines', 'quantum cryptography'
]

def generate_wordcloud():
    # Process the text
    text = ' '.join(term.lower() for term in search_terms)
    
    # Count word frequencies
    word_freq = Counter(text.split())
    
    # Generate word cloud
    wordcloud = WordCloud(
        width=1200,
        height=800,
        background_color='white',
        max_words=100,
        contour_width=3,
        contour_color='steelblue',
        colormap='viridis'
    ).generate_from_frequencies(word_freq)
    
    # Display the word cloud
    plt.figure(figsize=(14, 10))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title('Top Google Search Topics 2025', fontsize=24, pad=20)
    plt.tight_layout(pad=0)
    
    # Save the word cloud
    output_file = 'google_trends_2025_wordcloud.png'
    plt.savefig(output_file, bbox_inches='tight', dpi=300)
    plt.close()
    return output_file

if __name__ == '__main__':
    output = generate_wordcloud()
    print(f"Word cloud generated and saved as: {output}")
