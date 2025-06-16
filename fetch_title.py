from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/get-title')
def get_title():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'Missing URL'}), 400

    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string.strip() if soup.title else 'No Title Found'
        return jsonify({'title': title})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
