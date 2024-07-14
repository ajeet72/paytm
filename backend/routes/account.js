const express = require("express");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error
    });
  }
});

const transferBody = zod.object({
  amount: zod.number(),
  to: zod.string(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { success } = transferBody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "invalid input",
      });
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Balance is insufficient!",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "invalid account",
      });
    }

    // perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.json({
      message: "Transaction successful!",
    });
  } catch (error) {
    console.log(error);
    res.json({
        message: error
    })
  }
});

module.exports = router;
