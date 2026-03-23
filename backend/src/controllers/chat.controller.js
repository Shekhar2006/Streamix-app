import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const userId = req.user._id.toString(); // ✅ FIX

        const token = await generateStreamToken(userId);

        res.status(200).json({ token });

    } catch (error) {
        console.log("Error getting stream token", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};   