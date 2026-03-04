import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const getRecommendedUsers = async (req, res) => {

    try {
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId).select("-password");

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true }

            ]
        });

        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.log("Error getting recommended users", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getMyFriends = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage").select("-password");
        res.status(200).json(user.friends);

    } catch (error) {
        console.log("Error getting my friends", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: friendId } = req.params.id;

        // check if user is sending a friend request to themselves
        if (myId === friendId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" })
        }

        // check if friend exists
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(400).json({ message: "Friend not found" });
        }

        // check if user is already friends
        if (friend.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }
        
        // check if friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: friendId },
                { sender: friendId, recipient: myId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "You have already sent a friend request to this user" });
        }

        const friendRequest = new FriendRequest({ sender: myId, recipient: friendId });
        await friendRequest.save();

        res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        console.log("Error sending friend request", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const acceptFriendRequest = async (req, res) => {

    try {
        const {requestId} = req.params._id;
        const friendRequest = await FriendRequest.findById(requestId);   

        if (!friendRequest) {
            return res.status(400).json({ message: "Friend request not found" });
        }

        if( friendRequest.recipient !== req.user._id ){
            return res.status(400).json({ message: "You are not the recipient of this friend request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to others friends array
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.recipient } });
        await User.findByIdAndUpdate(friendRequest.recipient, { $addToSet: { friends: friendRequest.sender } });

        res.status(200).json({ message: "Friend request accepted successfully" });

    } catch (error) {
        console.log("Error accepting friend request", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getFriendRequests = async (req, res) => {
    try {
        const friendRequests = await FriendRequest.find({ recipient: req.user._id, status: "pending" }).populate("sender", "fullName profilePic nativeLanguage learningLanguage").select("-password");
        const acceptedRequests = await FriendRequest.find({ recipient: req.user._id, status: "accepted" }).populate("recipient", "fullName profilePic").select("-password");
        res.status(200).json({ friendRequests, acceptedRequests });
    } catch (error) {
        console.log("Error getting friend requests", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getOutgoingFriendRequests = async (req, res) => {
    try {
        const outgoingRequests = await FriendRequest.find({ sender: req.user._id, status: "pending" }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage").select("-password");
        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error getting outgoing friend requests", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}