import { getAllDivisions } from '@/data/server/filters';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    let data = await getAllDivisions();

    return NextResponse.json({
      isSuccess: true,
      message: 'Division names',
      statusCode: 200,
      data: { data },
    });
  } catch (error) {
    return NextResponse.json({
      isSuccess: false,
      responseMessage: 'An error occurred while Fecthing Division names.',
      responseCode: 500,
      errorName: error.name,
      error: error.message,
    });
  }
}
