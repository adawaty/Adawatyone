/*
Cairo Circuit Futurism — App routing (updated IA)
*/

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { useState } from "react";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import AiVisibilityAudit from "@/pages/AiVisibilityAudit";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import PricingCalculator from "@/pages/PricingCalculator";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import AppDevelopmentSolution from "@/pages/solutions/AppDevelopmentSolution";
import ErpWorkflowsSolution from "@/pages/solutions/ErpWorkflowsSolution";
import LeadGenerationSolution from "@/pages/solutions/LeadGenerationSolution";
import EducationSystemsSolution from "@/pages/solutions/EducationSystemsSolution";
import Glossary from "@/pages/Glossary";
import GlossaryEntry from "@/pages/GlossaryEntry";
import For from "@/pages/For";
import PersonaDetail from "@/pages/PersonaDetail";
import Work from "@/pages/Work";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        {/* AnyGen preview sometimes opens dist/index.html directly */}
        <Route path="/index.html" component={Home} />
        <Route path="/dist/index.html" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/app-development" component={AppDevelopmentSolution} />
        <Route path="/solutions/erp-workflows" component={ErpWorkflowsSolution} />
        <Route path="/solutions/lead-generation" component={LeadGenerationSolution} />
        <Route path="/solutions/education-systems" component={EducationSystemsSolution} />
        <Route path="/solutions/:slug">{(params) => <SolutionDetail slug={params.slug} />}</Route>
        <Route path="/glossary" component={Glossary} />
        <Route path="/glossary/:slug">{(params) => <GlossaryEntry slug={params.slug} />}</Route>
        <Route path="/for" component={For} />
        <Route path="/for/:slug">{(params) => <PersonaDetail slug={params.slug} />}</Route>
        <Route path="/industries" component={Industries} />
        <Route path="/industries/:id">{(params) => <IndustryDetail id={params.id} />}</Route>
        <Route path="/services/:id">{(params) => <ServiceDetail id={params.id} />}</Route>
        <Route path="/ai-visibility-audit" component={AiVisibilityAudit} />
        <Route path="/pricing-calculator" component={PricingCalculator} />
        <Route path="/work" component={Work} />
        <Route path="/work/:slug">{(params) => <CaseStudyDetail slug={params.slug} />}</Route>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("adawaty_preload_done") !== "1";
  });

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <I18nProvider>
          {showPreloader ? (
            <Preloader
              onDone={() => {
                sessionStorage.setItem("adawaty_preload_done", "1");
                setShowPreloader(false);
              }}
            />
          ) : null}
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
