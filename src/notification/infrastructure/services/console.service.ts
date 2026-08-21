import { Injectable, Logger } from '@nestjs/common';
import type { INotificationService } from '../../application/interfaces/notification.service.js';

// stands in for a real provider (Telegram, email, SMS...). A production
// implementation would satisfy the same INotificationService interface —
// e.g. call an HTTP API instead of logging. Kept as a console logger here
// so the template runs with zero external config.
@Injectable()
export class ConsoleService implements INotificationService {
  private readonly logger = new Logger(ConsoleService.name);

  send(message: string): Promise<void> {
    this.logger.log(message);
    return Promise.resolve();
  }
}
