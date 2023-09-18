import * as express from "express";
import { Response } from "express";
import { Request } from "express";
import * as bodyParser from "body-parser";
import mainRoute from "./routes";
import DataBaseServer from "./libs/DataBase";
import * as cors from "cors";
import IConfig from "./config/IConfig";
import * as morgan from 'morgan';
import * as fs from 'fs';
import Tour from './models/tourModel';
import Review from './models/reviewModel';
import User from './models/userModel';
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
export default class Server {
  private app: express.Express;

  constructor(private config: IConfig) {
    this.app = express();
  }

  bootstrap = (): Server => {
    this.initBodyParser();
    this.setUpRoutes();

    return this;
  };

  initBodyParser = (): void => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  };

  importData = async () => {
    try {
      await Tour.create(tours);
      await User.create(users, { validateBeforeSave: false });
      await Review.create(reviews);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  run = () => {
    const {
      app,
      config: { PORT: port, MONGO_URL: mongoUrl },
    } = this;
    DataBaseServer.open(mongoUrl).then(() => {
      app.listen(port, (): any => {
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log(`:::App is running successfully at port number: ${port}:::::::`);
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
      })
    });
  };

  setUpRoutes = (): Server => {
    const { app } = this;
    app.use(morgan('dev'));
    app.use(cors());
    app.get("/health", (req: Request, res: Response) => {
      res.status(200);
      res.send("okayyy");
    });
   
    app.use("/api", mainRoute);
    app.use((req, res, next) => {
      console.log(':::::::Hi am middleware::::::');
      next();
    })
    return this;
  };
}
