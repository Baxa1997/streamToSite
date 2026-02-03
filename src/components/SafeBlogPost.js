'use client'

import { Shield, Sparkles, Eye, Star, AlertCircle, DollarSign } from 'lucide-react'
import AffiliateWidget from './AffiliateWidget'

export default function SafeBlogPost({ 
  movieTitle = 'Inception',
  videoUrl = 'https://youtube.com/watch?v=...',
  showAffiliate = true 
}) {
  return (
    <div className="min-h-screen gradient-mesh py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Safety Badge */}
            <div className="glass-strong rounded-xl p-4 border border-green-500/30 animate-fade-in">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-400">Fair Use Protected Content</p>
                  <p className="text-xs text-text/60">This article follows copyright-safe structure</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>

            {/* Article Header */}
            <article className="bento-card space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-text/60">
                  <span>Movie Analysis</span>
                  <span>•</span>
                  <span>12 min read</span>
                  <span>•</span>
                  <span>Feb 3, 2026</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  {movieTitle}: The Ultimate Breakdown - Ending Explained
                </h1>

                <p className="text-xl text-text/70 leading-relaxed">
                  A comprehensive analysis of Christopher Nolan's masterpiece, exploring the layers of reality, 
                  hidden symbolism, and the truth behind that spinning top.
                </p>
              </div>

              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl border border-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text/60">AI-Generated Featured Image</p>
                </div>
              </div>

              {/* Section 1: The Hook */}
              <div className="space-y-4 pt-6 border-t border-border-color">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <h2 className="text-2xl font-bold">The Hook: Why This Movie Still Matters</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-text/80 leading-relaxed">
                    Released in 2010, Inception redefined what audiences expected from blockbuster cinema. 
                    Christopher Nolan didn't just create a heist movie—he built a philosophical puzzle box 
                    that continues to spark debates 16 years later. But what makes this film truly special 
                    isn't just the spinning top or the folding cities...
                  </p>
                  
                  <p className="text-text/80 leading-relaxed">
                    It's the way Nolan weaponized ambiguity. Every frame is loaded with intentional clues, 
                    misdirections, and layers that reward multiple viewings. Let's dive into why this movie 
                    remains a cultural phenomenon.
                  </p>
                </div>
              </div>

              {/* Embedded Video */}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Watch the Original</span>
                </div>
                <div className="aspect-video bg-background/50 rounded-lg border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-text/60">Embedded YouTube Video</p>
                    <p className="text-xs text-text/40 mt-1">{videoUrl}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: The Recap */}
              <div className="space-y-4 pt-6 border-t border-border-color">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">2</span>
                  </div>
                  <h2 className="text-2xl font-bold">The Recap: Plot Summary</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-text/80 leading-relaxed">
                    Dom Cobb (Leonardo DiCaprio) is a skilled thief who specializes in extraction—stealing 
                    secrets from people's subconscious while they dream. When offered a chance to have his 
                    criminal record erased, he accepts one final job: inception, the act of planting an idea 
                    rather than stealing one.
                  </p>
                  
                  <p className="text-text/80 leading-relaxed">
                    The target is Robert Fischer, heir to a business empire. Cobb assembles a team and 
                    constructs a three-layer dream within a dream within a dream. But complications arise 
                    when projections of Cobb's deceased wife, Mal, begin sabotaging the mission...
                  </p>
                </div>
              </div>

              {/* Section 3: Critical Analysis - FAIR USE SHIELD */}
              <div className="space-y-4 pt-6 border-t-2 border-green-500/30">
                <div className="glass-strong rounded-xl p-6 border-2 border-green-500/30 bg-green-500/5">
                  <div className="flex items-start space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-green-400 mb-2">
                        Critical Analysis: The Fair Use Shield
                      </h2>
                      <p className="text-sm text-text/70">
                        This section provides transformative commentary and criticism, protected under Fair Use doctrine.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pl-9">
                    <div className="bg-background/50 rounded-lg p-4 border border-green-500/20">
                      <h3 className="font-bold text-lg mb-3 text-green-300">The Spinning Top: A Masterclass in Misdirection</h3>
                      <p className="text-text/80 leading-relaxed mb-3">
                        Nolan's genius lies not in the answer, but in making us ask the wrong question. 
                        The entire audience fixates on whether the top falls, but the real clue is hidden 
                        in plain sight: Cobb's wedding ring.
                      </p>
                      <p className="text-text/80 leading-relaxed">
                        <strong className="text-green-400">Critical Insight:</strong> In every dream sequence, 
                        Cobb wears his ring. In reality, he doesn't. The final scene? No ring. This isn't 
                        speculation—it's visual storytelling at its finest. Nolan answered the question; 
                        we were just looking at the wrong totem.
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-4 border border-green-500/20">
                      <h3 className="font-bold text-lg mb-3 text-green-300">Narrative Structure as Theme</h3>
                      <p className="text-text/80 leading-relaxed">
                        <strong className="text-green-400">Analytical Perspective:</strong> The film's 
                        three-layer dream structure mirrors its thematic exploration of reality, memory, 
                        and guilt. Each layer represents a deeper psychological descent, with Limbo serving 
                        as the subconscious made manifest. This isn't just clever plotting—it's form 
                        reflecting content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Hidden Details */}
              <div className="space-y-4 pt-6 border-t border-border-color">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Hidden Details & Easter Eggs</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="card-glass p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">The Carpet Pattern</h3>
                    </div>
                    <p className="text-sm text-text/70">
                      The hotel carpet in the dream sequence is identical to the carpet from The Shining—a 
                      deliberate nod to another film about psychological descent.
                    </p>
                  </div>

                  <div className="card-glass p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Mal's Name</h3>
                    </div>
                    <p className="text-sm text-text/70">
                      "Mal" is French for "bad" or "evil"—foreshadowing her role as the antagonist within 
                      Cobb's subconscious.
                    </p>
                  </div>

                  <div className="card-glass p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">The Children's Ages</h3>
                    </div>
                    <p className="text-sm text-text/70">
                      Cobb's children are wearing the same clothes but are slightly older in the final scene—
                      suggesting it's not a memory but reality.
                    </p>
                  </div>

                  <div className="card-glass p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Edith Piaf's Song</h3>
                    </div>
                    <p className="text-sm text-text/70">
                      "Non, je ne regrette rien" (No regrets) is sung by Marion Cotillard in real life—
                      who plays Mal. Meta-textual brilliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* AdSense Placement */}
              <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">AdSense Placement</span>
                </div>
                <div className="h-32 bg-background/50 rounded border border-green-500/20 flex items-center justify-center">
                  <span className="text-xs text-text/40">Advertisement Space</span>
                </div>
              </div>

              {/* Conclusion */}
              <div className="space-y-4 pt-6 border-t border-border-color">
                <h2 className="text-2xl font-bold">Final Thoughts</h2>
                <p className="text-text/80 leading-relaxed">
                  Inception remains a masterpiece because it trusts its audience. Nolan provides answers 
                  for those who look closely, while maintaining enough ambiguity to fuel endless discussion. 
                  It's a film that rewards analysis, repeat viewings, and critical thinking—exactly what 
                  great cinema should do.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {showAffiliate && <AffiliateWidget movieTitle={movieTitle} sticky={true} />}
          </div>
        </div>
      </div>
    </div>
  )
}
