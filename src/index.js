const express = require("express");
const typeorm = require("typeorm");
const Wilder = require("./models/Wilder");

const app = express();

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder],
  logging: ["query", "error"],
});

app.get("/", function (req, res) {
  res.send("Hello World !");
});

const PORT = 4000;

async function start() {
  await dataSource.initialize();
  await dataSource.getRepository(Wilder).clear();
  await dataSource.getRepository(Wilder).save({ name: "Vianney" });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} !`);
  });
}

start();