import type { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../services/mail';

export default async  function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only post request allowed' });
  }
  try {
    const { message } = req.body;
      
    const emailParam = {
      mailSettings: {footer: {enable: true, html: ``}},
      to: 'isaac.mcustodio@gmail.com',
      from: String(process.env.MAIL),
      subject: 'Resposta da proposta de namoro',
      text: message,
    };

    sendEmail(emailParam);

    return res.status(200).json({ message: "Contact Email Sent Successfully" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
}