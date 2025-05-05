"use server";
import { request, gql, GraphQLClient } from "graphql-request";
import { db, sql } from '@vercel/postgres';
import { revalidatePath } from "next/cache";
import { convertToUnixTime } from "@/lib/utils";

const graphQLClient = new GraphQLClient("https://api.stratz.com/graphql", {
  method: "GET",
  headers: {
    authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiN2VhNjk5MWEtNzc2Yy00ZDM1LTgyMTUtZjQ1NDZjYzQ0ZTVmIiwiU3RlYW1JZCI6IjY0NDM0ODkyIiwibmJmIjoxNzIwNTE2NjIwLCJleHAiOjE3NTIwNTI2MjAsImlhdCI6MTcyMDUxNjYyMCwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9._2-YqboR4GLMZS7SkbyuWyvoBpSmGF9uFVx13TzXqg8",
  },
});

const generateSummaryQuery = (id: string | undefined) => {
  return gql`
    {
      player(steamAccountId: ${id}) {
        steamAccountId
        identity {
          captainJackIdentityId
          name
        }
        steamAccount {
          profileUri
          timeCreated
          avatar
          dotaAccountLevel
        }
        matchCount
        winCount
        imp
        firstMatchDate
        lastMatchDate
        behaviorScore
        isFollowed
      }
    }
  `;
}

const generateRecentMatchesQuery = (id: string, timestamp: string) => {
  // Timestamp: time filter for the results -> start from the timestamp, timestamp is in Unix epoch time in seconds
  // Take the maximum amount of results by default (100)
  return gql`
  {
    player(steamAccountId: ${id}) {
        matches(request: { startDateTime: ${timestamp}, take: 100 }) {
            id
            durationSeconds
            startDateTime
            endDateTime
            parsedDateTime
            statsDateTime
            gameMode
            players(steamAccountId: ${id}) {
                isRadiant
                isVictory
                heroId
                kills
                deaths
                assists
                numLastHits
                numDenies
                networth
                goldPerMinute
                level
                heroDamage
                towerDamage
                heroHealing
            }
        }
    }
}
  `
}

export const refreshSummary = async (id: string | undefined) => {
  "use server"

  const res: any | undefined = await graphQLClient.request(generateSummaryQuery(id));
  const account: any | undefined = res.player;
  const creationDate: string = new Date(account.steamAccount.timeCreated * 1000).toISOString();
  const firstMatchDate: string = new Date(account.firstMatchDate * 1000).toISOString();
  const lastMatchDate: string = new Date(account.lastMatchDate * 1000).toISOString();
  const currentDate: string = new Date().toISOString()


  try {

    await sql`
        UPDATE account
        SET name = ${account.identity.name}, avatar = ${account.steamAccount.avatar}, profile_url = ${account.steamAccount.profileUri}, account_level = ${account.steamAccount.dotaAccountLevel}, date_created = ${creationDate}, first_match_date = ${firstMatchDate}, last_match_date = ${lastMatchDate}, match_count = ${account.matchCount}, win_count = ${account.winCount}, date_updated = ${currentDate}
        WHERE id = ${account.steamAccountId}
        `

    // Revalidate data
    // revalidatePath('/', 'layout')

    return { message: "Data refreshed successfully." }
  } catch (err) {
    return { message: "Error" }
  }
};

export const refreshRecentMatches = async (id: string, timestamp: string | null) => {
  "use server";

  try {
    let formattedTimestamp: string
    if (timestamp) {
      formattedTimestamp = convertToUnixTime(new Date(timestamp)).toString()
    } else {
      formattedTimestamp = 'null'
    }

    const res: any | undefined = await graphQLClient.request(generateRecentMatchesQuery(id, formattedTimestamp))
    const matchList: any | undefined = res.player.matches

    // As this table only store data for the most recent 100 
    await sql`DELETE FROM recent_matches`

    await Promise.all(
      matchList.map(async (match: any) => {
        const { id, durationSeconds, startDateTime, gameMode } = match
        const players = match.players[0]

        return sql`
          INSERT INTO recent_matches (match_id, duration, game_mode, lobby_type, hero_id, start_time, kills, deaths, assists, xp_per_min, gold_per_min, hero_damage, tower_damage, hero_healing, last_hits, denies, hero_level, is_radiant, is_victory, networth)
          VALUES (${id}, ${durationSeconds}, ${gameMode}, 0,  ${players.heroId}, ${new Date(startDateTime * 1000).toISOString()}, ${players.kills}, ${players.deaths}, ${players.assists}, 0, ${players.goldPerMinute}, ${players.heroDamage}, ${players.towerDamage}, ${players.heroHealing}, ${players.numLastHits}, ${players.numDenies}, ${players.level}, ${players.isRadiant}, ${players.isVictory}, ${players.networth})
        `
      })
    )

    return { message: "Data refreshed successfully." }
  } catch (err) {
    console.log(err);
    return { message: "Error" }
  }
}

