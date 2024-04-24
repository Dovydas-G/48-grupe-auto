import mysql from 'mysql2/promise';

let connection = null;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        // database: 'grupe48',
    });

    await connection.query('USE 48gr_auto');

    const sql = 'SELECT email, password FROM users;';
    const ats = await connection.execute(sql);

    console.log(ats[0]);

} catch (error) {
    throw error;
}





export { connection };