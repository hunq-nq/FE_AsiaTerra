import { NextResponse, NextRequest } from 'next/server';
import { toursDb } from '@/models/Tour';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = toursDb.find(t => t.id === id);
  
  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  return NextResponse.json(tour);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tourIndex = toursDb.findIndex(t => t.id === id);
  
  if (tourIndex === -1) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  try {
    const data = await request.json();
    toursDb[tourIndex] = { ...toursDb[tourIndex], ...data };
    return NextResponse.json(toursDb[tourIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tourIndex = toursDb.findIndex(t => t.id === id);
  
  if (tourIndex === -1) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  toursDb.splice(tourIndex, 1);
  return NextResponse.json({ success: true });
}
