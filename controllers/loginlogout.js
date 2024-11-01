// import { User } from "../models/user.js";

// const generateAccessAndRefereshTokens = async(userId) =>{
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false })

//         return {accessToken, refreshToken}


//     } catch (error) {
//         console.log(500, "Something went wrong while generating referesh and access token")
//     }
// }

// const login=async(req,res)=>{
//     const {email, password}=req.body;
//     if([email,password].some((field)=>field==="")){
//         console.log("Enter email and password")
//         return res.status(400).json({message:"Both email and password are required"})
//     }
//     const user=await User.findOne({
//     email
//     })
//     if(!user){
//         console.log("provide valid email")
//         res.send("provide valid email")
//         return;
//     }
//     const isPasswordValid=await user.isPasswordCorrect(password)
//     const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
        
           
            
//                { user: loggedInUser, accessToken, refreshToken},
            
//             "User logged In Successfully"
//         )
    


// }

// // const logout=async()

// export {login}


import { User } from "../models/user.js";
import { ApiError } from "../utils/Apierror.js";

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new ApiError(404, "User not found");
//         }
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken };
//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
//     }
// }
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error); // Log the error for debugging
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field) => field === "")) {
            console.log("Enter email and password");
            return res.status(400).json({ message: "Both email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Provide valid email");
            return res.status(400).json({ message: "Invalid email provided" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };
        console.log("logged in successfully")
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ user: loggedInUser, accessToken, refreshToken });
           
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

const logout=async(req,res)=>{
   
    await User.findByIdAndUpdate(
        req.user._id,
        {$unset:{refreshToken:1}},//this will remove refreshtoken
        {
            new:true
        }
        )
        const options = {
            httpOnly: true,
            secure: true
        };
        console.log("logout successfully")
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json("User Logged out")

}

export { login ,logout}
