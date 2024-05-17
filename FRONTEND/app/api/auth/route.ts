import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import * as jose from 'jose'
import 'dotenv/config'
const ky = process.env.KEYJWT
const uintKy = new TextEncoder().encode(ky);
const alg = 'HS256'
const bcrypt = require('bcrypt');
import Cookies from 'js-cookie';

const authPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }


  const body = await (req as any).json();
  const { email, password, address } = body.data;
  console.log("make some salt e psw", await bcrypt.genSalt(2), "pass e mail",password, email)
  let jwt;
  if (email && password) {
    // get user psw e salt from db
    let usrPsw = "$2b$04$3rkyfaVM8IoJ9a5hySh9HeRyLGJW0hsQYV14EfnRTqXSTTi09QUf6" //test
    let usrSalt = "$2b$04$3rkyfaVM8IoJ9a5hySh9He" //test
    try{
      const match = await comparePsw(password,usrPsw,usrSalt)
      console.log("password match", match)
      if (match){
        console.log("password correct")
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
              //res.redirect(200, '/community/feed');
              console.log("setto cookie user?prima ",email,address)
              Cookies.set('jwt', jwt)
              console.log("setto cookie user?",email,address)
              Cookies.set("user", email || address || "")
              return NextResponse.json({ jwt }, { 
                    status: 200,
                    headers: {
                      'Set-Cookie': [
                        `jwt=${jwt};Path=/;`,
                        `user=${email || address || ""};Path=/;`
                      ].join(', ')
                    } 
                  })

      }else{
        console.log("password incorrect")

        return NextResponse.json({ error: 'Password incorrect' }, { status: 400 })
      }
      //generate jwt
      


    }catch(e){
      console.log(e)
    }

    

  } else if (address) {


    
    return NextResponse.json({ jwt }, { status: 200 })

  } else {
    return NextResponse.json({ error: 'Invalid req' }, { status: 400 })
  }
}

export { authPost as POST };




async function comparePsw(pswNow:string, pswDb:string, salt:string){
  console.log("in")
  let val;
  try{
    val = await bcrypt.hash(pswNow, salt)
    console.log("elval",val,"------", salt)
    let resDB; // get user psw from db
    if (val == pswDb){
      resDB = true
    }else{
      resDB = false
    }
    return resDB
  }catch(e){
    console.log(e)
  }

}