import { getAccountSummary } from "@/lib/refresh_data";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // if (typeof id !== 'string') {
    //     res.status(400).json({ error: 'Invalid id' });
    //     return;
    // }

    try {
        // await getAccountSummary(id);
        res.status(200).json({ message: id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve account summary' });
    }
}