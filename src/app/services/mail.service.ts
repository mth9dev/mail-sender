import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from 'src/assets/smtp';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  sendMail(mail: {
    to: string,
    firstName: string,
    lastName: string,
    body: string,
    attachments: {name: string, data: string}[],
  }): Promise<string> {
    return Email.send({
      SecureToken: environment.smtpToken,
      From: environment.senderEmail,
      To: mail.to,
      Subject: `Sent from ${mail.firstName} ${mail.lastName} via the Mail Sender app.`,
      Body: mail.body,
      Attachments: mail.attachments,
    })
  }
}
