import { Avatar } from "@nextui-org/react";

export default function AvatarCustom({ src }: { src: string}) {
    return (
        <Avatar radius="sm" src={src} className="avatar"/>
    )
}