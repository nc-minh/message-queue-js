const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const receiveNoti = async () => {
    try {
        const connection = await amqplib.connect(amqp_url_docker);
        const channel = await connection.createChannel();

        const exchange = 'video';

        await channel.assertExchange(exchange, 'fanout', { durable: true });

        const { queue } = await channel.assertQueue('', { exclusive: true });

        console.log(`[Queue name] ${queue}`);

        await channel.bindQueue(queue, exchange, '');

        await channel.consume(queue, (msg) => {
            console.log(`[x] Received ${msg.content.toString()}`);
        }, { noAck: true });



    } catch (error) {
        console.log(error);
    }
}

receiveNoti();