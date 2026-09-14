import passport from "passport";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { getUserById } from "../queries/user";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback';

const cookieExtractor = (req: any) => {
    let token = null;
    if (req && req.cookies) {
        token = typeof req.cookies.get === 'function'
        ? req.cookies.get('session_token')?.value
        : req.cookies['session_token']
    }
    
    return token;
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await getUserById(jwtPayload.id)
                if (user) {
                    return done(null, user);
                };
                
                return done(null, false);
            } catch(err) {
                return done(err, false);
            };
        }
    )
);

export { passport, JWT_SECRET };