export const getCoinList = async (limit = 250) => {
    const result = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit}`);
    return await result.json();
};