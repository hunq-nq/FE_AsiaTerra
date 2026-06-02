import { Tour } from '@/models/Tour';
export type { Tour };

export const mockTours: Tour[] = []; // Used to be mock tours, now empty array to satisfy unused imports if any

export async function getTours(): Promise<Tour[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/tours`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/tours/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
