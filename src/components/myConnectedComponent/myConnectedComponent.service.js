export const getMyData = async () => {
    const result = await fetch('/api/myroute/myroute');
    return await result.json();
};