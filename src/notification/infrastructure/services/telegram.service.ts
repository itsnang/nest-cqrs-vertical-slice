import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { INotificationService } from '../../application/interfaces/notification.service.js';

@Injectable()
export class TelegramService implements INotificationService {
  private readonly botToken: string;
  private readonly chatId: string;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.getOrThrow<string>('telegram.botToken');
    this.chatId = this.configService.getOrThrow<string>('telegram.chatId');
  }

  async send(text: string): Promise<void> {
    const response = await fetch(
      `https://api.telegram.org/bot${this.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: 'HTML',
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }
  }
}
