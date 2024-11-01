
 


import Player from '../models/Players.js';

// Create and Save multiple Players for two teams
export const createPlayers = async (req, res) => {
  try {
    const { team1Players, team2Players } = req.body;

    // Validate request
    if (!team1Players || !team2Players) {
      return res.status(400).send({ message: 'Player details for both teams are required' });
    }

    // Save Players for team1
    const savedTeam1Players = await Player.insertMany(team1Players.map(player => ({
      name: player.name,
      totalScore: 0,
      totalBalls: 0,
      image: player.image
    })));

    // Save Players for team2
    const savedTeam2Players = await Player.insertMany(team2Players.map(player => ({
      name: player.name,
      totalScore: 0,
      totalBalls: 0,
      image: player.image
    })));

    res.status(201).send({ team1: savedTeam1Players, team2: savedTeam2Players });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while saving the players.'
    });
  }
};
//export {createPlayers}
