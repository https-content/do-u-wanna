import sendgrid, {MailDataRequired} from '@sendgrid/mail'
import Mail from 'nodemailer/lib/mailer';

sendgrid.setApiKey(String(process.env.SENDGRID_API_KEY))

interface IEmailParams {
    subject: string;
    text: string;
    to: string;
    from: string;
}

export async function sendEmail(emailParams: IEmailParams) {
    const email = {
        to: emailParams.to,
        from: emailParams.from,
        subject: emailParams.subject,
        text: emailParams.text,
    }

    try {
        await sendgrid.send(email);
    } catch (error) {
        throw new Error('Email could not be sent, Please try again later');
    }
}