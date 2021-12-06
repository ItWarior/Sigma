import User from '../database/User';

export default {
  userByParam: async (param: object): Promise<object> => User.findOne(param),
  findAllUsers: async (): Promise<object> => User.find({}),
  findUserById: async (id: string): Promise<object> => User.findById({ _id: id }),
  createUser: async (user: object): Promise<object> => User.create(user),
  findByIdAndUpdate: async (id: string, params: object): Promise<object> => User.findByIdAndUpdate({ _id: id }, params),
  findByIdAndDelete: async (id: string): Promise<object> => User.findByIdAndDelete({ _id: id }),
};
