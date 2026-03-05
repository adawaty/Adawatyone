import SolutionTemplate from "@/components/solutions/SolutionTemplate";
import { useI18n } from "@/contexts/I18nContext";
import { getEducationSystemsSolution } from "@/pages/solutions/education-systems.data";

export default function EducationSystemsSolutionPage() {
  const { lang } = useI18n();
  return <SolutionTemplate data={getEducationSystemsSolution(lang)} />;
}
