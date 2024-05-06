import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class MailService {
  async sendVerificationCode(data: EmailPayload): Promise<void> {
    const smtpOptions = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    try {
      const transporter = nodemailer.createTransport(smtpOptions);
      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        ...data,
      });
    } catch (error) {
      console.log({ errorA: error });
    }
  }
}
