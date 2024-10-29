import { Score } from "../models/Score.js";

const description = async (req, res) => {
  const des = req.body;

  try {
    const updatedScore = await Score.findOneAndUpdate(
      {}, // Empty condition to match any document since you have a single document
      {
        $set: {
          team1: des.team1,
          team2: des.team2,
          totalOvers: des.totalOvers,
          Tossresult:des.tossResultF
        }
      },
      { new: true }
      
    );

    console.log( des);
   
    res.send("Description saved Successfully");
  } catch (error) {
    console.log("Error while setting the description", error);
    res.status(500).send("Internal Server Error");
  }
};

export { description }; // Export the description function
