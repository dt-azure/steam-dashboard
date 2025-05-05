import { convertSecondsToMinutes, formatNumber } from "@/lib/utils"

type RecentMatchesAvgProps = {
    data: {
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
    }
}

export default function RecentMatchesAvg({ data }: RecentMatchesAvgProps) {
    return (
        <div className="px-20">
            <div className="recent-matches-cards flex justify-between">
                <div className="flex flex-col gap-6">
                    <div className="recent-matches-card mx-auto w-80 h-full">
                        <p className="font-semibold">Match Count</p>
                        <span className="recent-matches-stat mt-4 font-thin">100</span>
                    </div>

                    <div className="recent-matches-card mx-auto w-80 h-full">
                        <p className="font-semibold">Avg. Duration</p>
                        <span className="recent-matches-stat mt-4 font-thin">{convertSecondsToMinutes(+data.avg_duration)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-y-6 gap-x-20">
                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Kills</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_kills)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Deaths</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_deaths)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Assists</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_assists)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Networth</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_networth)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Last Hits</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_last_hits)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Denies</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_denies)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Hero Damage</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_hero_damage)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Tower Damage</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_tower_damage)}</span>
                    </div>

                    <div className="mx-auto w-60 recent-matches-card">
                        <p className="font-semibold">Avg. Hero Healing</p>
                        <span className="recent-matches-stat mt-4 font-thin">{formatNumber(+data.avg_hero_healing)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}