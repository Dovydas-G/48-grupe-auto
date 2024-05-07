import { connection } from "../../db.js";

export async function apiLoginGet(req, res) {
    const loginTokenSize = 20;

    if (typeof req.cookies.loginToken !== 'string' 
        || req.cookies.loginToken.length !== loginTokenSize) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Login token is invalid',
                loggedIn: false,
            }));
    }

    try {
        const selectQuery = 'SELECT * FROM login_token INNER JOIN users ON login_token.userId = users.id;';
        const dbResponse = await connection.execute(selectQuery, [req.cookies.loginToken]);

        if (dbResponse[0].length !== 1) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'User is not logged in',
                loggedIn: false,
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'User is logged in',
            loggedIn: true,
            id: dbResponse[0][0].id,
        }));

    } catch (error) {
        console.error(error)
    }

    return res.send(JSON.stringify({
        type: 'error',
        loggedIn: false,
        id: dbResponse[0][0].id,
    }));
}