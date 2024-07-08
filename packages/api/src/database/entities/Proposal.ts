import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Topic } from "./Topic";
import { Solicitation } from "./Solicitation";

@Entity("proposal")
export class Proposal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    solicitation: Solicitation

    @Column({ nullable: true })
    topic: Topic

    @Column({ nullable: true })
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
