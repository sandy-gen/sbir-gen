import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

import { UserProfile } from './UserProfile'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    companyId: string

    @Column({ unique: true })
    username: string

    // TODO: Add validation
    @Column({ select: false })
    password: string

    @Column({ nullable: true })
    loginAttempts: number

    @Column({ nullable: true })
    isLocked: boolean

    @Column({ nullable: true })
    visited: boolean

    @Column('simple-array', { nullable: true })
    userRoles: string[]

    @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: ['insert', 'update'], eager: true })
    userProfile: UserProfile

    @Column({ default: false })
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
