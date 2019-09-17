export const api = async (pageNumber: number, gameType:string) => {
    const peopleResult = await fetch(`https://swapi.co/api/${gameType}/?page=${pageNumber}`, {method: 'GET'});
    const peopleReponse = await peopleResult.json();
    return peopleReponse;
}

export default api;