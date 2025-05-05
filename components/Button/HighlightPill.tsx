import { ReactNode } from "react";

export default function HightlightPill({ children }: {children: ReactNode}) {
    return (
        <div className="pill">
            {children}
        </div>
    )
}