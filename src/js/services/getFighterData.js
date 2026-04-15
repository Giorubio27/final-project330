const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key":"8a7c661f94msh7c395eba01c311ap1fc439jsn7c2b71c1faf1",
        "x-rapidapi-host": " ufc-fighters.p.rapidapi.com"
    }
};

export async function getUfcFighterData() {
    try {
        const response = await fetch("https://ufc-fighters.p.rapidapi.com/fighters/champions", options)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fighter data logged successfully")
        console.log(data)
        return data;
    } catch (error) {
        console.error("The fighter data was not retrieved sucessfully")
    };
    
    
    
}