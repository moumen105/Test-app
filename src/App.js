import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #4fc3f7;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #e0e0e0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2d2d2d;
  color: #e0e0e0;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4fc3f7;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2d2d2d;
  color: #e0e0e0;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4fc3f7;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }
`;

const SymbolDisplay = styled.div`
  text-align: center;
  font-size: 36px;
  margin: 20px 0;
  padding: 10px;
  background-color: #2d2d2d;
  border-radius: 5px;
`;

const ResultBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #2d2d2d;
  border-radius: 5px;
  line-height: 1.6;
`;

function App() {
  const [mesures, setMesures] = useState('');
  const [numerateur, setNumerateur] = useState('');
  const [denominateur, setDenominateur] = useState('');
  const [note, setNote] = useState('noire');
  const [tempo, setTempo] = useState('');
  const [resultat, setResultat] = useState(null);

  // Dictionnaire des valeurs de notes
  const noteValues = {
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
  };

  // Dictionnaire des symboles musicaux
  const noteSymbols = {
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
  };

  const calculerDuree = () => {
    // Validation des entrées
    if (!mesures || !numerateur || !denominateur || !tempo) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const nbMesures = parseInt(mesures);
      const num = parseInt(numerateur);
      const denom = parseInt(denominateur);
      const noteVal = noteValues[note];
      const tempoVal = parseFloat(tempo);

      // Calcul de la durée selon la formule fournie
      const facteurConversion = (1 / denom) / noteVal;
      const nouveauChiffrage = num * facteurConversion;
      const dureeEnMinutes = (nbMesures * nouveauChiffrage) / tempoVal;

      // Conversion en unités de temps
      const resultatDuree = convertirEnUnitesTemps(dureeEnMinutes);
      setResultat(resultatDuree);
    } catch (error) {
      alert("Une erreur s'est produite lors du calcul. Vérifiez vos entrées.");
    }
  };

  const convertirEnUnitesTemps = (dureeEnMinutes) => {
    let millenaires = Math.floor(dureeEnMinutes / (1000 * 12 * 30 * 24 * 60));
    dureeEnMinutes %= (1000 * 12 * 30 * 24 * 60);
    
    let centuries = Math.floor(dureeEnMinutes / (100 * 12 * 30 * 24 * 60));
    dureeEnMinutes %= (100 * 12 * 30 * 24 * 60);

    let years = Math.floor(dureeEnMinutes / (12 * 30 * 24 * 60));
    dureeEnMinutes %= (12 * 30 * 24 * 60);

    let months = Math.floor(dureeEnMinutes / (30 * 24 * 60));
    dureeEnMinutes %= (30 * 24 * 60);

    let days = Math.floor(dureeEnMinutes / (24 * 60));
    dureeEnMinutes %= (24 * 60);

    let hours = Math.floor(dureeEnMinutes / 60);
    dureeEnMinutes %= 60;

    let minutes = Math.floor(dureeEnMinutes);
    let seconds = Math.floor((dureeEnMinutes - minutes) * 60);
    let milliseconds = Math.floor(((dureeEnMinutes - minutes) * 60 - seconds) * 1000);

    return { millenaires, centuries, years, months, days, hours, minutes, seconds, milliseconds };
  };

  return (
    <Container>
      <Title>🎵 Durée Musicale</Title>
      
      <FormGroup>
        <Label>Nombre de mesures :</Label>
        <Input 
          type="number" 
          value={mesures} 
          onChange={(e) => setMesures(e.target.value)} 
        />
      </FormGroup>

      <FormGroup>
        <Label>Numérateur :</Label>
        <Input 
          type="number" 
          value={numerateur} 
          onChange={(e) => setNumerateur(e.target.value)} 
        />
      </FormGroup>

      <FormGroup>
        <Label>Dénominateur :</Label>
        <Input 
          type="number" 
          value={denominateur} 
          onChange={(e) => setDenominateur(e.target.value)} 
        />
      </FormGroup>

      <FormGroup>
        <Label>Note du mouvement :</Label>
        <Select 
          value={note} 
          onChange={(e) => setNote(e.target.value)}
        >
          {Object.keys(noteValues).map((noteName) => (
            <option key={noteName} value={noteName}>
              {noteName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <SymbolDisplay>
        Symbole : {noteSymbols[note] || '❓'}
      </SymbolDisplay>

      <FormGroup>
        <Label>Tempo (BPM) :</Label>
        <Input 
          type="number" 
          value={tempo} 
          onChange={(e) => setTempo(e.target.value)} 
        />
      </FormGroup>

      <Button onClick={calculerDuree}>Calculer la durée</Button>

      {resultat && (
        <ResultBox>
          <h3>Résultat du calcul :</h3>
          <p>🕰️ {resultat.millenaires} millénaire(s)</p>
          <p>🗿 {resultat.centuries} siècle(s)</p>
          <p>📅 {resultat.years} année(s), {resultat.months} mois, {resultat.days} jour(s)</p>
          <p>⏰ {resultat.hours}h {resultat.minutes}min {resultat.seconds}s {resultat.milliseconds}ms</p>
        </ResultBox>
      )}
    </Container>
  );
}

export default App; 