import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
            headers: {
                'x-api-key': process.env.VITE_SOME_KEY,
                'X-api-host': 'api.thedogapi.com',
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch breeds', { status: 500 });
    }
}