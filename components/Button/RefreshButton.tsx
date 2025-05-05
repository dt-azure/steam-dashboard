"use client";

import { Button } from "@nextui-org/react";

type refreshBtnProps = {
    fetchData: () => void
}

export default function RefreshButton({ fetchData }: refreshBtnProps) {
    return (
        <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onPress={
            () => { fetchData() }
        }>
            Refresh
        </Button>
    )
}