/**
 * Demo Site Mock Data
 * 
 * This is the "brain" of the Public Website Simulator.
 * Used for Preview mode and the /examples/demo showcase.
 */

export const DEMO_SITE = {
  // Site Configuration
  siteConfig: {
    name: "MovieKing Recaps",
    tagline: "Your Ultimate Guide to Cinema",
    logo: null, // Uses text logo
    theme: "cinema", // 'cinema' | 'newspaper' | 'minimal' | 'standard'
    domain: "demo.streamtosite.com",
    accentColor: "#E50914", // Netflix Red
    social: {
      youtube: "https://youtube.com/@movieking",
      twitter: "https://twitter.com/movieking",
    },
    analytics: {
      totalViews: 125840,
      subscribers: 3420,
    }
  },

  // Categories
  categories: [
    { id: 1, name: "Movie Analysis", slug: "analysis", color: "#E50914" },
    { id: 2, name: "Fan Theories", slug: "theories", color: "#FFD700" },
    { id: 3, name: "Explained", slug: "explained", color: "#00D4FF" },
    { id: 4, name: "Reviews", slug: "reviews", color: "#9B59B6" },
    { id: 5, name: "News", slug: "news", color: "#27AE60" },
  ],

  // Blog Posts
  posts: [
    // ========== HERO POST ==========
    {
      id: 1,
      title: "Inception Ending Explained: Was It All a Dream?",
      slug: "inception-ending-explained",
      excerpt: "After 16 years of debate, we finally have the answer. Christopher Nolan's masterpiece ending decoded frame by frame.",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=675&fit=crop",
      category: "Explained",
      categoryColor: "#00D4FF",
      author: "Michael Chen",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&face",
      date: "2026-02-05",
      readTime: "8 min read",
      views: 24500,
      featured: true,
      content: `
        <p class="lead">Christopher Nolan's 2010 masterpiece left audiences questioning reality with its ambiguous ending. After 16 years of debate, we're diving deep into the spinning top.</p>
        
        <h2>The Final Scene Breakdown</h2>
        <p>In the closing moments of Inception, Cobb returns home to his children. He spins his totem—a small metal top—but walks away before seeing if it falls. The camera lingers on the spinning top, cutting to black just as it appears to wobble.</p>
        <p>This single shot has sparked more fan theories than perhaps any other moment in cinema history. Was Cobb in a dream? Was he finally awake? Nolan himself has remained cryptic, but the clues are hidden in plain sight.</p>
        
        <h2>The Wedding Ring Theory</h2>
        <p>The most convincing evidence comes not from the totem, but from Cobb's wedding ring. Throughout the film, Cobb wears his wedding ring in dreams but not in reality. In the final scene, his hand is bare—suggesting he's truly awake.</p>
        <p>Director Christopher Nolan confirmed in a 2015 interview that the ring detail was intentional, though he stopped short of declaring a definitive answer.</p>
        
        <h2>What Nolan Really Wanted</h2>
        <p>"The point of the scene is that Cobb doesn't care anymore," Nolan explained at a Princeton graduation speech. "He's chosen his reality." This thematic interpretation suggests the literal answer matters less than the emotional truth: Cobb has found peace.</p>
        
        <h2>The Mathematical Evidence</h2>
        <p>Frame-by-frame analysis reveals the top wobbles exactly 0.3 degrees before the cut—consistent with the physics of a falling top, not a perpetually spinning dream object. However, this evidence remains contested by film scholars.</p>
        
        <h2>Our Verdict</h2>
        <p>While the ambiguity is intentional, the preponderance of evidence—the wedding ring, the wobble, the emotional catharsis—points to one conclusion: <strong>Cobb is awake</strong>. He's finally home.</p>
        <p>But perhaps that's exactly what Nolan wanted us to believe...</p>
      `
    },

    // ========== REGULAR POSTS ==========
    {
      id: 2,
      title: "Marvel Phase 6: Everything We Know About the New Avengers",
      slug: "marvel-phase-6-new-avengers",
      excerpt: "Secret Wars is coming, and with it, a completely restructured MCU. Here's the complete breakdown of confirmed projects.",
      thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=450&fit=crop",
      category: "News",
      categoryColor: "#27AE60",
      author: "Sarah Mitchell",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&face",
      date: "2026-02-04",
      readTime: "12 min read",
      views: 18200,
      featured: false,
      content: `
        <p class="lead">The multiverse saga is reaching its climax. Marvel Studios has officially unveiled their Phase 6 slate, and the implications are massive.</p>
        
        <h2>The Road to Secret Wars</h2>
        <p>Following the events of Avengers: The Kang Dynasty, Phase 6 will build toward the ultimate crossover event: Secret Wars. This adaptation of the 2015 comic storyline will see multiple universes collide.</p>
        
        <h2>Confirmed Projects</h2>
        <p>Marvel has confirmed the following films and series for Phase 6:</p>
        <ul>
          <li>Fantastic Four: First Steps (May 2026)</li>
          <li>Armor Wars (July 2026)</li>
          <li>Thunderbolts* (Holiday 2026)</li>
          <li>Avengers: Secret Wars (May 2027)</li>
        </ul>
        
        <h2>The New Avengers Roster</h2>
        <p>With the original six Avengers now retired or deceased, a new generation will take the mantle. Expect to see Sam Wilson's Captain America leading a team that includes Shang-Chi, She-Hulk, and the newly introduced Fantastic Four.</p>
      `
    },

    {
      id: 3,
      title: "The Dark Knight: Why It's Still the Greatest Superhero Film",
      slug: "dark-knight-greatest-superhero-film",
      excerpt: "17 years later, Christopher Nolan's Batman masterpiece remains unmatched. A deep dive into what makes it timeless.",
      thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=450&fit=crop",
      category: "Movie Analysis",
      categoryColor: "#E50914",
      author: "Michael Chen",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&face",
      date: "2026-02-03",
      readTime: "10 min read",
      views: 15800,
      featured: false,
      content: `
        <p class="lead">In an age of multiverses and CGI spectacles, The Dark Knight stands as a monument to grounded, character-driven storytelling.</p>
        
        <h2>The Joker's Philosophy</h2>
        <p>Heath Ledger's Oscar-winning performance transcends the superhero genre. His Joker isn't just a villain—he's a force of nature that exposes the fragility of civilization's moral codes.</p>
        
        <h2>Technical Mastery</h2>
        <p>Shot on IMAX 70mm film, The Dark Knight pioneered the use of large-format cameras for action sequences. The truck flip, the hospital explosion—these weren't CGI. They were real.</p>
        
        <h2>The Legacy</h2>
        <p>Every dark, "grounded" superhero reboot owes a debt to Nolan's vision. From Logan to Joker, the influence is undeniable.</p>
      `
    },

    {
      id: 4,
      title: "Oppenheimer vs Barbie: How 'Barbenheimer' Changed Cinema",
      slug: "barbenheimer-changed-cinema",
      excerpt: "The double feature phenomenon that proved theatrical experiences aren't dead—they just need the right event.",
      thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
      category: "Movie Analysis",
      categoryColor: "#E50914",
      author: "Emma Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&face",
      date: "2026-02-01",
      readTime: "7 min read",
      views: 12400,
      featured: false,
      content: `
        <p class="lead">July 21, 2023 wasn't just a release date—it was a cultural moment that reminded Hollywood what theaters can achieve.</p>
        
        <h2>The Numbers Don't Lie</h2>
        <p>Combined, Barbie and Oppenheimer grossed over $2.4 billion worldwide. More importantly, they proved audiences will show up for original stories with auteur vision.</p>
        
        <h2>The Social Media Effect</h2>
        <p>Memes, TikToks, and pink/black outfit combinations flooded the internet. "Barbenheimer" became the template for organic marketing in the streaming age.</p>
      `
    },

    {
      id: 5,
      title: "Dune Part 3: Frank Herbert's Wild Third Book, Explained",
      slug: "dune-part-3-children-explained",
      excerpt: "Children of Dune gets weird. Here's what Denis Villeneuve might be adapting next—and why it's the trilogy's strangest chapter.",
      thumbnail: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&h=450&fit=crop",
      category: "Fan Theories",
      categoryColor: "#FFD700",
      author: "David Park",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face",
      date: "2026-01-28",
      readTime: "9 min read",
      views: 9800,
      featured: false,
      content: `
        <p class="lead">If you thought sandworms were strange, wait until you meet Leto II—a human who willingly becomes a worm-hybrid to live for 3,500 years.</p>
        
        <h2>The Golden Path</h2>
        <p>Paul Atreides saw the future and chose not to walk Leto's path. His son had no such reservations. The third Dune book explores what it means to sacrifice humanity for humanity's survival.</p>
        
        <h2>Adaptation Challenges</h2>
        <p>Denis Villeneuve has expressed interest but also hesitation. The book's introspective nature and time jumps make it a unique cinematic challenge.</p>
      `
    },

    {
      id: 6,
      title: "The Batman 2: Matt Reeves Teases Court of Owls",
      slug: "the-batman-2-court-of-owls",
      excerpt: "Robert Pattinson's Dark Knight returns, and Gotham's oldest secret society is coming out of the shadows.",
      thumbnail: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=450&fit=crop",
      category: "News",
      categoryColor: "#27AE60",
      author: "Sarah Mitchell",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&face",
      date: "2026-01-25",
      readTime: "5 min read",
      views: 21300,
      featured: false,
      content: `
        <p class="lead">Director Matt Reeves has confirmed that The Batman sequel will draw heavily from Scott Snyder's Court of Owls storyline.</p>
        
        <h2>Who Are the Court of Owls?</h2>
        <p>A secret society that has controlled Gotham for centuries, the Court of Owls uses masked assassins called Talons to maintain their grip on power. Their nursery rhyme haunts Gotham's children.</p>
        
        <h2>The Owl Mask Teaser</h2>
        <p>Reeves posted a single image: an owl mask in shadow. The internet exploded. Production begins this summer for a 2027 release.</p>
      `
    },
  ],

  // Sidebar Widgets
  widgets: {
    subscribe: {
      title: "Never Miss a Recap",
      description: "Get exclusive breakdowns delivered to your inbox every week.",
      buttonText: "Subscribe Free",
    },
    trending: {
      title: "Trending Now",
    },
    ad: {
      title: "Advertisement",
      placeholder: true,
    }
  }
};

// Helper to get post by slug
export const getPostBySlug = (slug) => {
  return DEMO_SITE.posts.find(post => post.slug === slug) || null;
};

// Helper to get related posts
export const getRelatedPosts = (currentPostId, limit = 3) => {
  return DEMO_SITE.posts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};

// Helper to get featured post
export const getFeaturedPost = () => {
  return DEMO_SITE.posts.find(post => post.featured) || DEMO_SITE.posts[0];
};

// Helper to get category by name
export const getCategoryByName = (name) => {
  return DEMO_SITE.categories.find(cat => cat.name === name);
};

export default DEMO_SITE;
