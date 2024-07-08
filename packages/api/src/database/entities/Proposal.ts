import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("proposal")
export class Proposal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    solicitationId: string

    @Column({ nullable: true })
    topicId: string

    @Column()
    title: string;

    @Column({ nullable: true })
    number: string;

    @Column({ nullable: true })
    product_req_doc: string;

    @Column({ nullable: true })
    tech_spec: string;

    @Column({ nullable: true })
    proposal: string;

    @Column({ nullable: true })
    presentation: string;

    @Column({ nullable: true })
    status: string;

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;
}
