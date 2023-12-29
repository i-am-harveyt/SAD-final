import postgres from "postgres";

const sql = postgres(process.env.PSQL_HOST, {
	database: process.env.PSQL_DB,
	port: process.env.PSQL_PORT,
	user: process.env.PSQL_USER,
	password: process.env.PSQL_PWD,
});

export default sql;
