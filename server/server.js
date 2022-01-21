const express = require("express");
const utils = require("./utils");

const PORT = utils.envIntElse("PORT", 3000);
const API_BASE_URL = "/api";

const APP_NAME = process.env.APP_NAME || "expressmin";

const app = express();

const api = express.Router();

api.use(express.json());

api.use((req, res, next) => {
  req.isAdmin = false;
  if (req.body) {
    if (req.body.ADMIN_PASS === process.env.ADMIN_PASS) {
      req.isAdmin = true;
    }
  }
  next();
});

app.use(API_BASE_URL, api);

const SERVER_STARTED_AT = Date.now();
const INDEX_TITLE = "Express Min";

api.get("/init", (req, res) => {
  utils.sendJson(res, { SERVER_STARTED_AT, INDEX_TITLE });
});

api.post("/getconfig", (req, res) => {
  if (req.isAdmin) {
    utils.getGitContentJsonDec("config", {}).then((result) => {
      res.json(result);
    });
  } else {
    res.json({});
  }
});

api.post("/getgp", (req, res) => {
  if (req.isAdmin) {
    utils.getOutputOf("gp env").then((result) => {
      res.json(result);
    });
  } else {
    res.json({});
  }
});

api.post("/setconfig", (req, res) => {
  const config = req.body.config;
  if (req.isAdmin) {
    utils.upsertGitContentJsonEnc("config", config).then((result) => {
      res.json(result);
    });
  } else {
    res.json({ error: "Not Authenticated" });
  }
});

app.get("/", (req, res) => {
  utils.sendView(res, "index.html");
});

app.get("/vue.js", (req, res) => {
  utils.sendModule(res, "vue/dist/vue.global.prod.js");
});

app.get("/utils.js", (req, res) => {
  utils.sendView(res, "utils.js");
});

utils.init().then((utilsInitOk) => {
  console.log({ utilsInitOk });

  app.listen(PORT, () => {
    console.log(`${APP_NAME} listening at ${PORT}`);
  });

  /*utils.upsertGitContentJsonEnc("test", {"test": true}).then((result) => {
    console.log("upsert result", result);

    utils.getGitContentJsonDec("test").then((result) => {
      console.log("get result", result, result.content);
    });
  });*/

  /*const enc = utils.encrypt("Hello World!", "utf8")
  const dec = utils.decrypt(enc)
  console.log(enc, dec)*/

  //utils.deleteRepo("blobs").then(result => console.log(result))

  //utils.createRepo("blobs").then(result => console.log(result))
});
