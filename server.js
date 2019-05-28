const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// db
mongoose
    .connect(process.env.MONGODB_URI , { useNewUrlParser: true })
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
mongoose.set('useFindAndModify', false);

// routes requirement
const postRoutes = require("./Routes/posts.route");
const authRoutes = require("./Routes/auth.route");
const userRoutes = require("./Routes/user.route");

// apiDocs
app.get("/api", (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware -
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors({
	// origin: 'https://facebook-netcraft.herokuapp.com',
}));
app.use('/api/', postRoutes);
app.use('/api/', authRoutes);
app.use('/api/', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized!" });
    }
});

if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname, "client", "build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
