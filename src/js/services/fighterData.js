




const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "8a7c661f94msh7c395eba01c311ap1fc439jsn7c2b71c1faf1",
        "x-rapidapi-host": "mma-api1.p.rapidapi.com"
    }
};

export async function getUfcRankings() {
    try {
        const response = await fetch("https://mma-api1.p.rapidapi.com/rankings-ufc", options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.json()
        console.log("data fetched successfully")
        return data;
        
    } catch (error) {
        console.error("The data was not retrieved successfully",error);
    }
    
}
    
