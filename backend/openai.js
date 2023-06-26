const express = require("express");
const app = express();
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

router.get("/getTech/:tech/:budget", (req, res) => {
  const tech = req.params.tech;
  const budget = req.params.budget;
  const text =
    "What are some " +
    tech +
    " I can buy within a budget of " +
    budget +
    " rupees";
  try {
    const response = openai.createChatCompletion({
      temperature: 0.8,
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          // content:
          //   "You are technology sales expert, you possess the knowledge and expertise to provide valuable recommendations to customers seeking the best technology gadgets or items within their specified budget.",
          content:
            "You are an AI-powered Tech Product Finder! Get up to 3 handpicked tech product suggestions within your specified budget for the Indian market. Let's explore the perfect tech products for you!",
          role: "user",
          content: text,
        },
      ],
    });
    response.then((data) => {
      console.log("Data : ", data.data.choices[0].message.content);
      res.send(
        data.data.choices[0].message.content.replace(/(\d+)\./g, "\n$1.")
      );
    });
  } catch (err) {
    console.log(err);
    res.send({ message: err });
  }
});

module.exports = router;
