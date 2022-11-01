const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const receiveQueue = async (queueName) => {
    try {
        const connection = await amqplib.connect(amqp_url_docker);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, {
            durable: false
        });
        await channel.consume(queueName, (message) => {
            console.log(message.content.toString());
        }, {
            noAck: true
        });
        // await channel.close();
        // await connection.close();
    } catch (error) {
        console.log(error);
    }
}

receiveQueue('test');