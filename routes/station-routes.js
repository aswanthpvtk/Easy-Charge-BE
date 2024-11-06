import express from 'express';
import { addStation, getAllStation, getStationById } from '../controllers/station-controller';

const stationRouter=express.Router();

stationRouter.post('/',addStation)
stationRouter.get('/',getAllStation)
stationRouter.get('/:id',getStationById)




export default stationRouter;