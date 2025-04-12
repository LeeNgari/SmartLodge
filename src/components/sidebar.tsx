import Link from "next/link"
import { LayoutDashboard, BedDouble, CalendarClock, Users, UserRound, BarChart3, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="hidden md:flex h-full w-64 flex-col bg-primary text-primary-foreground border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BedDouble className="h-6 w-6" />
          <span className="text-xl">SmartLodge</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {items.map((item, index) => (
            <Button
              key={index}
              variant={index === 0 ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-2 h-10",
                index === 0 ? "bg-primary-foreground text-primary" : "hover:bg-primary/10",
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-primary/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

const items = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/",
  },
  {
    title: "Rooms",
    icon: <BedDouble className="h-4 w-4" />,
    href: "/rooms",
  },
  {
    title: "Bookings",
    icon: <CalendarClock className="h-4 w-4" />,
    href: "/bookings",
  },
  {
    title: "Guests",
    icon: <Users className="h-4 w-4" />,
    href: "/guests",
  },
  {
    title: "Staff",
    icon: <UserRound className="h-4 w-4" />,
    href: "/staff",
  },
  {
    title: "Reports",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "/settings",
  },
]

