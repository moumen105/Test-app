from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def convertir_en_valeur(note):
    notes = {
        'ronde': 1,
        'blanche': 1 / 2,
        'noire': 1 / 4,
        'croche': 1 / 8,
        'double croche': 1 / 16,
        'triple croche': 1 / 32,
        'quadruple croche': 1 / 64,
        'ronde pointée': 1 + 1/2,
        'blanche pointée': 1/2 + 1/4,
        'noire pointée': 1/4 + 1/8,
        'croche pointée': 1/8 + 1/16,
        'double croche pointée': 1/16 + 1/32,
        'ronde doublement pointée': 1 + 1/2 + 1/4,
        'blanche doublement pointée': 1/2 + 1/4 + 1/8,
        'noire doublement pointée': 1/4 + 1/8 + 1/16,
        'croche doublement pointée': 1/8 + 1/16 + 1/32,
        'double croche doublement pointée': 1/16 + 1/32 + 1/64,
    }
    return notes.get(note.strip().lower(), None)

# Dictionnaire des symboles musicaux
note_symbols = {
    'ronde': 'o',
    'blanche': 'b',
    'noire': '♩',
    'croche': '♪',
    'double croche': '♫',
    'triple croche': '♬',
    'quadruple croche': '♬♬',
    'ronde pointée': 'o.',
    'blanche pointée': 'b.',
    'noire pointée': '♩.',
    'croche pointée': '♪.',
    'double croche pointée': '♬.',
    'ronde doublement pointée': 'o..',
    'blanche doublement pointée': 'b..',
    'noire doublement pointée': '♩..',
    'croche doublement pointée': '♪..',
    'double croche doublement pointée': '♬..'
}

def convertir_en_unites_temps(duree_en_minutes):
    millenaires = duree_en_minutes // (1000 * 12 * 30 * 24 * 60)
    duree_en_minutes %= (1000 * 12 * 30 * 24 * 60)
    
    centuries = duree_en_minutes // (100 * 12 * 30 * 24 * 60)
    duree_en_minutes %= (100 * 12 * 30 * 24 * 60)

    years = duree_en_minutes // (12 * 30 * 24 * 60)
    duree_en_minutes %= (12 * 30 * 24 * 60)

    months = duree_en_minutes // (30 * 24 * 60)
    duree_en_minutes %= (30 * 24 * 60)

    days = duree_en_minutes // (24 * 60)
    duree_en_minutes %= (24 * 60)

    hours = duree_en_minutes // 60
    duree_en_minutes %= 60

    minutes = int(duree_en_minutes)
    seconds = (duree_en_minutes - minutes) * 60
    milliseconds = (seconds - int(seconds)) * 1000

    return {
        'millenaires': int(millenaires),
        'centuries': int(centuries),
        'years': int(years),
        'months': int(months),
        'days': int(days),
        'hours': int(hours),
        'minutes': int(minutes),
        'seconds': int(seconds),
        'milliseconds': int(milliseconds)
    }

def calculer_duree(nmb_mesures, numerateur, denominateur_valeur, note2, mouvement_metronomique):
    facteur_conversion = (1 / denominateur_valeur) / note2
    nouveau_chiffrage = numerateur * facteur_conversion
    duree_en_minutes = (nmb_mesures * nouveau_chiffrage) / mouvement_metronomique
    return convertir_en_unites_temps(duree_en_minutes)

@app.route('/api/notes', methods=['GET'])
def get_notes():
    return jsonify({
        'notes': list(note_symbols.keys()),
        'symbols': note_symbols
    })

@app.route('/api/calculer', methods=['POST'])
def calculer():
    data = request.json
    
    try:
        mesures = int(data.get('mesures'))
        numerateur = int(data.get('numerateur'))
        denominateur = int(data.get('denominateur'))
        note = data.get('note')
        tempo = float(data.get('tempo'))
        
        note_val = convertir_en_valeur(note)
        if note_val is None:
            return jsonify({'error': 'Note invalide'}), 400
            
        duree = calculer_duree(mesures, numerateur, denominateur, note_val, tempo)
        return jsonify({
            'duree': duree,
            'note_symbol': note_symbols.get(note.lower(), "❓")
        })
        
    except (ValueError, TypeError) as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 