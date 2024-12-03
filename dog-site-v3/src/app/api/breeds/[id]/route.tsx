import axios from 'axios';

export async function GET(req: any, { params }: any) {
    const { id } = params;  // Extract the breed id from the URL

    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
            headers: {
                'x-api-key': process.env.VITE_SOME_KEY,
                'X-api-host': 'api.thedogapi.com',
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch breed details', { status: 500 });
    }
}
