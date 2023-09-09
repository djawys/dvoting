import { getServerSession } from 'next-auth';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/prisma/db';
import { productPatchSchema } from '@/lib/validations';

const routeContextSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
});

export async function DELETE(req, context) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this product.
    if (!(await verifyCurrentUserHasAccessToProduct(params.productId))) {
      return new Response(null, { status: 403 });
    }

    // Delete the product.
    await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req, context) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this product.
    if (!(await verifyCurrentUserHasAccessToProduct(params.productId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = productPatchSchema.parse(json);

    // Update the product.
    // TODO: Implement sanitization for content.
    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToProduct(productId) {
  const session = await getServerSession(authOptions);
  const count = await db.product.count({
    where: {
      id: productId,
      userId: session?.user.id,
    },
  });

  return count > 0;
}
