import SolutionTemplate from "@/components/solutions/SolutionTemplate";
import { useI18n } from "@/contexts/I18nContext";
import { getErpWorkflowsSolution } from "@/pages/solutions/erp-workflows.data";

export default function ErpWorkflowsSolutionPage() {
  const { lang } = useI18n();
  return <SolutionTemplate data={getErpWorkflowsSolution(lang)} />;
}
