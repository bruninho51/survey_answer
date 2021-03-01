import amqp from "amqplib/callback_api";
import { Service } from "typedi";
import { promisify } from "util";

export interface IMessageSender {
    send(queue: string, buffer: Buffer, exchange?: string): void
}

@Service("messaging.sender")
export class MessageSender implements IMessageSender {

  send(queue: string, buffer: Buffer, exchange?: string): void {
    
    amqp.connect(process.env.REBBIT_MQ_URL, function (err, conn) {
      conn.createChannel(function (err, ch) {
        const q = queue;
        ch.sendToQueue(q, buffer, { persistent: true });
        setTimeout( function()  {
          conn.close();
        }, 500);
      });
    });
  }
}