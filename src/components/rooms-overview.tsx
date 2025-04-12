import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BedDouble, CheckCircle2, Clock, XCircle, Plus, Filter, Search } from "lucide-react"

export function RoomsOverview() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground">Manage hotel rooms and their status</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search rooms..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="floor1">1st Floor</TabsTrigger>
          <TabsTrigger value="floor2">2nd Floor</TabsTrigger>
          <TabsTrigger value="floor3">3rd Floor</TabsTrigger>
          <TabsTrigger value="floor4">4th Floor</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map((room) => (
              <RoomCard key={room.number} room={room} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="floor1" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms
              .filter((room) => room.number.startsWith("1"))
              .map((room) => (
                <RoomCard key={room.number} room={room} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="floor2" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms
              .filter((room) => room.number.startsWith("2"))
              .map((room) => (
                <RoomCard key={room.number} room={room} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="floor3" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms
              .filter((room) => room.number.startsWith("3"))
              .map((room) => (
                <RoomCard key={room.number} room={room} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="floor4" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms
              .filter((room) => room.number.startsWith("4"))
              .map((room) => (
                <RoomCard key={room.number} room={room} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Room {
  number: string
  type: string
  status: "Occupied" | "Available" | "Reserved" | "Maintenance"
  price: number
  capacity: number
  guest?: string
  checkOut?: string
}

function RoomCard({ room }: { room: Room }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Occupied":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Available":
        return <BedDouble className="h-5 w-5 text-amber-500" />
      case "Reserved":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "Maintenance":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "bg-green-100 text-green-800"
      case "Available":
        return "bg-amber-100 text-amber-800"
      case "Reserved":
        return "bg-blue-100 text-blue-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Room {room.number}</CardTitle>
          {getStatusIcon(room.status)}
        </div>
        <CardDescription>{room.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">KSh {room.price * 100}/night</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <span className="font-medium">
              {room.capacity} {room.capacity > 1 ? "Persons" : "Person"}
            </span>
          </div>
          <div className="mt-2">
            <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
          </div>
          {room.guest && (
            <div className="mt-2 text-sm">
              <p className="text-muted-foreground">Current Guest:</p>
              <p className="font-medium">{room.guest}</p>
              {room.checkOut && <p className="text-xs text-muted-foreground">Check-out: {room.checkOut}</p>}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

const rooms: Room[] = [
  {
    number: "101",
    type: "Standard",
    status: "Occupied",
    price: 120,
    capacity: 2,
    guest: "John Smith",
    checkOut: "Apr 2, 2025",
  },
  { number: "102", type: "Standard", status: "Available", price: 120, capacity: 2 },
  { number: "103", type: "Deluxe", status: "Reserved", price: 180, capacity: 2 },
  { number: "104", type: "Deluxe", status: "Maintenance", price: 180, capacity: 2 },
  {
    number: "201",
    type: "Suite",
    status: "Occupied",
    price: 250,
    capacity: 3,
    guest: "Emma Thompson",
    checkOut: "Apr 5, 2025",
  },
  { number: "202", type: "Suite", status: "Available", price: 250, capacity: 3 },
  { number: "203", type: "Standard", status: "Reserved", price: 120, capacity: 2 },
  { number: "204", type: "Standard", status: "Available", price: 120, capacity: 2 },
  {
    number: "301",
    type: "Executive",
    status: "Occupied",
    price: 320,
    capacity: 4,
    guest: "Michael Chen",
    checkOut: "Apr 3, 2025",
  },
  { number: "302", type: "Executive", status: "Available", price: 320, capacity: 4 },
  { number: "303", type: "Deluxe", status: "Reserved", price: 180, capacity: 2 },
  { number: "304", type: "Deluxe", status: "Maintenance", price: 180, capacity: 2 },
  {
    number: "401",
    type: "Suite",
    status: "Occupied",
    price: 250,
    capacity: 3,
    guest: "Sarah Johnson",
    checkOut: "Apr 7, 2025",
  },
  { number: "402", type: "Suite", status: "Available", price: 250, capacity: 3 },
  { number: "403", type: "Standard", status: "Reserved", price: 120, capacity: 2 },
  { number: "404", type: "Standard", status: "Available", price: 120, capacity: 2 },
]

