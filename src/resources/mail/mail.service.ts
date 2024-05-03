import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    return await this.transporter.sendMail({
      from: `"sofatbct" ${process.env.SMTP_SENDER}`,
      to: email,
      subject: 'Verification code',
      text: 'Code',
    });
  }
}
