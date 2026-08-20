import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../interfaces/notification.service.js';
import { SendNotificationCommand } from './send-notification.command.js';

@Injectable()
@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<
  SendNotificationCommand,
  void
> {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notifications: INotificationService,
  ) {}

  async execute(command: SendNotificationCommand): Promise<void> {
    await this.notifications.send(command.message);
  }
}
