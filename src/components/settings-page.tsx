import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SettingsOverview } from "@/components/settings-overview"

export function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <SettingsOverview />
        </main>
      </div>
    </div>
  )
}

