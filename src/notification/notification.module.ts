import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductCreatedNotificationHandler } from './application/events/product-created-notification.handler.js';
import { NOTIFICATION_SERVICE } from './application/interfaces/notification.service.js';
import { ConsoleNotificationService } from './infrastructure/services/console-notification.service.js';

@Module({
  imports: [CqrsModule],
  providers: [
    ProductCreatedNotificationHandler,
    { provide: NOTIFICATION_SERVICE, useClass: ConsoleNotificationService },
  ],
})
export class NotificationModule {}
