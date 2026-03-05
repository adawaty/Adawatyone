import SolutionTemplate from "@/components/solutions/SolutionTemplate";
import { useI18n } from "@/contexts/I18nContext";
import { getLeadGenerationSolution } from "@/pages/solutions/lead-generation.data";

export default function LeadGenerationSolutionPage() {
  const { lang } = useI18n();
  return <SolutionTemplate data={getLeadGenerationSolution(lang)} />;
}
