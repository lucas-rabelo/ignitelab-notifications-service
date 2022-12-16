import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';

// dto's
import { CreateNotificationBody } from '../dtos/create-notification-body';

// view models
import { NotificationViewModel } from '../view-models/notification-view-model';

// controllers
import { SendNotification } from '@application/use-cases/notifications/send/send-notification';
import { CancelNotification } from '@application/use-cases/notifications/cancel/cancel-notification';
import { ReadNotification } from '@application/use-cases/notifications/read/read-notification';
import { UnreadNotification } from '@application/use-cases/notifications/unread/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/notifications/count/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/notifications/get/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
