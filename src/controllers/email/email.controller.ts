import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../../services/email.service';
import { Email } from '../../interfaces/email.interface';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() email: Email): Promise<any> {
    return await this.emailService.sendEmail(email);
  }
}
