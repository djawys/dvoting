import { NextResponse } from 'next/server';
import { createUser, userExist } from '@/data/server/user';
const bcrypt = require('bcrypt');

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('userr is here 1');
    let user = await userExist(body.cnic);
    if (user) {
      console.log(user);
      return NextResponse.json({
        isSuccess: false,
        message: 'User Already Exist',
        statusCode: 203,
        // data: {},
      });
    }
    console.log('userr is here 2', body.cnic);
    let hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    let newUser = await createUser(body);

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
