import type { Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
    token: string | JwtPayload
}
