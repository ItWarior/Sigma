import Post from '../database/Post';

export default {
  findPostByUserID: async (userId: any): Promise<object> => Post.find({ userId }),
  findPostById: async (_id: string): Promise<object> => Post.findById({ _id }),
  addPost: async (text: string, userId: string): Promise<object> => Post.create({ text, userId }),
  deletePostById: async (_id: string): Promise<object> => Post.findByIdAndDelete({ _id }),
  updatePostById: async (_id: string, text: string): Promise<object> => Post.findByIdAndUpdate({ _id }, { text }),
};
