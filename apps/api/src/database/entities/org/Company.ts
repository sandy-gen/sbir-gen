/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from '../user/User'

@Entity()
export class Company implements ICompany {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    city: string

    @Column()
    country: string

    @Column({ nullable: true })
    emailAddress: string

    @Column({ nullable: true })
    phoneNumber: string

    @Column({ nullable: true }) // TODO: Make ENum
    phoneCarrier: string

    @OneToMany(() => User, (user) => user.companyId) // One company can have multiple users
    users: User[]

    // todo: make soft delete
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

export interface ICompany {
    id: string
    name: string
    address: string
    country: string
    users: User[]
    updatedDate: Date
    createdDate: Date
}
