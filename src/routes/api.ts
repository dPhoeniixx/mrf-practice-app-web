import express, { Request, Response } from "express";
import blogRouter from "./blogRoutes";
import userRouter from "./userRoutes";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  const doc = `GET   /                   - Documentation
GET   /redirect/:path     - Redirect to /:path
GET   /blogs/             - Get All Blogs
GET   /blogs/:id          - Get blog with id :id
POST  /user/register      - Register a new user, requires: name, email and password.
POST  /user/login         - Login endpoint, requires: email and password.
GET   /user/profile       - Get current user profile
POST  /user/update        - Update user email, requires: email.`;
  res.status(200).set("Content-Type", "text/plain").send(doc);
});

apiRouter.get("/redirect/:path", (req: Request, res: Response) => {
  res.redirect(302, "/" + req.params.path);
});

apiRouter.use("/blogs", blogRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
