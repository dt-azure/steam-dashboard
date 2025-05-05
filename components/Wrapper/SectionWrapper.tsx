import { ReactNode } from "react";

export default function SectionWrapper({ children }: { children: ReactNode }) {
    return (
        <section className="section-body p-4 m-4 rounded-md">
            {children}
        </section>
    )
}