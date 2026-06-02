import { NextResponse } from 'next/server';
import { toursDb } from '@/models/Tour';

export async function GET() {
  return NextResponse.json(toursDb);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTour = {
      id: `t-${Date.now()}`,
      ...data,
      rating: 0,
      reviews: 0
    };
    toursDb.push(newTour);
    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
