import { AlertTriangle, Home, ExternalLink } from 'lucide-react'

export default function DomainNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl bg-orange-500/20 border-2 border-orange-500/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-orange-400" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Domain Not Configured</h1>
        <p className="text-text/70 mb-8">
          This domain hasn't been set up yet. If you're the owner, please configure your domain in the dashboard.
        </p>

        <div className="space-y-4">
          <a
            href="https://streamtosite.com"
            className="btn-primary w-full py-3 inline-flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to StreamToSite</span>
          </a>

          <a
            href="https://streamtosite.com/docs/custom-domains"
            className="btn-secondary w-full py-3 inline-flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Learn About Custom Domains</span>
          </a>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-surface border border-border-color text-sm text-left">
          <p className="font-semibold mb-2">Are you the domain owner?</p>
          <ol className="list-decimal list-inside space-y-1 text-text/60">
            <li>Log in to your StreamToSite dashboard</li>
            <li>Go to Settings → Domains</li>
            <li>Add your custom domain</li>
            <li>Follow the DNS configuration instructions</li>
            <li>Verify your domain</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
