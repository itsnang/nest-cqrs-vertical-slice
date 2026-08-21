import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationsController } from './api/controllers/notifications.controller.js';
import { ProductCreatedNotificationHandler } from './application/events/product-created-notification.handler.js';
import { SendNotificationHandler } from './application/commands/send-notification.handler.js';
import { NOTIFICATION_SERVICE } from './application/interfaces/notification.service.js';
import { TelegramService } from './infrastructure/services/telegram.service.js';

@Module({
  imports: [CqrsModule],
  controllers: [NotificationsController],
  providers: [
    ProductCreatedNotificationHandler,
    SendNotificationHandler,
    { provide: NOTIFICATION_SERVICE, useClass: TelegramService },
  ],
})
export class NotificationModule {}
