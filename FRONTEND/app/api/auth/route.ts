import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'

const authPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') {
    
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  const body = await (req as any).json();
  const { email, password, address } = body.data;
  
  console.log("er address urn psw", address, email, password);

  if (email && password) {
    const token = 'your_jwt_token_here';
    return NextResponse.json({ token }, { status: 200 })

  } else if (address) {
    const token = 'your_jwt_token_here';
    return NextResponse.json({ token }, { status: 200 })

  } else {
    return NextResponse.json({ error: 'Invalid req' }, { status: 400 })
  }
}

export { authPost as POST };