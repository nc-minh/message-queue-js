const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const sendQueue = async (queueName, message) => {
    try {
        const connection = await amqplib.connect(amqp_url_docker);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, {
            durable: true
        });
        await channel.sendToQueue(queueName, Buffer.from(message), {
            expiration: 10000,
            persistent: true
        });
        // await channel.close();
        // await connection.close();
    } catch (error) {
        console.log(error);
    }
}

sendQueue('test', 'Hello World');