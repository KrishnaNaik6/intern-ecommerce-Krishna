import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        });

        this.client.on("connect", () => {
            console.log("✅ Redis Connected");
        });

        this.client.on("error", (error) => {
            console.error("❌ Redis Error:", error);
        });
    }

    getClient() {
        return this.client;
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async set(
        key: string,
        value: unknown,
        ttl: number,
    ) {
        await this.client.set(
            key,
            JSON.stringify(value),
            "EX",
            ttl,
        );
    }

    async del(key: string) {
        await this.client.del(key);
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}