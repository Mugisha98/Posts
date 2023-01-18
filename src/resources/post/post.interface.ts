import { Document } from 'mongoose';

interface Post extends Document {
    _id: string;
    title: string;
    body: string;
}
export default Post;