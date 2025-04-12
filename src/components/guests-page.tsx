import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { GuestsOverview } from "@/components/guests-overview"

export function GuestsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <GuestsOverview />
        </main>
      </div>
    </div>
  )
}

