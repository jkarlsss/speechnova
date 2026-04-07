import PageHeader from "../../components/page-header";
import DashboardHeader from "../dashboard/components/dashboard-header";
import HeroPattern from "../dashboard/components/hero-pattern";
import QuickActionsPanel from "../dashboard/components/quick-actions-panel";
import TextInputPanel from "../dashboard/components/text-input-panel";

export default function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  )
}
