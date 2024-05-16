import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import * as jose from 'jose'
import 'dotenv/config'
const ky = process.env.KEYJWT
const uintKy = new TextEncoder().encode(ky);
const alg = 'HS256'
const bcrypt = require('bcrypt');

const signPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }


    const body = await (req as any).json();
    const { email, password, address } = body.data;
    console.log("make some salt e psw", await bcrypt.genSalt(4), "pass e mail", password, email)
    let jwt;
    if (email && password) {
        // get user psw e salt from db
        
        let usrSalt = await bcrypt.genSalt(4) //test
        let usrPsw = await bcrypt.hash(password, usrSalt) //test
        //checks if not exist
        //save salt and psw in db
        try {
                const payload = {
                    email: email,
                    address: address,
                    exp: Math.floor(Date.now() / 1000) + 43200
                };
                const jwt = await new jose.SignJWT(payload)
                    .setProtectedHeader({ alg })
                    .setIssuedAt()
                    .setIssuer("siamonoiDAITA")
                    .setAudience(email)
                    .setExpirationTime('12h')
                    .sign(uintKy);

                console.log(jwt)
                return NextResponse.json({ jwt }, {
                    status: 200,
                    headers: {
                        'Set-Cookie': `jwt=${jwt}; Path=/; HttpOnly`
                    }
                })

            
            //generate jwt



        } catch (e) {
            console.log(e)
        }



    } else if (address) {

        //generate jwt
        //save salt and adrs in db

        return NextResponse.json({ jwt }, { status: 200 })

    } else {
        return NextResponse.json({ error: 'Invalid req' }, { status: 400 })
    }
}

export { signPost as POST };
