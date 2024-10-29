// import mongoose, { Schema } from "mongoose";

// const playerSchema = new Schema({
  
//   team: {
//     type: String,
//     required: true
//   },
//   index:{
//     type: Number,
//     required:true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   totalScore: {
//     type: Number,
//     default: 0
//   },
//   totalBallsPlayed: {
//     type: Number,
//     default: 0
//   },
//   totalFours: {
//     type: Number,
//     default: 0
//   },
//   totalSixes: {
//     type: Number,
//     default: 0
//   },
// status:{
// type:String,
// default:"yet to bat"}
// });

// export const Player = mongoose.model("Player", playerSchema);


import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  totalBall: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Player = mongoose.model('Player', playerSchema);

export default Player;

