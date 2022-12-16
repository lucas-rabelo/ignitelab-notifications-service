import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

// providers
import { SendNotification } from '@application/use-cases/notifications/send/send-notification';
import { CancelNotification } from '@application/use-cases/notifications/cancel/cancel-notification';
import { ReadNotification } from '@application/use-cases/notifications/read/read-notification';
import { UnreadNotification } from '@application/use-cases/notifications/unread/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/notifications/count/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/notifications/get/get-recipient-notifications';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        CancelNotification,
        ReadNotification,
        UnreadNotification,
        CountRecipientNotifications,
        GetRecipientNotifications,
    ]
})
export class HttpModule { }