import connectDB from "../DB/connection.js";
import categoryRouter from "./Modules/Category/Category.router.js";
import brandRouter from './Modules/Brand/Brand.router.js'
import carRouter from './Modules/Car/car.router.js'
import{globalErrorHandling} from './utils/errorHandling.js'

const bootstrap = (app, express) => {
  app.use(express.json());
  app.use("/category", categoryRouter);
  app.use("/brand", brandRouter);
  app.use("/car", carRouter);
  app.use("*", (req, res, next) => {
    return res.status(404).json({ message: "Route not found." });
  });
  app.use(globalErrorHandling)
  connectDB();
};

export default bootstrap;
