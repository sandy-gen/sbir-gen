import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Solicitation } from './Solicitation'
import { Exclude } from 'class-transformer';

@Entity('topic')
export class Topic {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    solicitationId: string

    @ManyToOne(() => Solicitation, (solicitation: Solicitation) => solicitation.topics)
    @Exclude()
    solicitation: Solicitation;

    @Column({ nullable: true })
    topic_title: string

    @Column({ nullable: true }) 
    branch: string

    @Column({ nullable: true })
    topic_number: string

    @Column({ nullable: true })
    topic_description: string

    @Column({ nullable: true })
    sbir_topic_link: string

    @Column({ nullable: true })
    subtopics: string

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