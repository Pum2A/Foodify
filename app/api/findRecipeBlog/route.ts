import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`DuckDuckGo API error: ${response.statusText}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching from DuckDuckGo:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
