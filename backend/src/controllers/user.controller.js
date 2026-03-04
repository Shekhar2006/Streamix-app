import User from "../models/user.model.js";

export const getRecommendedUsers = async (req, res) => {

    try {
        const currentUserId  = req.user._id;
        const currentUser = await User.findById(currentUserId).select("-password");
        
        const recommendedUsers = await User.find({
            $and : [
            { _id: { $ne: currentUserId } },
            { _id: { $nin: currentUser.friends } },
            { isOnboarded: true }

        ]});

        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.log("Error getting recommended users",error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getMyFriends = async (req, res) => {
    try {
       
        const user = await User.findById(req.user._id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage").select("-password");

        res.status(200).json(user.friends);    

    } catch (error) {
        console.log("Error getting my friends",error);
        res.status(500).json({ message: "Something went wrong" });
    }
};