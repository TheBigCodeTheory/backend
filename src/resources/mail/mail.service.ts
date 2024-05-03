import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'sofiavign@gmail.com',
        pass: 'larulo1549',
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const mailOptions = {
      from: 'sofiavign@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${code}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendMagicLink(email: string, magicLink: string): Promise<void> {
    const mailOptions = {
      from: 'sofiavign@gmail.com',
      to: email,
      subject: 'Magic Link',
      text: `Click the following link to login: ${magicLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
