import { sql } from "@vercel/postgres"

export const fetchAccountSummary = async () => {
    try {
        const data = await sql`SELECT * FROM account`
        // console.log(data);

        return data.rows[0]
    } catch (err) {
        throw new Error("Failed to fetch data.")
    }
}

export const fetchRecentMatches = async () => {
    try {
        const data = await sql`SELECT * FROM recent_matches`
        // console.log(data);

        return data.rows
    } catch (err) {
        throw new Error("Failed to fetch data.")
    }
}

export const fetchRecentMatchesByDay = async () => {
    try {
        const data = await sql`
            SELECT COUNT(*) AS match_count, TO_CHAR(start_time::date, 'Mon dd') as date
            FROM recent_matches
            GROUP BY start_time
            ORDER BY start_time
        `
        // console.log(data);

        return data.rows
    } catch (err) {
        throw new Error("Failed to fetch data.")
    }
}

export const fetchRecentMatchesAvg = async () => {
    try {
        const data = await sql`
            SELECT
                ROUND(AVG(duration), 0) As avg_duration,
                ROUND(AVG(kills), 2) AS avg_kills,
                ROUND(AVG(deaths), 2) AS avg_deaths,
                ROUND(AVG(assists), 2) AS avg_assists,
                ROUND(AVG(last_hits), 2) AS avg_last_hits,
                ROUND(AVG(denies), 2) AS avg_denies,
                ROUND(AVG(networth), 0) AS avg_networth,
                ROUND(AVG(hero_damage), 0) AS avg_hero_damage,
                ROUND(AVG(tower_damage), 0) AS avg_tower_damage,
                ROUND(AVG(hero_healing), 0) AS avg_hero_healing
            FROM recent_matches
        `

        return data.rows[0]
    } catch (err) {
        throw new Error("Failed to fetch data.")
    }
}

export const fetchWinLossStats = async () => {
    try {
        const data = await sql`
            SELECT
                COUNT(CASE WHEN is_victory = true THEN 1 ELSE NULL END) AS win_count,
                COUNT(*) AS total_matches,
                COUNT(CASE WHEN is_radiant = true THEN 1 ELSE NULL END) AS radiant_count,
                (SELECT COUNT(*) FROM recent_matches WHERE is_radiant = true AND is_victory = true) AS radiant_win_count,
                (SELECT COUNT(*) FROM recent_matches WHERE is_radiant = false AND is_victory = true) AS dire_win_count,
                 COUNT(DISTINCT hero_id) AS unique_heroes_count
            FROM recent_matches
        `

        return data.rows[0]
    } catch (err) {

        throw new Error("Failed to fetch data.")
    }
}

export const fetchRecentMatchesHeroBreakdown = async () => {
    try {
        const data = await sql`
            SELECT
	            hero_id,
	            CAST(COUNT(*) AS INT) AS match_played,
	            CAST(ROUND(AVG(duration), 0) AS DECIMAL) As avg_duration,
	            CAST(ROUND(AVG(kills), 2) AS DECIMAL) AS avg_kills,
	            CAST(ROUND(AVG(deaths), 2) AS DECIMAL) AS avg_deaths,
	            CAST(ROUND(AVG(assists), 2) AS DECIMAL) AS avg_assists,
	            CAST(ROUND(AVG(last_hits), 2) AS DECIMAL) AS avg_last_hits,
	            CAST(ROUND(AVG(denies), 2) AS DECIMAL) AS avg_denies,
	            CAST(ROUND(AVG(networth), 0) AS DECIMAL) AS avg_networth,
	            CAST(ROUND(AVG(hero_damage), 0) AS DECIMAL) AS avg_hero_damage,
	            CAST(ROUND(AVG(tower_damage), 0) AS DECIMAL) AS avg_tower_damage,
	            CAST(ROUND(AVG(hero_healing), 0) AS DECIMAL) AS avg_hero_healing,
	            CAST(COUNT(CASE WHEN is_victory = true THEN 1 ELSE NULL END) AS INT) AS win_count
            FROM recent_matches
            GROUP BY hero_id
            ORDER BY hero_id
        `

        return data.rows
    } catch (err) {

        throw new Error("Failed to fetch data.")
    }
}

