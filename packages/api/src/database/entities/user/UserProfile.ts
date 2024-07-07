import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity('user_profile')
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User, (user) => user.userProfile, { cascade: ['insert', 'update', 'remove'] })
    @JoinColumn()
    user: User

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({ nullable: true, unique: true })
    emailAddress: string

    @Column({ nullable: true })
    phoneNumber: string

    @Column({ nullable: true }) // TODO: Make ENum
    phoneCarrier: string

    @Column({ nullable: true })
    hasVisited: boolean

    @Column({ nullable: true })
    darkmode: boolean

    @Column({ nullable: true })
    rememberme: boolean

    @Column({ nullable: true })
    profilePicture: string

    @Column({ default: false, nullable: true })
    isDeleted: boolean

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @Column({ nullable: true })
    createdBy: string

    @Column({ nullable: true })
    updatedBy: string
}
