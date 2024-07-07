import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user_topic")
export class UserTopic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string

  @Column()
  solicitationId: string

  @Column()
  topicId: string

  @Column({ nullable: true })
  proposal: string;

  @Column({ nullable: true })
  product: string;

  @Column({ nullable: true })
  presentation: string;

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
