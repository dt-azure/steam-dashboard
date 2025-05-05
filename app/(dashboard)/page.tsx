import DashboardCardGroup from "@/components/Card/DashboardCardGroup";
import { fetchAccountSummary, fetchRecentMatches, fetchRecentMatchesAvg, fetchRecentMatchesByDay, fetchRecentMatchesHeroBreakdown, fetchWinLossStats } from "./_actions/fetchData";
import AccountInfo from "@/components/Header/AccountInfo";
import SectionWrapper from "@/components/Wrapper/SectionWrapper";
import { RecentMatchesChart } from "@/components/Dashboard/RecentMatches/RecentMatchesByDayChart";
import RecentMatchesAvg from "@/components/Dashboard/RecentMatches/RecentMatchesAvg";
import { Suspense } from "react";
import RecentMatchesByDayChartSkeleton from "@/components/Skeleton/RecentMatchesByDayChartSkeleton";
import { DireWinRatePieChart, RadiantDirePieChart, RadiantWinRatePieChart, WinLossPieChart } from "@/components/Dashboard/RecentMatches/WinLossCharts";
import { HeroBreakdownBarChart } from "@/components/Dashboard/RecentMatches/HeroBreakDownChart";
import { getHeroData } from "@/lib/utils";
import { HeroBreakdownTable } from "@/components/Dashboard/RecentMatches/HeroBreakdownTable";


export default async function Home() {
  const profile: any = await fetchAccountSummary()
  // const recentMatches: any = await fetchRecentMatches()
  const recentMatchesByDay: any = await fetchRecentMatchesByDay()
  const recentMatchesAvg: any = await fetchRecentMatchesAvg()
  const winLossStats: any = await fetchWinLossStats()
  const recentMatchesHeroBreakdown: any = await fetchRecentMatchesHeroBreakdown()
  const recentMatchesHeroList: any = getHeroData(recentMatchesHeroBreakdown)

  return (
    <main>
      <SectionWrapper>
        <AccountInfo profile={profile} />

        <div className="card-field flex items-center gap-10">

          <DashboardCardGroup profile={profile} />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="section-title">Recent Matches</h2>


        <Suspense fallback={<RecentMatchesByDayChartSkeleton />}>
          <RecentMatchesChart data={recentMatchesByDay} />
        </Suspense>

        <RecentMatchesAvg data={recentMatchesAvg} />

        <div className="px-20 mt-20">
          <div className="flex">
            <div className="w-1/4 text-center">
              <h4 className="text-xl font-semibold">Win Rate</h4>
              <div>
                <WinLossPieChart data={winLossStats} />
              </div>
            </div>

            <div className="w-1/4 text-center">
              <h4 className="text-xl font-semibold">Radiant / Dire</h4>
              <div>
                <RadiantDirePieChart data={winLossStats} />
              </div>
            </div>

            <div className="w-1/4 text-center">
              <h4 className="text-xl font-semibold">Radiant Win Rate</h4>
              <div>
                <RadiantWinRatePieChart data={winLossStats} />
              </div>
            </div>

            <div className="w-1/4 text-center">
              <h4 className="text-xl font-semibold">Dire Win Rate</h4>
              <div>
                <DireWinRatePieChart data={winLossStats} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-20 mt-20 gap-y-10">
          <HeroBreakdownBarChart data={recentMatchesHeroList} />

          <div className="hero-breakdown-table flex justify-center mt-10">
            <HeroBreakdownTable data={recentMatchesHeroList} />
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}