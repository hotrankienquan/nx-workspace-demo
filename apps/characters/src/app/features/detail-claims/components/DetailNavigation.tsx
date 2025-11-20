import { useDetailContext } from "../context/ContextHook";
import StageNavigation from "./StageNavigation";

const DetailNavigation: React.FC = () => {
    const { formConfig, currentStageIndex, completedStages, setCurrentStageIndex } = useDetailContext();
    return (
        <StageNavigation
            stages={formConfig!.stages}
            currentStageIndex={currentStageIndex}
            completedStages={completedStages}
            onNavigate={setCurrentStageIndex}
        />
    );
};

export default DetailNavigation;
