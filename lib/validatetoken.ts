
import * as jwt from "jsonwebtoken";
const JWT_SECRET = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "gpay"; 

export interface validateTokenProps{
    check : boolean,
    userId? : string
}
export default async function validateToken(token : string): Promise<validateTokenProps> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId  : string};
        return { check: true, userId: decoded.userId as string };
    } catch (err) {
        console.log("Here comes - ", err);
        return { check: false };
    }
}

