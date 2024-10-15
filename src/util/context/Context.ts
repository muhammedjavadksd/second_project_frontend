import { createContext } from "react";
import { IBloodDonorForm, IChatHistoryContext, IOnGoingApplocation, IOnGoingBloodRequest, IOnGoingBloodRequestProvider } from "../types/InterFace/UtilInterface";
import { ChatHistory } from "../types/API Response/Profile";

let OnGoingApplicationContext = createContext<IOnGoingApplocation>(undefined);
let BloodDonorFormContext = createContext<IBloodDonorForm>(undefined);
let ChatHistoryContext = createContext<IChatHistoryContext>(null);
// let OnGoingBloodRequestContext = createContext<IOnGoingBloodRequestProvider>(null);

export { OnGoingApplicationContext, BloodDonorFormContext, ChatHistoryContext }