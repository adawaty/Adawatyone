import SolutionTemplate from "@/components/solutions/SolutionTemplate";
import { useI18n } from "@/contexts/I18nContext";
import { getAppDevelopmentSolution } from "@/pages/solutions/app-development.data";

export default function AppDevelopmentSolutionPage() {
  const { lang } = useI18n();
  return <SolutionTemplate data={getAppDevelopmentSolution(lang)} />;
}
