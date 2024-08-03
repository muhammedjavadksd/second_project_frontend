import { createContext } from "react";
import { IBloodDonorForm, IOnGoingApplocation, IOnGoingBloodRequest, IOnGoingBloodRequestProvider } from "../types/InterFace/UtilInterface";

let OnGoingApplicationContext = createContext<IOnGoingApplocation>(undefined);
let BloodDonorFormContext = createContext<IBloodDonorForm>(undefined);
let OnGoingBloodRequestContext = createContext<IOnGoingBloodRequestProvider>(null);

export { OnGoingApplicationContext, BloodDonorFormContext, OnGoingBloodRequestContext }