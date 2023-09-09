import { NextResponse } from 'next/server';
import { createUser, userExist } from '@/data/server/user';
const bcrypt = require('bcrypt');

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('userr is here ');
    let user = await userExist(body.email);
    if (user) {
      console.log(user);
      return NextResponse.json({
        isSuccess: false,
        message: 'User Already Exist',
        statusCode: 203,
        // data: {},
      });
    }
    let hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    let newUser = await createUser(body);
    console.log('userr is here ', newUser);
    return NextResponse.json({
      isSuccess: true,
      message: 'User Created Succesfully',
      statusCode: 200,
      data: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      isSuccess: false,
      responseMessage: 'An error occurred while SignUp.',
      responseCode: 500,
      errorName: error.name,
      error: error.message,
    });
  }
}
