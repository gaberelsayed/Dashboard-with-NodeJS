// Connection on mongoDB
const mongoose = require("mongoose");
if (process.env.RUNNING === "Local") {
  (async () => {
    try {
      
      await mongoose.connect("mongodb://localhost:27017/Suadia", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        
      });
      console.log("Connected to mongoDB-Local");
    } catch (err) {
      console.error(err.message);
    }
  })();
} else if (process.env.RUNNING === "Server") {
  (async () => {
    try {
      await mongoose.connect(
        `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`,
        {
          auth: { authSource: "admin" },
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      );
      console.log("Connected to mongoDB-Server");
    } catch (err) {
      console.error(err.message);
    }
  })();
} else {
  (async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://fawzy:0120975049@onlinecoursebooking-vbcbx.gcp.mongodb.net/Saudia"
      ),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true, 
      };
      console.log("Connected to mongoDB-Atlas");
    } catch (err) {
      console.error(err.message);
    }
  })();
}
