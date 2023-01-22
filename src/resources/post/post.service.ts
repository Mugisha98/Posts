import PostModel from '@/resources/post/post.model'
import IPost from '@/resources/post/post.interface'
import HttpException from '@/utils/exceptions/http.exception'
import { ObjectId } from 'mongoose';

class PostService {
    private post = PostModel;
    
    /*
        Get all posts
    */
    public getAll = async (): Promise<IPost[]> => {
        try {
            const posts = await this.post.find();
            return posts;
        } catch (error) {
            throw new Error("Unable to get all posts");
        }
    }
    /*
        Get one post
    */
    public getOne = async (_id: string) => {
        try {
            const post = await this.post.findOne({ _id });
            if(post){
                console.log("Post: ", post);
            }

            return null;
        } catch (error) {
            throw new Error("Unable to get the post");
        }
    }
    /*
        Create a new post
    */
    public create = async (
        title: string, 
        body: string
        ): Promise<IPost> => {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error("Unable to create the post");
        }
    }

    /*
        Update a post
    */
    public update = async (
        _id: string, 
        title: string, 
        body: string
        ): Promise<IPost> => {
        try {
            const post = await this.post.findByIdAndUpdate(_id, { title, body}, { new: true });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return post!;
        } catch (error) {
            throw new Error("Unable to update the post");
        }
    }

}

export default PostService;