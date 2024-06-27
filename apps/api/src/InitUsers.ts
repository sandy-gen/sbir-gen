import { User } from './database/entities/user/User'
import { getDataSource } from './DataSource'
import md5 from 'md5'

const users = [
    {
        username: 'sandy',
        password: md5('1234'),
        loginAttempts: 0,
        isLocked: false,
        userProfile: {
            firstName: 'Sandy',
            lastName: 'Friedman',
            emailAddress: 'sandy@genwith.ai',
            phoneNumber: '1234567890'
        },
        userRoles: ['Admin', 'User', 'Demo']
    },
]
// More users...

export const InitUsers = async () => {
    const userRepository = getDataSource().getRepository(User)

    for (const user of users) {
        const existingUser = await userRepository.findOne({ where: { username: user.username } })
        if (existingUser) {
            continue
        }

        const newUser = userRepository.create(user)
        await userRepository.save(newUser)
    }
}
export default InitUsers
