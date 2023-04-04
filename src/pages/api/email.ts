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

    const { message } = req.body

    const client = new SMTPClient({
        user: process.env.MAIL,
        password: process.env.PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true
    })

    try {
        if (process.env.email) {
            client.send({
                text: message,
                from: process.env.mail ?? '',
                to: 'isaac.mcustodio@gmail.com',
                subject: 'Resposta do seu pedido de namoro',
            }, (callback) => console.log("email sent", callback))    
        }
    } catch (e) {
        res.status(400).end(JSON.stringify({ message: "Error" }))
        return;
    }
}
