const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Client } = require('pg');
const dbUrl = process.argv[2];

const messages = [
	{
		username: "John Walter",
		title: "Technical Writer",
		message: "A technical writer is someone who helps others understand technology by writing it out in simple terms.",
		created_at: new Date(),
	},
	{
		username: "Munene Njeru",
		title: "Web Developer",
		message: "A web developer is one who writes code either in JavaScript or C# on the frontend and backend.",
		created_at: new Date(),
	},
];

const createDatabase = `
	CREATE TABLE IF NOT EXISTS message_board (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		username VARCHAR(255) NOT NULL,
		title VARCHAR(255) NOT NULL,
		message TEXT NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);
`;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!user) console.log("User unavailable");
if (!password) console.log("Password unavailable");

async function addInitialMessages(client) {
	for (const msg of messages) {
		const { username, title, message, created_at } = msg;

		await client.query(
			`INSERT INTO message_board (username, title, message, created_at)
			VALUES($1, $2, $3, $4)`,
			[username, title, message, created_at]
		);
	}
}

async function main() {
	console.log("Seeding...");

	const client = new Client({
	connectionString: dbUrl || `postgresql://${user}:${password}@${host}:${port}/${dbName}`,
	ssl: dbUrl ? { rejectUnauthorized: false } : undefined,
});

	await client.connect();

	await client.query(createDatabase);
	await addInitialMessages(client);

	await client.end();

	console.log("done");
}

main();