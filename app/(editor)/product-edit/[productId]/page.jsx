import { notFound, redirect } from 'next/navigation';
import { db } from '@/prisma/db';
import { getCurrentUser } from '@/data/server/session';
import { ProductEditor } from '../../../../components/Dashboard/Products/editor';

export default async function EditorPage({ params }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const product = await getProductForUser(params.productId, user.id);

  if (!product) {
    notFound();
  }

  return <ProductEditor product={product} />;
}

async function getProductForUser(productId, userId) {
  return await db.product.findFirst({
    where: {
      id: productId,
      userId: userId,
    },
  });
}
