import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '../dto/pagination-query.dto/send-mail.dto';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(dto: SendMailDto) {
        this.mailerService.sendMail({
            to: dto.to,
            subject: dto.subject,
            template: dto.template,
            context: dto.context
        })
    }
}
