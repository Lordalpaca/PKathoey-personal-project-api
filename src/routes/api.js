import express from "express";

const apiRouter = express.Router();

apiRouter.use('/mood', moodRouter)

export default apiRouter;