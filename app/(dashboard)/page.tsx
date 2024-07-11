import DashboardCard from "@/components/Card/DashboardCard";


export default async function Home() {
  // fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4508728492307CB4C79543D428B3BC15&steamids=76561198024700620').then((res) => {
  //   res.json().then((i) => {
  //     console.log(i.response.players[0]);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }).catch((err) => {
  //   conso
  const steamId = process.env.STEAM_ACCOUNT_ID; 


  return (
    <main>
      <div className="card-field flex items-center px-4 gap-10">
        <DashboardCard title="Title" data="Data" id={steamId}/>

        <DashboardCard title="Title" data="Data" id={steamId}/>

        <DashboardCard title="Title" data="Data" id={steamId}/>


      </div>
    </main>
  );
}
