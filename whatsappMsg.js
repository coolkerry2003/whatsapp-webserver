require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

class whatsappMsg {
  client = null;
  isready = false;
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox'],
      }
    });

    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
      this.isready = true;
    });

    this.client.initialize();
  }
  async sendMessage(token, chatId, context) {
    let rtn = {
      success: false,
      result: ""
    }

    try {
      if(token == process.env.token){
        await this.client.sendMessage(chatId, context)
        rtn.success = true;
      }else{
        rtn.success = false;
        rtn.error = "錯誤:無效的token!";
      }
    } catch (error) {
      rtn.error = (error.message.includes('invalid wid')) ?
        '錯誤:無效的 WhatsApp ID (WID)!' :
        '未知錯誤：' + error.message;
    }
    return rtn;
  }
}
module.exports = whatsappMsg;