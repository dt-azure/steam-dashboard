import { ProfileProps } from "@/lib/definition";
import { formatDate } from "@/lib/utils";
import AvatarCustom from "../Avatar/AvatarCustom";
import dayjs from 'dayjs';
import HightlightPill from "../Button/HighlightPill";



export default async function AccountInfo({ profile }: { profile: ProfileProps }) {

    return (
        <div className="mb-10">
            <span className="italic text-sm">Updated as of: {formatDate(profile.date_updated)}</span>

            <div className="flex mt-5">
                <AvatarCustom src={profile.avatar} />

                <div className="flex flex-col justify-between ml-5">
                    <h2 className="profile-name font-bold text-3xl">{profile.name}</h2>
                    
                    <div>
                        <span className="font-semibold">First match: </span>
                        <span className="">{formatDate(profile.first_match_date)}</span>
                    </div>

                    <div className="">
                        <span className="font-semibold">Last match: </span>
                        <span className="">{formatDate(profile.last_match_date)}</span>
                    </div>

                    <div className="">
                        <HightlightPill>{caclDateDif(profile.first_match_date, profile.last_match_date)}</HightlightPill>
                    </div>
                </div>

            </div>
        </div>
    )
}

const caclDateDif = (firstDate: string, lastDate:  string) => {
    const dateDif= new Date(Date.parse(lastDate) - Date.parse(firstDate))

    return `${dateDif.getUTCFullYear() - 1970} years ${dateDif.getUTCMonth()} month(s) ${dateDif.getUTCDate() - 1} day(s) of DOTA and counting!`
}