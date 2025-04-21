import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';

// URL de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [symbols, setSymbols] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Formulaire
  const [mesures, setMesures] = useState('');
  const [numerateur, setNumerateur] = useState('');
  const [denominateur, setDenominateur] = useState('');
  const [noteSelectionnee, setNoteSelectionnee] = useState('');
  const [tempo, setTempo] = useState('');
  
  // Résultat
  const [resultat, setResultat] = useState(null);
  const [noteSymbol, setNoteSymbol] = useState('❓');
  
  // Charger les notes disponibles au démarrage
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notes`);
        setNotes(response.data.notes);
        setSymbols(response.data.symbols);
        
        // Définir la note par défaut
        if (response.data.notes.length > 0) {
          setNoteSelectionnee(response.data.notes[0]);
          setNoteSymbol(response.data.symbols[response.data.notes[0]]);
        }
      } catch (err) {
        setError('Erreur lors du chargement des notes musicales');
        console.error(err);
      }
    };
    
    fetchNotes();
  }, []);
  
  // Mettre à jour le symbole quand la note change
  const handleNoteChange = (event) => {
    const selectedNote = event.target.value;
    setNoteSelectionnee(selectedNote);
    setNoteSymbol(symbols[selectedNote] || '❓');
  };
  
  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResultat(null);
    
    try {
      const response = await axios.post(`${API_URL}/api/calculer`, {
        mesures: mesures,
        numerateur: numerateur,
        denominateur: denominateur,
        note: noteSelectionnee,
        tempo: tempo
      });
      
      setResultat(response.data.duree);
      setNoteSymbol(response.data.note_symbol);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Erreur lors du calcul. Vérifiez vos entrées.');
      console.error(err);
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎵 Calculateur de Durée Musicale
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Calculer la durée d'un morceau
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de mesures"
                  variant="outlined"
                  type="number"
                  value={mesures}
                  onChange={(e) => setMesures(e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tempo (BPM)"
                  variant="outlined"
                  type="number"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Numérateur"
                  variant="outlined"
                  type="number"
                  value={numerateur}
                  onChange={(e) => setNumerateur(e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dénominateur"
                  variant="outlined"
                  type="number"
                  value={denominateur}
                  onChange={(e) => setDenominateur(e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Note du mouvement</InputLabel>
                  <Select
                    value={noteSelectionnee}
                    label="Note du mouvement"
                    onChange={handleNoteChange}
                  >
                    {notes.map((note) => (
                      <MenuItem key={note} value={note}>
                        {note} ({symbols[note] || '❓'})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" className="note-symbol">
                  {noteSymbol}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Calculer la durée'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        
        {resultat && (
          <Card className="result-card" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Durée du morceau :
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.millenaires} millénaire(s)
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.centuries} siècle(s)
                    </span>
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.years} année(s)
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.months} mois
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.days} jour(s)
                    </span>
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.hours} heure(s)
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.minutes} minute(s)
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.seconds} seconde(s)
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span className="time-value">
                      {resultat.milliseconds} ms
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', p: 6, mt: 'auto' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Calculateur de Durée Musicale. Tous droits réservés.'}
        </Typography>
      </Box>
    </Box>
  );
}

export default App; 