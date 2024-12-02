import axios from 'axios'

export async function GET(req: { nextUrl: { searchParams: { breed_id: any; }; }; }) {
    const { breed_id } = req.nextUrl.searchParams
    const options = {
        method: 'GET',
        url: `https://api.thedogapi.com/v1/images/search?breed_id=${breed_id}`,
        headers: {
            'x-api-key': process.env.VITE_SOME_KEY,
            'X-api-host': 'api.thedogapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return new Response(JSON.stringify(response.data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch image' }), { status: 500 })
    }
}
