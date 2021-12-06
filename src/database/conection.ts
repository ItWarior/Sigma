import { connect } from 'mongoose';

export default async function run(): Promise<void> {
  await connect('mongodb://localhost:27017/Sigma');
  console.log('connection');
}
