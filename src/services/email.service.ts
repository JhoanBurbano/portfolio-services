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
        to: process.env.EMAIL_PERSONAL,
        subject: email.subject,
        html: this.getHTML(email),
      });
      return { message: 'The email was send successfully' };
    } catch (error) {
      return { message: error };
    }
  }

  getHTML({ remitant, email, message }: Email) {
    return `<h3>${remitant} ${'<' + email + '>'}</h3>
    <p>${message}</p>`;
  }
}
