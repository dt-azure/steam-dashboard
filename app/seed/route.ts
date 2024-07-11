// import { db } from '@vercel/postgres';
// import { matches, recentMatches } from "./data";

// const client = await db.connect();

// async function seedMatches() {
//     try {
//         await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//         // Create the "account" table if it doesn't exist

//         await client.sql`
//         CREATE TABLE IF NOT EXISTS account (
//           id BIGINT UNIQUE PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           avatar TEXT NOT NULL,
//           profile_url TEXT NOT NULL,
//           account_level INT NOT NULL,
//           date_created DATE NOT NULL,
//           first_match_date DATE NOT NULL,
//           last_match_date DATE NOT NULL,
//           match_count INT NOT NULL,
//           win_count INT NOT NULL
//         );
//         `;

//         await Promise.all(
//             recentMatches.map((match) => {
//                 console.log(match.match_id);
//                 let newDate = new Date(match.start_time)

//                 return client.sql`
//                     INSERT INTO recent_matches(match_id, player_slot, radiant_win, duration, game_mode, lobby_type, hero_id, start_time, kills, deaths, assists, xp_per_min, gold_per_min, hero_damage, tower_damage, hero_healing, last_hits, cluster, hero_variant)
//                     VALUES (${match.match_id}, ${match.player_slot}, ${match.radiant_win}, ${match.duration}, ${match.game_mode}, ${match.lobby_type}, ${match.hero_id}, ${newDate}, ${match.kills}, ${match.deaths}, ${match.assists}, ${match.xp_per_min}, ${match.gold_per_min}, ${match.hero_damage}, ${match.tower_damage}, ${match.hero_healing}, ${match.last_hits}, ${match.cluster}, ${match.hero_variant})
//                     ON CONFLICT (match_id) DO NOTHING;
//                 `
//             })
//         )

//         console.log(`Seeded ${matches.length} matches.`)

//         return

//     } catch (error) {
//         throw error;
//     }
// }

// export async function GET() {
//     try {
//         await client.sql`BEGIN`;
//         await seedMatches()
//         await client.sql`COMMIT`;

//         return Response.json({ message: 'Database seeded successfully' });
//     } catch (error) {
//         await client.sql`ROLLBACK`;
//         return Response.json({ error }, { status: 500 });
//     }
// }