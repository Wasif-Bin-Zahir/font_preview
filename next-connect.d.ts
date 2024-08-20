// types/next-connect.d.ts
declare module 'next-connect' {
  import { NextApiRequest, NextApiResponse } from 'next';
  import { RequestHandler } from 'express';

  type Middleware<TReq = NextApiRequest, TRes = NextApiResponse> = (
    req: TReq,
    res: TRes,
    next: (err?: any) => void
  ) => void | Promise<void>;

  interface NextConnectOptions<TReq, TRes> {
    onError?: (
      err: any,
      req: TReq,
      res: TRes,
      next: (err?: any) => void
    ) => void;
    onNoMatch?: (req: TReq, res: TRes) => void;
  }

  interface NextConnectInstance<
    TReq = NextApiRequest,
    TRes = NextApiResponse
  > {
    use(...handlers: Middleware<TReq, TRes>[]): this;
    get(...handlers: Middleware<TReq, TRes>[]): this;
    post(...handlers: Middleware<TReq, TRes>[]): this;
    put(...handlers: Middleware<TReq, TRes>[]): this;
    delete(...handlers: Middleware<TReq, TRes>[]): this;
    patch(...handlers: Middleware<TReq, TRes>[]): this;
    options(...handlers: Middleware<TReq, TRes>[]): this;
    handler: RequestHandler;
  }

  export default function nextConnect<
    TReq = NextApiRequest,
    TRes = NextApiResponse
  >(
    options?: NextConnectOptions<TReq, TRes>
  ): NextConnectInstance<TReq, TRes>;
}
