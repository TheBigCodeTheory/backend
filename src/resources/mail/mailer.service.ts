import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

@Injectable()
export class MailerService {
  async sendVerificationCode(to: string, code: string): Promise<void> {
    const mailerSend = new MailerSend({
      apiKey: process.env.API_KEY_MAILER,
    });

    try {
      const sentFrom = new Sender(
        process.env.FROM_MAILER,
        'The big code theory',
      );

      const recipients = [new Recipient(to)];

      const personalization = [
        {
          email: to,
          data: {
            code,
          },
        },
      ];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject('Verification code')
        .setTemplateId('vywj2lpdx0jl7oqz')
        .setPersonalization(personalization);

      // await mailerSend.email.send(emailParams);
    } catch (error) {
      console.log('ERROR_SENDING_CODE', error);
      throw new HttpException('ERROR_SENDING_CODE', HttpStatus.BAD_REQUEST);
    }
  }
}
