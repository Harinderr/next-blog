import { User } from "@/utility/schema/userdetailSchema";

import { NextResponse } from "next/server";
import prisma from "@/utility/prismaclient";
import bcrypt from 'bcryptjs'
import Joi from "joi";


const bcryptSalt = bcrypt.genSaltSync(10)

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

export async function GET(req,res){
    return NextResponse.json('hlo')
}
 export async function POST(req,res) {
    const payload = await req.json()
    // const result = schema.validate(payload)
//     // Check for validation errors
// if (result.error) {
//     console.error('Validation error:', result.error.details[0].message);
//   } else {
//     console.log('Data is valid:', result.value);
//   }
    
   
  try { 
    const existingUser = await prisma.user.findUnique({
        where : {
            email : payload.email
        }
    })
    if (!existingUser){
        return NextResponse.json({user : null, message : 'invalid user Email'},{status : 409})
    }
  
    const passMatch = bcrypt.compare(payload.password, existingUser.password)
    if(passMatch) {
        
        return NextResponse.json({result :'user detail matched'})}
    }
   
    
    catch (err) {
        console.log('there is an error'+ err);
    }
}