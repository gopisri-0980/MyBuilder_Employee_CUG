import { FinBookingFormLglCostDtls } from './FinBookingFormLglCostDtls';
export class FinBookingFormLegalCost{
    legalAmount:number;
    taxAmount:number;
    totalAmount:number;
    finBookingFormLglCostDtlsList:Array<FinBookingFormLglCostDtls>;

   constructor(legalAmount:number,taxAmount:number,totalAmount:number,finBookingFormLglCostDtlsList:Array<FinBookingFormLglCostDtls>){
    this.legalAmount = legalAmount;
    this.taxAmount = taxAmount;
    this.totalAmount = totalAmount;
    this.finBookingFormLglCostDtlsList = finBookingFormLglCostDtlsList;
    }

}