import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { NotificationsControler } from './kafka/controllers/notifications.controller';

@Module({
    imports: [],
    providers: [KafkaConsumerService],
    controllers: [NotificationsControler],
})

export class MessagingModule { }