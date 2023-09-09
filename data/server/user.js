import { db } from '@/prisma/db';

export const userExist = async (email) => {
  const user = await db.user.count({ where: { email: email } });

  console.log(user);
  if (user) {
    return true;
  }
  return false;
};

export async function createUser(userData) {
  console.log('userData', userData);
  try {
    const newUser = await db.user.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
