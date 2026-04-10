const fighterImageMapping = {
    "Jon Jones": "https://fightcompanion123.blob.core.windows.net/fighters/jon-jones.jpg"
}

export function getAzurePhotos(fighterName) {
    return fighterImageMapping[fighterName] || "/images/default-placeholder.png";

}

