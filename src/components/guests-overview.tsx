import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function GuestsOverview() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
          <p className="text-muted-foreground">Manage hotel guests and their information</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Guest
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search guests..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Guests</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
          <TabsTrigger value="frequent">Frequent</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Guest List</CardTitle>
              <CardDescription>Manage all hotel guests and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Stay</TableHead>
                    <TableHead>Total Stays</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={guest.avatar} alt={guest.name} />
                            <AvatarFallback>
                              {guest.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{guest.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{guest.email}</TableCell>
                      <TableCell>{guest.phone}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(guest.status)}>{guest.status}</Badge>
                      </TableCell>
                      <TableCell>{guest.lastStay}</TableCell>
                      <TableCell>{guest.totalStays}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                            <span className="sr-only">Call</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Guest</DropdownMenuItem>
                              <DropdownMenuItem>View Bookings</DropdownMenuItem>
                              <DropdownMenuItem>Create Booking</DropdownMenuItem>
                              <DropdownMenuItem>Add to VIP</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Current Guests</CardTitle>
              <CardDescription>Guests currently staying at the hotel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.status === "Current")
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={guest.avatar} alt={guest.name} />
                              <AvatarFallback>
                                {guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{guest.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>{guest.currentRoom || "N/A"}</TableCell>
                        <TableCell>{guest.checkIn || "N/A"}</TableCell>
                        <TableCell>{guest.checkOut || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>View Booking</DropdownMenuItem>
                                <DropdownMenuItem>Add Services</DropdownMenuItem>
                                <DropdownMenuItem>Extend Stay</DropdownMenuItem>
                                <DropdownMenuItem>Check Out</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vip" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>VIP Guests</CardTitle>
              <CardDescription>Special guests with VIP status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Stay</TableHead>
                    <TableHead>Total Stays</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.vip)
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={guest.avatar} alt={guest.name} />
                              <AvatarFallback>
                                {guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{guest.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(guest.status)}>{guest.status}</Badge>
                        </TableCell>
                        <TableCell>{guest.lastStay}</TableCell>
                        <TableCell>{guest.totalStays}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Guest</DropdownMenuItem>
                                <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                <DropdownMenuItem>Create Booking</DropdownMenuItem>
                                <DropdownMenuItem>Remove VIP Status</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frequent" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Frequent Guests</CardTitle>
              <CardDescription>Guests who stay frequently at the hotel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Stay</TableHead>
                    <TableHead>Total Stays</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.totalStays >= 5)
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={guest.avatar} alt={guest.name} />
                              <AvatarFallback>
                                {guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{guest.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(guest.status)}>{guest.status}</Badge>
                        </TableCell>
                        <TableCell>{guest.lastStay}</TableCell>
                        <TableCell>{guest.totalStays}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Guest</DropdownMenuItem>
                                <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                <DropdownMenuItem>Create Booking</DropdownMenuItem>
                                <DropdownMenuItem>Add to VIP</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Current":
      return "success"
    case "Past":
      return "secondary"
    case "Upcoming":
      return "default"
    default:
      return "secondary"
  }
}

const guests = [
  {
    id: 1,
    name: "Wanjiku Kamau",
    email: "wanjiku.k@gmail.com",
    phone: "+254 722 123 456",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Current",
    lastStay: "Apr 1, 2025",
    totalStays: 3,
    vip: true,
    currentRoom: "301",
    checkIn: "Apr 1, 2025",
    checkOut: "Apr 5, 2025",
  },
  {
    id: 2,
    name: "Mwangi Njoroge",
    email: "mwangi.n@gmail.com",
    phone: "+254 733 234 567",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Upcoming",
    lastStay: "Jan 15, 2025",
    totalStays: 2,
    vip: false,
  },
  {
    id: 3,
    name: "Akinyi Odhiambo",
    email: "akinyi.o@gmail.com",
    phone: "+254 722 345 678",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Past",
    lastStay: "Mar 28, 2025",
    totalStays: 7,
    vip: true,
  },
  {
    id: 4,
    name: "Otieno Wekesa",
    email: "otieno.w@gmail.com",
    phone: "+254 733 456 789",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Upcoming",
    lastStay: "Feb 10, 2025",
    totalStays: 1,
    vip: false,
  },
  {
    id: 5,
    name: "Njeri Muthoni",
    email: "njeri.m@gmail.com",
    phone: "+254 722 567 890",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Past",
    lastStay: "Mar 20, 2025",
    totalStays: 4,
    vip: false,
  },
  {
    id: 6,
    name: "Kipchoge Keino",
    email: "kipchoge.k@gmail.com",
    phone: "+254 733 678 901",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Past",
    lastStay: "Mar 30, 2025",
    totalStays: 6,
    vip: true,
  },
  {
    id: 7,
    name: "Amina Hassan",
    email: "amina.h@gmail.com",
    phone: "+254 722 789 012",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Current",
    lastStay: "Apr 2, 2025",
    totalStays: 2,
    vip: false,
    currentRoom: "205",
    checkIn: "Apr 2, 2025",
    checkOut: "Apr 7, 2025",
  },
  {
    id: 8,
    name: "Kimani Mbugua",
    email: "kimani.m@gmail.com",
    phone: "+254 733 890 123",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Current",
    lastStay: "Apr 4, 2025",
    totalStays: 5,
    vip: true,
    currentRoom: "401",
    checkIn: "Apr 4, 2025",
    checkOut: "Apr 9, 2025",
  },
]

