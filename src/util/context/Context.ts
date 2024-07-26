import { createContext } from "react";
import { IBloodDonorForm, IOnGoingApplocation } from "../types/InterFace/UtilInterface";

let OnGoingApplicationContext = createContext<IOnGoingApplocation>(undefined);
let BloodDonorFormContext = createContext<IBloodDonorForm>(undefined);

export { OnGoingApplicationContext, BloodDonorFormContext }