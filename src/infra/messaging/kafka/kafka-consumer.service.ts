import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['intense-dinosaur-14816-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'aW50ZW5zZS1kaW5vc2F1ci0xNDgxNiSEC-dBjZM3b3cLuK6EE78aIs3ysJ8tFao',
                    password: '1qsOIw09EtoPg2mXBnV1bD8ZiFurgHe7DAeNLO5fC6jwao86jaYksuBwkjwMBLgTXW0FgA==',
                },
                ssl: true,
            }
        })

    }

    async onModuleDestroy() {
        await this.close();
    }
}