'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { Settings as SettingsIcon, User, Bell, Lock } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-text/70">
            Manage your account and preferences
          </p>
        </div>

        <div className="bento-card">
          <div className="text-center py-20">
            <SettingsIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
            <p className="text-text/60">Coming soon - Manage your profile and preferences</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
