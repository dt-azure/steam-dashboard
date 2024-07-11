const { db } = require("@vercel/postgres");
const { request, gql, GraphQLClient } = require("graphql-request");

async function seedAccount(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "account" table if it doesn't exist

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS account (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        avatar TEXT NOT NULL,
        password TEXT NOT NULL,
        profile_url TEXT NOT NULL,
        time_created DATE NOT NULL,
        account_level INT NOT NULL,
        first_match_date DATE NOT NULL,
        last_match_date DATE NOT NULL,
        match_count INT NOT NULL,
        win_count INT NOT NULL,
        behavior_score INT NOT NULL
      );
    `;

    return createTable

  } catch (error) {
    throw error;
  }
}

async function main() {
    const client = await db.connect()

    await seedAccount(client)

    await client.end()
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  