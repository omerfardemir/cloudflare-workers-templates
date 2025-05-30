import {cors} from 'hono/cors'

/** Default CORS handler */
export function useDefaultCors() {
  return cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
}
