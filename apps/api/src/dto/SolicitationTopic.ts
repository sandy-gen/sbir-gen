/* eslint-disable */
import { Solicitation } from '../database/entities/Solicitation';
import { Topic } from '../database/entities/Topic';

export class SolicitationTopic {
    id: number;
    solicitation: Solicitation;
    topic: Topic;   
}
