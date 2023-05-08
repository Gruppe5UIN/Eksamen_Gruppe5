import { client } from "./client"

export const getUserByEmail = async (email) => { 
    const query = `*[_type == "user" && email == $email][0]`;

    try {
        const result = await client.fetch(query, { email });
        return result;
    } catch (error) {
        console.error(error);
    }
}