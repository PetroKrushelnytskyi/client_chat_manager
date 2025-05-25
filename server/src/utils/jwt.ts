import { jwtSecret } from '../config';
import * as jwt from 'jsonwebtoken';

type JwtPayload = {
  accountId: number;
};

export const createJwtToken = ({ accountId }: JwtPayload) =>
  jwt.sign({ accountId }, jwtSecret);
export const verifyJwtToken = (token: string): JwtPayload =>
  jwt.verify(token, jwtSecret) as JwtPayload;
