import { createContext } from "react";
import { IOnGoingApplocation } from "../types/InterFace/UtilInterface";

let OnGoingApplicationContext = createContext<IOnGoingApplocation>(undefined);

export { OnGoingApplicationContext }