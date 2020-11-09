import mongoose from 'mongoose';
const config = require('config');

export class MongooseService {
    private static instance: MongooseService;

    db = config.get('mongoURI');
    options = {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    count = 0;

    constructor() {
        this.connectWithRetry();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseService();
        }
        return this.instance;
    }

    getMongoose(){
        return mongoose;
    }


    connectWithRetry() {
        console.log('MongoDB connection with retry');
        mongoose.connect(this.db, this.options).then(() => {
            console.log('MongoDB is connected')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++this.count);
            setTimeout(this.connectWithRetry, 5000)
        })
    };

}