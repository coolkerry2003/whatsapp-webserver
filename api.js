const express = require("express");
let router = express.Router();
let whatsappMsg = require("./whatsappMsg");
let wapmsg = new whatsappMsg();

router.get('/message/:token/:number/:context', async (req, res) => {
  let ret = {
    success: false,
    result: ""
  }
  try {
    const token = req.params.token;
    const number = req.params.number;
    const context = req.params.context;
    const chatId = `${number.replace("+", "")}@c.us`;


    if (wapmsg.isready) {
      ret = await wapmsg.sendMessage(token, chatId, context);
    }
    else {
      ret.result = "whatsapp is not ready";
    }
  } catch (error) {
    ret.error = error.message;
  }
  res.json(ret);
});

router.post('/message', async (req, res) => {
  let ret = {
    success: false,
    result: ""
  };

  try {
    const { token, number, context } = req.body;
    const chatId = `${number.replace("+", "")}@c.us`;

    if (wapmsg.isready) {
      ret = await wapmsg.sendMessage(token, chatId, context);
    } else {
      ret.result = "whatsapp is not ready";
    }
  } catch (error) {
    ret.error = error.message;
  }
  res.json(ret);
});

module.exports = router