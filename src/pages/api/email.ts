import type { NextApiRequest, NextApiResponse } from 'next'
import { SMTPClient } from 'emailjs'

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ message: 'Send mail' })

    const { email } = req.body

    const client = new SMTPClient({
        user: process.env.MAIL,
        password: process.env.PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true
    })

    try {
        if (process.env.email) {
            client.send({
                text: `Just for testing purpose`,
                from: process.env.mail ?? '',
                to: email,
                subject: 'testing emailjs',
            }, () => console.log("email sent"))    
        }
    } catch (e) {
        res.status(400).end(JSON.stringify({ message: "Error" }))
        return;
    }
}
