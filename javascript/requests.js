export async function defineProgressRequest(id, code, status) {
    const url = `
        https://progra-internet-server.herokuapp.com/api/progress/update?id=${ id }&code=${ code }&resolved=${ status }
    `;
    const request = await fetch(url, { method: 'POST' });
    return await request.json();
}

export async function getRequestsList(){
    const url = 'https://progra-internet-server.herokuapp.com/api/progress'
    const request = await fetch(url);
    return await request.json();
}
