import { userService } from "../services/userService";
import { Request, Response } from "express";
import { Serializer } from "../serializers/serializers";
import { Buffer } from "buffer";

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json({ status: "success", data: Serializer.usersSerializer(users) });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = JSON.parse(Buffer.from((req.headers.authorization as string).split(" ")[1].split(".")[1], 'base64').toString())['_id'];
      const user = await userService.updateUser(userId, { ...req.params, ...req.body, ...req.query});
      res.json({ status: "success" });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },
};
