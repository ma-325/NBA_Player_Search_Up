document.getElementById('searchButton').addEventListener('click', async () => {
    document.getElementById('playerInfo').innerHTML = ''; 

    const playerId = document.getElementById('playerId').value.trim(); 

    if (!playerId) {
        document.getElementById('playerInfo').innerText = 'Please enter a valid Player ID.';
        return; 
    }

    try {
        const response = await fetch('/get-player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerId }), 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        console.log('API Response:', data); 

        if (data.message) {
            document.getElementById('playerInfo').innerText = data.message; 
        } else {
            
            document.getElementById('playerInfo').innerHTML = `
                <strong>First Name:</strong> ${data.first_name || 'N/A'}<br>
                <strong>Last Name:</strong> ${data.last_name || 'N/A'}<br>
                <strong>Height:</strong> ${data.height || 'N/A'}<br>

                <strong>Weight:</strong> ${data.weight || 'N/A'} lbs <br>
                <strong>Jersey Number:</strong> ${data.jersey_number || 'N/A'} <br>
                <strong>Draft Year:</strong> ${data.draft_year || 'N/A'} <br>
                <strong>Draft Round:</strong> ${data.draft_round || 'N/A'} <br>    
                <strong>Draft Number:</strong> ${data.draft_number || 'N/A'}     
                `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('playerInfo').innerText = 'Error fetching player data.'; 
    }
});
