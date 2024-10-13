const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'REPLACE THIS WITH YOUR API KEY'; 

app.use(express.json());
app.use(express.static('public'));


app.post('/get-player', async (req, res) => {
    const { playerId } = req.body;

    if (!playerId) {
        return res.json({ message: 'Please provide a Player ID.' });
    }

    console.log(`Fetching player data for Player ID: ${playerId}`);

    try {
        
        const playerResponse = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
            headers: {
                Authorization: API_KEY
            }
        });

        const data = playerResponse.data.data; 

        
        console.log(`First Name: ${data.first_name}, Last Name: ${data.last_name}, Height: ${data.height || 'N/A'}, Weight: ${data.weight || 'N/A'}, jersey_number: ${data.jersey_number || 'N/A'}, draft_year: ${data.draft_year || 'N/A'}, draft_round: ${data.draft_round || 'N/A'}, draft_number: ${data.draft_number || 'N/A'}`);

        
        res.json({
            first_name: data.first_name,
            last_name: data.last_name,
            height: data.height || 'N/A',
            weight: data.weight || 'N/A', 
            jersey_number: data.jersey_number || 'N/A',
            draft_year: data.draft_year || 'N/A',
            draft_round: data.draft_round || 'N/A',
            draft_number: data.draft_number || 'N/A',


        });
    } catch (error) {
        if (error.response) {
            console.error('API Response Error:', error.response.data);
            res.json({ message: 'Error fetching data from API.', error: error.response.data });
        } else {
            console.error('Error fetching data from API:', error.message);
            res.json({ message: 'Error fetching data from API.' });
        }
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
