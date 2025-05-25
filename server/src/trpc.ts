/* eslint-disable max-statements */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';

import { jwtSecret } from './config';


const getAuthorizationToken = (authorizationHeader?: string) => {
    if (!authorizationHeader || authorizationHeader.split(' ')[0] !== 'Bearer')
      return false;
  
    return authorizationHeader.split(' ')[1];
  };
  
  const verifyJwtToken = (
    token: string
  ): {
    accountId: string;
  } | null => {
    try {
      return jwt.verify(token, jwtSecret) as {
        accountId: string;
      };
    } catch (error) {
      return null;
    }
  };
const getUser = async (jwtToken?: string) => {
    const token = getAuthorizationToken(jwtToken);
  
    if (!token) return null;
  
    try {
      const jwtData = verifyJwtToken(token);
  
      if (!jwtData) {
        return null;
      }
      const accountId = jwtData.accountId;
  
      const currentAccount = await prisma.account.findUnique({
        where: {
          id: parseInt(accountId, 10)
        }
      });
  
      if (!currentAccount) return null;
  
      return currentAccount;
    } catch (e) {
      return null;
    }
  };
export const createContext = async ({
    req,
    res
  }: trpcExpress.CreateExpressContextOptions) => {
    return {
      req,
      res,
      account: await getUser(req.headers.authorization)
    };
  };

type Context = Awaited<ReturnType<typeof createContext>>;



const t = initTRPC.context<Context>().create({
  errorFormatter: (err) => {
    const { shape, error } = err;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error?.cause
            : null
      }
    };
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
