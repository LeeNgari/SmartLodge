import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function BookingsList() {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center gap-4 rounded-lg border p-3">
          <Avatar>
            <AvatarImage src={booking.guestAvatar} alt={booking.guestName} />
            <AvatarFallback>
              {booking.guestName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{booking.guestName}</p>
              <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <p>
                Room {booking.roomNumber} • {booking.checkIn} - {booking.checkOut}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Confirmed":
      return "default"
    case "Checked In":
      return "success"
    case "Pending":
      return "warning"
    default:
      return "secondary"
  }
}

const bookings = [
  {
    id: 1,
    guestName: "Wanjiku Kamau",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    roomNumber: "301",
    checkIn: "Mar 24",
    checkOut: "Mar 28",
    status: "Checked In",
  },
  {
    id: 2,
    guestName: "Mwangi Njoroge",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    roomNumber: "205",
    checkIn: "Mar 25",
    checkOut: "Mar 27",
    status: "Confirmed",
  },
  {
    id: 3,
    guestName: "Akinyi Odhiambo",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    roomNumber: "118",
    checkIn: "Mar 26",
    checkOut: "Mar 30",
    status: "Pending",
  },
  {
    id: 4,
    guestName: "Otieno Wekesa",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    roomNumber: "402",
    checkIn: "Mar 27",
    checkOut: "Apr 2",
    status: "Confirmed",
  },
]

