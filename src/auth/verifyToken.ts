import path from 'path'
import {NextFunction, Request, Response} from 'express'

const jwt = require('jsonwebtoken')
require('dotenv').config({ path: path.join(__dirname, '../') + '/.env' })

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const i = req.rawHeaders.indexOf('Authorization');
  const header = req.rawHeaders[i+1];
  const token = header.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: 'Access Denied',
    })

  try {
    req.user= jwt.verify(token, process.env.TOKEN_SECRET);
    next()

  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    })
  }
}

export default { verifyToken }
