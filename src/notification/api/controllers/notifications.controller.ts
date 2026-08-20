import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../../application/commands/send-notification.command.js';
import { SendNotificationDto } from '../dto/send-notification.dto.js';

// a real deployment would guard this behind auth (admin-only, typically) —
// left open here since this template doesn't include an auth slice
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  send(@Body() dto: SendNotificationDto) {
    return this.commandBus.execute(new SendNotificationCommand(dto.message));
  }
}
