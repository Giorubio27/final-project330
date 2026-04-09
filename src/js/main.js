import { loadHeaderFooter } from "./utils/utils.mjs";
import { getUfcRankings } from "./services/fighterData";


loadHeaderFooter();

async function initRankings() {
    const data = await getUfcRankings();

};
initRankings();
