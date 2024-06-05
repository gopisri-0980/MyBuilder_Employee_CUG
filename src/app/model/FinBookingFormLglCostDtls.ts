export class FinBookingFormLglCostDtls{
    legalAmount:number;
    description:string;

    constructor(legalAmount: number, description: string) {
        this.legalAmount = legalAmount;
        this.description = description;
    }
}