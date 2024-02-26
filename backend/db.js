var mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true, useUnifiedTopology: true});
