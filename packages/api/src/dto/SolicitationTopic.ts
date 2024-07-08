/* eslint-disable */
export class SolicitationTopic {
    id?: number;
    solicitation_id?: string;
    solicitation_title?: string;
    solicitation_number?: string;
    program?: string;
    phase?: string;
    agency?: string;
    branch?: string;
    solicitation_year?: string;
    sbir_solicitation_link?: string;
    solicitation_agency_url?: string;
    release_date?: Date;
    open_date?: Date;
    close_date?: Date;
    application_due_date?: string;
    current_status?: string;
    topic_id?: string;
    topic_title?: string;
    topic_branch?: string;
    topic_description?: string;
    topic_number?: string;
    sbir_topic_link?: string;

    constructor(partial: Partial<SolicitationTopic>) {
        Object.assign(this, partial);
    }
}
