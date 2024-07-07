import { UserTopic } from "../database/entities/UserTopic";

export class UserTopicService {
    constructor(appDataSource: any) {
        this.appDataSource = appDataSource;
        this.userTopicRepo = this.appDataSource.getRepository(UserTopic);
    }

    appDataSource: any;
    userTopicRepo: any;

    async getUserTopics() {
        // Get all user topics
        const results = await this.userTopicRepo.find()
        return results
    }

    async getUserTopic(id: string) {
        // Get a user topic
        const results = await this.userTopicRepo.findOne(id)
        return results
    }

    async updateUserTopic(id: string, req: Request) {
        // Update a user topic
        const userTopic = await this.userTopicRepo.findOne(id)
        if (!userTopic) {
            return { message: "User topic not found" }
        }
        const body = req.body
        Object.assign(userTopic, body)
        await this.userTopicRepo.save(userTopic)
        return { message: "User topic updated" }
    }

    async deleteUserTopic(id: string) {
        // Delete a user topic
        const userTopic = await this.userTopicRepo.findOne(id)
        if (!userTopic) {
            return { message: "User topic not found" }
        }
        userTopic.isDeleted = true
        await this.userTopicRepo.save(userTopic)
        return { message: "User topic deleted" }
    }

    async createUserTopic(req: Request) {
        // Create a user topic
        const body = req.body
        const newUserTopic = new UserTopic()
        Object.assign(newUserTopic, body)
        const results = await this.userTopicRepo.getRepository(UserTopic).save(newUserTopic)
        return results
    }


}

export default UserTopicService