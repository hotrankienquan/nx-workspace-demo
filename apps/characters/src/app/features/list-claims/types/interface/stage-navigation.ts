import { FormStage } from "../../../detail-claims/types/claims.type";

export interface StateNavigationProps {
    stages: FormStage[];
    currentStageIndex: number;
    completedStages: Set<number>;
    onNavigate:(index:number) => void;
}




