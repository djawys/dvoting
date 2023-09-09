import { db } from '@/prisma/db';

export const getAllDivisions = async () => {
  const divisions = await db.division.findMany({});
  return divisions;
};
