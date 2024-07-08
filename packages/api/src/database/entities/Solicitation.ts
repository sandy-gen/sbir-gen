import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Topic } from "./Topic";
import { Type } from "class-transformer";


@Entity("solicitation")
export class Solicitation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    solicitation_title: string;

    @Column({ nullable: true })
    solicitation_number: string;

    @Column({ nullable: true })
    program: string;

    @Column({ nullable: true })
    phase: string;

    @Column({ nullable: true })
    agency: string;

    @Column({ nullable: true })
    branch: string;

    @Column({ nullable: true })
    solicitation_year: string;

    @Column({ nullable: true })
    sbir_solicitation_link: string;

    @Column({ nullable: true })
    solicitation_agency_url: string;

    @Column({ nullable: true })
    release_date: Date;

    @Column({ nullable: true })
    open_date: Date;

    @Column({ nullable: true })
    close_date: Date;

    @Column({ nullable: true })
    application_due_date: string;

    @Column({ nullable: true })
    current_status: string;

    @OneToMany(() => Topic, (topic: Topic) => topic.solicitation, { cascade: true })
    @Type(() => Topic)
    topics: Topic[];

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

    solicitation: any;
}
