export async function GET() {

    const apiResponse = await fetch(
        'http://120.110.115.130:5000/soil',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const data = await apiResponse.json()
    
    return Response.json(data);
}