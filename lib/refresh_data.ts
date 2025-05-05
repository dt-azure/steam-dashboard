import { request, gql, GraphQLClient } from "graphql-request";
import Error from "next/error";
import { db, sql } from '@vercel/postgres';


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

export async function getAccountSummary(id: string | undefined) {
    try {
        const res: any | undefined = await graphQLClient.request(generateSummaryQuery(id));
        const account: any | undefined = res.player;
        const creationDate: string = new Date(account.steamAccount.timeCreated).toDateString();
        const firstMatchDate: string = new Date(account.firstMatchDate).toDateString();
        const lastMatchDate: string = new Date(account.lastMatchDate).toDateString();

        const client = await db.connect()

        // await client.sql`BEGIN`;
        await sql`
        INSERT INTO account(id, name, avatar, profile_url, account_level, date_created, first_match_date, last_match_date, match_count, win_count)
        VALUES (${account.steamAccountId}, ${account.identity.name}, ${account.steamAccount.avatar}, ${account.steamAccount.profileUri}, ${account.steamAccount.dotaAccountLevel}, ${creationDate}, ${firstMatchDate}, ${lastMatchDate}, ${account.matchCount}, ${account.winCount})
        `
        // await client.sql`COMMIT`;

        console.log(res);

        return
    } catch (error) {
        console.log(error);
        throw Error
    }
};
