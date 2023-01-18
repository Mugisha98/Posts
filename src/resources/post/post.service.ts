import PostModel from '@/resources/post/post.model'
import IPost from '@/resources/post/post.interface'
import HttpException from '@/utils/exceptions/http.exception'

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
    public getOne = async (_id: string): Promise<IPost> => {
        try {
            const post = await this.post.findById(_id);
            if(post){
                console.log(post);
            }
            return post;
        } catch (error) {
            throw new Error("Unable to get the post");
        }
    }
    /*
        Create a new post
    */
        public create = async (title: string, body: string): Promise<IPost> => {
            try {
                const post = await this.post.create({ title, body });
                return post;
            } catch (error) {
                throw new Error("Unable to create the post");
            }
        }
    
}

export default PostService;