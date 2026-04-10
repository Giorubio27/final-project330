const API_KEY = "98d75cdddee74e839e7a20becaece836"
const BASE_URL = "https://api.sportsdata.io/v3/mma/scores/json"

export async function getAllFighters() {
    try {
        const url = `${BASE_URL}/FightersBasic?key=${API_KEY}`
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to detch the sports data");
        }
        const data = await response.json();
        console.log("You have succesfully logged the fighter informations")
        console.log(data);
        return data;


        
    } catch (error) {
        console.error("Sports data error:", error)
        return [];
    };
    
        
}