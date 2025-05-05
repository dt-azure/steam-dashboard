import clsx from 'clsx';

type DashboardCardProps = { title: string, data: any, style: string }

export default function DashboardCard({ title, data, style }: DashboardCardProps) {
    return (
        <div className={clsx("dashboard-card flex flex-col px-6 py-4 rounded-md", {
            'card-red': style === 'red',
            'card-blue': style === 'blue',
            'card-blue-light': style === 'blue-light',
            'card-yellow': style === 'yellow'
        })}>
            <div className="mb-2">
                <span className="card-title">{title}</span>
            </div>
            <div className="card-data flex items-center flex-grow">
                {data}
            </div>
        </div>
    )
}