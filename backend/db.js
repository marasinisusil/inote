const mongoose= require('mongoose')
const mongouri="mongodb://localhost:27017/"

const connecttomongo = () => {
    mongoose.connect(mongouri)
        .then(() => {
            console.log("Connected successfully");
        })
        .catch((err) => {
            console.error("Connection failed:", err);
        });
};
module.exports= connecttomongo;