import { Request, Response } from 'express'
import User from '../models/user'
import {JWTDataInterface} from "../auth/JWTData.interface";
const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../') + '/.env' })


const saveUser = async (req: Request, res: Response) => {

  const { phone } = req.body
  const userInDb = await User.findOne({phone:phone});
  if(userInDb){
    return res.status(201).json({
      token: jwt.sign({id:userInDb._id},process.env.TOKEN_SECRET)
    })
  }
  const user = new User({
    phone: phone,
  })

  try {
    await user.save()
    //TODO separate function to create token
    return res.status(201).json({
      token: jwt.sign({id:user._id}, process.env.TOKEN_SECRET)
    })

  } catch (error) {
    return res.status(500).json({
      message: 'User not saved!'
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body
  const userId = (req.user as JWTDataInterface).id;
  try {
    let updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { name: name, email: email },
      {
        new: true,
      },
    )

    return res.status(201).json({
      message: 'User not saved!',
      updatedUser,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'User not saved!',
      error,
    })
  }
}

const getUserData = async (req:Request,res:Response) =>{

  const userId = (req.user as JWTDataInterface).id;

  res.send( await User.findOne({_id:userId}));

}

export default { saveUser, updateUser , getUserData}
