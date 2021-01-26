import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password,
    });
    const res = await newUser.save();
    return res.id;
  }

  async findUser(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
}
