import AddressEditFundRaise from "@/component/FundRaiser/EditSteps/AddressDetails";
import DescriptionEdit from "@/component/FundRaiser/EditSteps/AIDescription";
import EditBankAccount from "@/component/FundRaiser/EditSteps/BankAccountDetails";
import BasicFundRaiseEdit from "@/component/FundRaiser/EditSteps/BasicDetails";
import EditFundRaiserFiles from "@/component/FundRaiser/EditSteps/FileDetails";
import EditFundRaiserPersonalDetails from "@/component/FundRaiser/EditSteps/PersonalDetails";
import { FundRaiserEdit } from "@/util/types/Enums/BasicEnums";



export function findEditSection(type: FundRaiserEdit) {
    switch (type) {
        case FundRaiserEdit.Basic:
            return BasicFundRaiseEdit
        case FundRaiserEdit.Address:
            return AddressEditFundRaise
        case FundRaiserEdit.Bank:
            return EditBankAccount
        case FundRaiserEdit.Description:
            return DescriptionEdit
        case FundRaiserEdit.File:
            return EditFundRaiserFiles
        case FundRaiserEdit.Personal:
            return EditFundRaiserPersonalDetails
        default:
            return
    }
}