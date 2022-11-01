const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const postVideo = async (msg) => {
    try {
        const connection = await amqplib.connect(amqp_url_docker);
        const channel = await connection.createChannel();

        const exchange = 'video';

        await channel.assertExchange(exchange, 'fanout', { durable: true });

        await channel.publish(exchange, '', Buffer.from(msg), { persistent: true });

        console.log(`[x] Sent ${msg}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 2000)
    } catch (error) {
        console.log(error);
    }
}

postVideo('post hehehehe');