import { Inject, Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../../../product/domain/events/product-created.event.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../interfaces/notification.service.js';

@Injectable()
@EventsHandler(ProductCreatedEvent)
export class ProductCreatedNotificationHandler implements IEventHandler<ProductCreatedEvent> {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notifications: INotificationService,
  ) {}

  async handle(event: ProductCreatedEvent): Promise<void> {
    const price = (event.priceCents / 100).toFixed(2);
    await this.notifications.send(
      `🆕 New Product\nName: ${event.name}\nPrice: $${price}\nID: ${event.productId}`,
    );
  }
}
