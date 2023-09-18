import * as mongoose from 'mongoose';

class DataBaseServer {

  static open = (mongoUrl) => {
    
    return new Promise<void>((resolve, reject): any => {
      mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
          console.log('-----------Open-----------');

        })
    })
  }
  static disconnect = () => {
    console.log('Mongoose Disconnect');
    mongoose.connection.close();
  }

}

export default DataBaseServer;