import { Request, Response } from "express";
import { Solicitation } from "../database/entities/Solicitation";

export class SolicitationService {
    constructor(appDataSource: any) {
        this.appDataSource = appDataSource;
        this.solicitationRepo = this.appDataSource.getRepository(Solicitation);
    }

    appDataSource: any;
    solicitationRepo: any;

    async processSolicitations(req: Request, res: Response) {
        let counter = 0;
        const url = "https://www.sbir.gov/api/solicitations.json";
        fetch(url)
            .then((res) => res.json())
            .then((data: any) => {
                data.forEach((solicitation: any, i: number) => {
                    // if (solicitationRepo.findOne({where: {solicitation_title: solicitation.solicitation_title}})) {
                    //     return console.log(`Sol: ${solicitation.solicitation_title} already exists`)
                    // }
                    // if (solicitation.topics)
                    //     solicitation.topics.forEach((topic: any) => {
                    // const existingSolicitation = userRepo.findOne({ where: { solicitation_title: solicitation.solicitation_title } });
                    counter++;
                    console.log("Saving solicitation");
                    const newSolicitation = this.solicitationRepo.create(solicitation);
                    this.solicitationRepo.save(newSolicitation);
                    console.log("Solicitation saved");
                });
                console.log(`${counter} Solicitations saved`);
            })
            .catch((err) => {
                console.log(err);
            });

        return res.json({ message: "Processing solicitations" });
    }

    async createSolicitation(req: Request) {
        // Create a solicitation
        const newSolicitation = new Solicitation();
        const body = req.body;
        Object.assign(newSolicitation, body);
        await this.solicitationRepo.save(newSolicitation);
        return { message: "Solicitation created" };
    }

    async updateSolicitation(id: string, req: Request) {
        // Update a solicitation
        const solicitation = await this.solicitationRepo.findOne(id);
        if (!solicitation) {
            return { message: "Solicitation not found" };
        }
        const body = req.body;
        Object.assign(solicitation, body);
        await this.solicitationRepo.save(solicitation);
        return { message: "Solicitation updated" };

    }

    async deleteSolicitation(id: string) {
        // Delete a solicitation
        const solicitation = await this.solicitationRepo.findOne(id);
        if (!solicitation) {
            return { message: "Solicitation not found" };
        }
        solicitation.isDeleted = true;
        await this.solicitationRepo.save(solicitation);
        return { message: "Solicitation deleted" };

    }

    async getSolicitation(id: string) {
        // Get a solicitation
        const solicitation = await this.solicitationRepo.findOne(id);
        return solicitation;
    }

    async getAllSolicitations(req: Request, res: Response) {
        // Get all solicitations
        const solicitations = await this.solicitationRepo.find();
        return res.json(solicitations);
    }

    async getSolicitationsByAgency(agency: string) {
        // Get all solicitations by agency
        console.log("Agency:", agency);
        const solicitations = await this.solicitationRepo.find({
            where: { agency: agency },
        });
        return solicitations;
    }

    async getAgencies() {
        // Get all agencies
        const agencies = await this.solicitationRepo
            .createQueryBuilder("solicitation")
            .select("agency")
            .distinct(true)
            .getRawMany();
        return agencies;
    }
}

export default SolicitationService;
