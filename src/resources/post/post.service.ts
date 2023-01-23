import PostModel from '@/resources/post/post.model'
import IPost from '@/resources/post/post.interface'

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
    public getOne = async (_id: string ): Promise<IPost> => {
        try {
            const post = await this.post.findOne({ _id });
            return post!;
        } catch (error) {
            throw new Error("Unable to get the post");
        }
    }
    /*
        Create a new post
    */
    public create = async (
        title: string, 
        content: string
        ): Promise<IPost> => {
        try {
            const post = await this.post.create({ title, content });
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
        content: string
        ): Promise<IPost> => {
        try {
            const post = await this.post.findByIdAndUpdate(_id, { title, content}, { new: true });
            return post!; // ! is used to tell the compiler that the post is not null
        } catch (error) {
            throw new Error("Unable to update the post");
        }
    }

    /*
        Delete a post
    */
    public delete = async (_id: string): Promise<IPost> => {
        try {
            const post = await this.post.findById(_id);
            if(post) {
                await post.remove();
                return post;
            }else {
                throw new Error("Post not found");
            }   
        }catch (error) {
            throw new Error("Unable to delete the post");
        }
    }

}

export default PostService;