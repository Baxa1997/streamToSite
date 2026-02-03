'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { DollarSign, TrendingUp, BarChart3, Settings } from 'lucide-react'

export default function MonetizationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Monetization</span>
          </h1>
          <p className="text-text/70">
            Track your revenue and optimize your earnings
          </p>
        </div>

        <div className="bento-card">
          <div className="text-center py-20">
            <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Monetization Dashboard</h2>
            <p className="text-text/60">Coming soon - Track AdSense revenue and analytics</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
