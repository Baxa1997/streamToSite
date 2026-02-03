'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import WordPressConnect from '@/components/WordPressConnect'
import { 
  Webhook, 
  Zap, 
  CheckCircle2, 
  Copy,
  ExternalLink,
  Loader2,
  Code
} from 'lucide-react'

export default function IntegrationsPage() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [isTestingWebhook, setIsTestingWebhook] = useState(false)
  const [webhookTested, setWebhookTested] = useState(false)

  const handleTestWebhook = () => {
    setIsTestingWebhook(true)
    
    // Simulate webhook test
    setTimeout(() => {
      setIsTestingWebhook(false)
      setWebhookTested(true)
    }, 2000)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  const samplePayload = {
    event: 'post.published',
    timestamp: '2026-02-03T18:45:23Z',
    post: {
      id: '123',
      title: 'Inception Ending Explained',
      slug: 'inception-ending-explained',
      content: 'Full post content...',
      author: 'john',
      tags: ['Movie Analysis', 'Christopher Nolan'],
      published_at: '2026-02-03T18:45:23Z',
      url: 'https://john.streamtosite.com/inception-ending-explained'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Integrations</span>
          </h1>
          <p className="text-text/70">
            Connect StreamToSite with your favorite tools and platforms
          </p>
        </div>

        {/* WordPress Integration */}
        <WordPressConnect />

        {/* Webhook Integration */}
        <div className="bento-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Webhook className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Webhooks</h3>
                <p className="text-sm text-text/60">Send post data to external services</p>
              </div>
            </div>
            
            {webhookTested && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Tested</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Webhook URL Input */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Webhook URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="input flex-1"
                />
                <button
                  onClick={handleTestWebhook}
                  disabled={!webhookUrl || isTestingWebhook}
                  className="btn-secondary px-6 py-3 disabled:opacity-50"
                >
                  {isTestingWebhook ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                      Testing...
                    </>
                  ) : (
                    'Test Webhook'
                  )}
                </button>
              </div>
              <p className="text-xs text-text/50 mt-1">
                We'll send a POST request to this URL when you publish a post
              </p>
            </div>

            {/* Use Cases */}
            <div className="glass rounded-lg p-4 border border-purple-500/20 bg-purple-500/5">
              <h4 className="font-semibold text-purple-400 mb-3">Popular Use Cases:</h4>
              <div className="space-y-2 text-sm text-text/70">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Zapier:</strong> Trigger workflows when you publish (e.g., send to email list, post to social media)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Make.com:</strong> Create complex automation scenarios</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Discord/Slack:</strong> Notify your team when content is published</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Custom Backend:</strong> Sync with your own database or CMS</span>
                </div>
              </div>
            </div>

            {/* Payload Example */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Webhook Payload Example</h4>
                <button
                  onClick={() => handleCopy(JSON.stringify(samplePayload, null, 2))}
                  className="btn-ghost px-3 py-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1 inline" />
                  Copy
                </button>
              </div>
              <div className="bg-background rounded-lg border border-border-color p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-text/80">
                  {JSON.stringify(samplePayload, null, 2)}
                </pre>
              </div>
            </div>

            {/* Events */}
            <div>
              <h4 className="font-semibold mb-3">Available Events</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-color">
                  <div>
                    <p className="font-medium text-sm">post.published</p>
                    <p className="text-xs text-text/60">Triggered when a post is published</p>
                  </div>
                  <Code className="w-4 h-4 text-text/50" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-color">
                  <div>
                    <p className="font-medium text-sm">post.updated</p>
                    <p className="text-xs text-text/60">Triggered when a post is edited</p>
                  </div>
                  <Code className="w-4 h-4 text-text/50" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-color">
                  <div>
                    <p className="font-medium text-sm">post.deleted</p>
                    <p className="text-xs text-text/60">Triggered when a post is deleted</p>
                  </div>
                  <Code className="w-4 h-4 text-text/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zapier Quick Start */}
        <div className="bento-card bg-gradient-to-br from-orange-500/10 to-purple-500/10 border-orange-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Zapier Quick Start</h3>
              <p className="text-sm text-text/60">Connect StreamToSite to 5,000+ apps</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-text/70">
              Use Zapier to automate your workflow without writing code:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-400">1</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Create a Zapier account</p>
                  <a
                    href="https://zapier.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Sign up for free</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-400">2</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Create a new Zap with "Webhooks by Zapier"</p>
                  <p className="text-text/60">Choose "Catch Hook" as the trigger</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-400">3</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Copy the webhook URL</p>
                  <p className="text-text/60">Paste it in the field above</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-400">4</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Test the webhook</p>
                  <p className="text-text/60">Click "Test Webhook" to send sample data to Zapier</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-400">5</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Add your action</p>
                  <p className="text-text/60">Choose what happens when you publish (e.g., send email, post to Twitter)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bento-card opacity-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-text/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-text/50" />
            </div>
            <div>
              <h3 className="text-xl font-bold">More Integrations Coming Soon</h3>
              <p className="text-sm text-text/60">We're working on direct integrations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-surface/50 border border-border-color text-center">
              <p className="font-medium mb-1">Medium</p>
              <p className="text-xs text-text/60">Cross-post to Medium</p>
            </div>
            <div className="p-4 rounded-lg bg-surface/50 border border-border-color text-center">
              <p className="font-medium mb-1">Ghost</p>
              <p className="text-xs text-text/60">Sync with Ghost CMS</p>
            </div>
            <div className="p-4 rounded-lg bg-surface/50 border border-border-color text-center">
              <p className="font-medium mb-1">Substack</p>
              <p className="text-xs text-text/60">Send to newsletter</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
