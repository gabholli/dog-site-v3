import axios from 'axios';

const apiKey = process.env.VITE_SOME_KEY;
const apiUrl = 'https://api.thedogapi.com/v1/breeds';

async function getRequest(options: { method: string; url: string; headers: { 'x-api-key': string | undefined; 'X-api-host': string; }; }) {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('API request failed');
    }
}

export async function GET() {
    const options = {
        method: 'GET',
        url: apiUrl,
        headers: {
            'x-api-key': apiKey,
            'X-api-host': 'api.thedogapi.com',
        },
    };

    const data = await getRequest(options);
    return new Response(JSON.stringify(data), { status: 200 });
}
