'use client'

import DashboardLayout from '@/components/DashboardLayout'
import DomainSettings from '@/components/DomainSettings'

export default function DomainsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <DomainSettings />
      </div>
    </DashboardLayout>
  )
}
