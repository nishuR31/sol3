"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Wifi } from "lucide-react"

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    { name: "Web Application", status: "operational", uptime: "99.9%", icon: Server },
    { name: "API Services", status: "operational", uptime: "99.8%", icon: Database },
    { name: "Solana RPC", status: "operational", uptime: "99.7%", icon: Wifi },
    { name: "Transaction Processing", status: "degraded", uptime: "98.5%", icon: Activity },
  ]

  const incidents = [
    {
      title: "Intermittent API Slowdowns",
      status: "investigating",
      time: "2 hours ago",
      description: "We're investigating reports of slower than normal API response times.",
    },
    {
      title: "Scheduled Maintenance Complete",
      status: "resolved",
      time: "1 day ago",
      description: "Scheduled maintenance for database optimization has been completed successfully.",
    },
    {
      title: "Brief Service Interruption",
      status: "resolved",
      time: "3 days ago",
      description: "A brief service interruption affecting wallet connections has been resolved.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "outage":
        return "text-red-500"
      case "investigating":
        return "text-yellow-500"
      case "resolved":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle
      case "degraded":
        return AlertCircle
      case "outage":
        return XCircle
      case "investigating":
        return Clock
      case "resolved":
        return CheckCircle
      default:
        return AlertCircle
    }
  }

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          System Status
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Service Status
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time status and uptime information for all Solana Web3 services.
        </p>
      </div>

      {/* Overall Status */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            All Systems Operational
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-muted-foreground">
              All core services are running normally. Last updated: {currentTime.toLocaleTimeString()}
            </p>
            <Badge variant="outline" className="w-fit">
              99.8% Uptime (30 days)
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Service Status</h2>
        <div className="grid gap-4">
          {services.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status)
            return (
              <Card key={index} className="glass">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <service.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(service.status)}`} />
                        <span className={`text-sm capitalize ${getStatusColor(service.status)}`}>{service.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{service.uptime}</p>
                    <p className="text-sm text-muted-foreground">30-day uptime</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Recent Incidents</h2>
        <div className="space-y-4">
          {incidents.map((incident, index) => {
            const StatusIcon = getStatusIcon(incident.status)
            return (
              <Card key={index} className="glass">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <StatusIcon className={`h-5 w-5 mt-0.5 ${getStatusColor(incident.status)}`} />
                      <div>
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{incident.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{incident.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Subscribe to Updates */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Stay Informed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Subscribe to status updates to be notified of any service disruptions or maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe to Updates
            </button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors">
              RSS Feed
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
