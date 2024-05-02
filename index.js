const Express = require("express");
const jwt = require("jsonwebtoken");
const app = Express();

const secretkey = "secretkey";

app.get("/", (req, res) => {
  res.json({ message: "A sample api" });
});

app.post("/login", (req, res) => {
  const userdata = {
    id: 1,
    username: "afsana",
    email: "abc@test.com",
  };
  jwt.sign({ userdata }, secretkey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.send({ result: "Invalid Token" });
    } else {
      res.json({
        message: "Profile access",
        authData,
      });
    }
  });
});
function verifyToken(req, res, next) {
  const bearerheader = req.headers["authentication"];
  if (typeof bearerheader !== "undefine") {
    const bearer = bearerheader?.split(" ");
    console.log("bearer", bearer);
    const token = bearer && bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is not valid",
    });
  }
}

app.listen(5000, () => {
  console.log("app listen on 5000 port");
});
