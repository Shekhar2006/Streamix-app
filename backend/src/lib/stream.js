import { StreamChat } from "stream-chat";
import "dotenv/config";

const streamapi = process.env.STREAM_API_KEY;
const streamsecret = process.env.STREAM_API_SECRET;

if(!streamapi || !streamsecret){
    throw new Error("Missing Stream API key or secret");
}

const streamClient = StreamChat.getInstance(streamapi, streamsecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;

    } catch (error) {
        console.log("Error upserting user to Stream chat",error);
    }
};

// export const generateStreamToken = async (userId) => {};

