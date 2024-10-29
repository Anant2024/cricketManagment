import Player from "../models/Players.js";

const out = async (req, res) => {
    try {
        const { run, ball, name } = req.body;

        // Find the player by name
        const player = await Player.findOne({ name });

        if (!player) {
            return res.status(404).json({ message: "Player not found in database" });
        }

        // Update player stats
        player.totalBall = ball;
        player.totalScore = run;

        // Save the updated player data
        await player.save();

        // Send a success response
        res.status(200).json({ message: "Player stats updated successfully" });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export default out;
