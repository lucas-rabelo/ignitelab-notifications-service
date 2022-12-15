import { Notification } from "src/app/entities/notifications";
import { NotificationsRepository } from "src/app/repositories/notifications-repository";

const notifications: Notification[] = [];

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }
}

