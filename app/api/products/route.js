import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/prisma/db';
import { createProduct } from '@/data/server/product';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const { user } = session;
    const products = await db.product.findMany({
      where: {
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }
    const { user } = session;
    let product = await createProduct(user.id);
    let a = product;
    console.log(a);
    return new Response(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
