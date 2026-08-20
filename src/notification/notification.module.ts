import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductCreatedNotificationHandler } from './application/events/product-created-notification.handler.js';
import { NOTIFICATION_SERVICE } from './application/interfaces/notification.service.js';
import { ConsoleService } from './infrastructure/services/console.service.js';

@Module({
  imports: [CqrsModule],
  providers: [
    ProductCreatedNotificationHandler,
    { provide: NOTIFICATION_SERVICE, useClass: ConsoleService },
  ],
})
export class NotificationModule {}
