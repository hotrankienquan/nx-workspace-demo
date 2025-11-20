import { useDetailContext } from "../context/ContextHook";
import { AnyRecord } from "../types/claims.type";
import ClaimStageForm from "./ClaimStageForm";


const DetailForm: React.FC = () => {
    const {
        formConfig,
        currentStageIndex,
        setCurrentStageIndex,
        allStagesData,
        setAllStagesData,
        actionSaveStageMutation,
        id,
    } = useDetailContext();

    const currentStage = formConfig!.stages[currentStageIndex];
    const isLast = currentStageIndex === formConfig!.stages.length - 1;

    const handleSubmit = async (data: AnyRecord) => {
        const updated: Record<string, AnyRecord> = { ...allStagesData, [currentStage.id]: data };
        setAllStagesData(updated);

        try {
            if (isLast) {
                const flattened = Object.values(updated).reduce((acc, s) => ({ ...acc, ...s }), {});
                await actionSaveStageMutation.mutateAsync({
                    claimId: id,
                    stageId: currentStage.id,
                    data: flattened,
                });
            } else {
                setCurrentStageIndex((s) => s + 1);
            }
        } catch (e) {
            console.error("Error saving stage:", e);
        }
    };

    return (
        <ClaimStageForm
            key={currentStage.id}
            stageConfig={currentStage}
            defaultValues={allStagesData[currentStage.id] || {}}
            onSubmit={handleSubmit}
            onPrevious={() => setCurrentStageIndex((s) => Math.max(0, s - 1))}
            isFirstStage={currentStageIndex === 0}
            isLastStage={isLast}
            isSaving={actionSaveStageMutation.isPending}
        />
    );
};
export default DetailForm;