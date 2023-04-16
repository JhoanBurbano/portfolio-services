import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { Email } from '../interfaces/email.interface';

@Injectable()
export class EmailService {
  async sendEmail(email: Email): Promise<{ message: string }> {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await transport.sendMail({
        from: '"Jhoan Burbano 🫧" <no-reply@architects.com>',
        to: email.email,
        subject: email.subject,
        text: email.message,
        html: email.html,
      });
      return { message: 'The email was send successfully' };
    } catch (error) {
      return { message: error };
    }
  }
}
