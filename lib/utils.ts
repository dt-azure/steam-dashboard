import { heroes } from "../public/heroDetails";

const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
}

type HeroListType = {
    hero_id: number,
    match_played: number,
    avg_duration: number,
    avg_kills: number,
    avg_deaths: number,
    avg_assists: number,
    avg_last_hits: number,
    avg_denies: number,
    avg_networth: number,
    avg_hero_damage: number,
    avg_tower_damage: number,
    avg_hero_healing: number,
    win_count: number

}[]

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num)
}

export const formatDate = (date: string) => {
    const newDate = new Date(date)

    return `${newDate.getDay() < 10 ? '0' + newDate.getDay() : newDate.getDay()} / ${newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1} / ${newDate.getFullYear()}`
}

export const convertToUnixTime = (datetime: Date) => {
    return Math.floor(datetime.getTime() / 1000)
}

export const convertSecondsToMinutes = (time: number) => {
    let min = Math.floor(time / 60)
    let sec = time % 60

    return `${min}m ${sec}s`
}

export const getHeroData = (heroList: HeroListType) => {
    let newHeroList = []

    for (let hero of heroList) {
        let heroIndex = heroes.findIndex((item) => hero.hero_id == item.id)

        newHeroList.push({ ...hero, win_rate: hero.win_count / hero.match_played * 100, ...heroes[heroIndex] })
    }

    return newHeroList
}