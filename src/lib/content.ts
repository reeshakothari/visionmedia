// All copy, contact details, and image references below are transcribed
// verbatim from the existing Vision Media & Entertainment static site
// (index.html, wedding.html, corporate-event.html, wedding-venues.html,
// social-events.html, blog.html). Do not paraphrase or invent content here.

export const siteInfo = {
  name: "Vision Media & Entertainment",
  logo: "/images/logo.png",
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/share/19hEbruQ2p/",
  instagram:
    "https://www.instagram.com/visionmediaentertainment_pune?igsh=MTgxbzRrcW96cHNtNA==",
  linkedin:
    "https://www.linkedin.com/in/vision-mediaandentertainment-982b00136?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  call: "tel:+919028949398",
};

export const formAction = "https://formsubmit.co/riteshjain027@gmail.com";

// Footer "Quick Links" differ slightly per page on the original site.
export const footerLinksHome = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

export const footerLinksStandard = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

export const footerLinksBlog = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const copyright = "© 2024 Vision Media & Entertainment. All rights reserved.";

// ---------------------------------------------------------------------------
// HOME PAGE
// ---------------------------------------------------------------------------

export const hero = {
  images: [
    { src: "/images/corporate.jpg", alt: "Corporate Events", title: "Corporate Events" },
    { src: "/images/wedding.jpg", alt: "Dream Weddings", title: "Dream Weddings" },
    { src: "/images/furniture.png", alt: "Wedding Venues", title: "Wedding Venues" },
    { src: "/images/hospitality.jpg", alt: "Social Events", title: "Social Events" },
  ],
  titleLine1: "Vision",
  titleLine2: "Media & Entertainment",
  subtitle: "Premier event management and hospitality services for all your special occasions",
  primaryCta: { label: "Our Services", href: "#services" },
  secondaryCta: { label: "Get Quote", href: "#contact" },
};

export const servicesSection = {
  heading: "Our Premium Services",
  subheading: "Delivering excellence across all aspects of event management and hospitality",
};

export const serviceCards = [
  {
    image: "/images/corporate.jpg",
    frontTitle: "Corporate Events",
    frontSubtitle: "Professional Excellence",
    backTitle: "Corporate Events Excellence",
    backText:
      "Transform your business events into memorable experiences with our comprehensive corporate event management services.",
    items: [
      "End-to-end planning & coordination",
      "Professional conferences & seminars",
      "Brand activations & product launches",
      "Award ceremonies & galas",
      "Corporate retreats & team building",
    ],
    rating: "★★★★★ 5.0 Premium Service",
    ctaLabel: "Read More",
    href: "/corporate-event",
  },
  {
    image: "/images/wedding.jpg",
    frontTitle: "Dream Weddings",
    frontSubtitle: "Luxury Wedding Planning",
    backTitle: "Dream Wedding Planning",
    backText:
      "Create your perfect wedding day with our luxury wedding planning services tailored to your unique vision.",
    items: [
      "Complete wedding coordination",
      "Destination wedding planning",
      "Venue decoration & styling",
      "Photography & videography",
      "Bridal styling & makeup",
    ],
    rating: "★★★★★ 5.0 Premium Service",
    ctaLabel: "Read More",
    href: "/wedding",
  },
  {
    image: "/images/furniture.png",
    frontTitle: "Wedding Venues",
    frontSubtitle: "Dream Venue Selection",
    backTitle: "Exclusive Wedding Venues",
    backText:
      "Discover the perfect venue for your special day with our curated selection of exclusive wedding venues that create magical moments.",
    items: [
      "Luxury venue selection",
      "Outdoor garden venues",
      "Historic mansion venues",
      "Beach & destination venues",
      "Custom venue packages",
    ],
    rating: "★★★★★ 5.0 Premium Service",
    ctaLabel: "Get Quote",
    href: "/wedding-venues",
  },
  {
    image: "/images/hospitality.jpg",
    frontTitle: "Social Events",
    frontSubtitle: "Memorable Celebrations",
    backTitle: "Premium Social Events",
    backText:
      "Create unforgettable social gatherings with our comprehensive event planning services for birthdays, anniversaries, and special celebrations.",
    items: [
      "Birthday party planning",
      "Anniversary celebrations",
      "Graduation parties",
      "Holiday celebrations",
      "Custom themed events",
    ],
    rating: "★★★★★ 5.0 Premium Service",
    ctaLabel: "Get Quote",
    href: "/social-events",
  },
];

export const aboutSection = {
  heading: "About Vision Media & Entertainment",
  subheading: "Your trusted partner in creating exceptional experiences",
  paragraphs: [
    "With over a decade of experience in the event management industry, Vision Media & Entertainment has established itself as a premier provider of comprehensive event solutions. We specialize in transforming your vision into unforgettable memories through our meticulous attention to detail and commitment to excellence.",
    "Our team of experienced professionals brings together expertise in corporate events, luxury weddings, furniture & decor, and hospitality services. We understand that every event is unique, and we tailor our services to meet your specific needs and exceed your expectations.",
  ],
  features: [
    { icon: "target", title: "Precision Planning", text: "Every detail meticulously planned and executed to perfection" },
    { icon: "sparkles", title: "Premium Quality", text: "Only the finest materials and services for your special events" },
    { icon: "handshake", title: "Trusted Partnership", text: "Building long-lasting relationships with our valued clients" },
  ],
  stats: [
    { number: "500+", label: "Projects Completed" },
    { number: "10+", label: "Years Experience" },
    { number: "98%", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
  ],
  teamHeading: "Meet Our Team",
  teamSubheading: "Our dedicated professionals are committed to making your event extraordinary",
  team: [
    { initials: "SS", name: "Sanket Sarda", role: "CEO & Founder", note: "15+ years in event management" },
    { initials: "RS", name: "Rohit Sarda", role: "Creative Director", note: "12+ years in wedding planning" },
  ],
};

export const gallerySection = {
  heading: "Our Work Gallery",
  subheading: "Explore our portfolio of successful events and memorable celebrations",
  items: [
    { image: "/images/corporate.jpg", title: "Corporate Events", text: "Professional conferences and business gatherings" },
    { image: "/images/wedding.jpg", title: "Dream Weddings", text: "Luxury wedding celebrations" },
    { image: "/images/furniture.png", title: "Wedding Venues", text: "Exclusive venue selections" },
    { image: "/images/hospitality.jpg", title: "Social Events", text: "Memorable celebrations and parties" },
    { image: "/images/gallery/cdp-8822.jpg", title: "Event Photography", text: "Capturing special moments" },
    { image: "/images/gallery/cdp-8827.jpg", title: "Event Details", text: "Meticulous attention to detail" },
    { image: "/images/gallery/wa-0824-04pm.jpeg", title: "Event Setup", text: "Professional event staging" },
    { image: "/images/gallery/wa-0824-05pm.jpeg", title: "Event Decoration", text: "Beautiful venue styling" },
    { image: "/images/gallery/wa-0824-06pm.jpeg", title: "Event Atmosphere", text: "Creating perfect ambiance" },
    { image: "/images/gallery/wa-0824-07pm.jpeg", title: "Event Coordination", text: "Seamless event management" },
    { image: "/images/gallery/wa-0827-31pm.jpeg", title: "Event Highlights", text: "Memorable moments captured" },
    { image: "/images/gallery/wa-0838-06pm.jpeg", title: "Event Success", text: "Successful event execution" },
  ],
  ctaText: "Want to see more of our work?",
  ctaLabel: "Contact Us for More",
};

export const reviewsSection = {
  heading: "What Our Clients Say",
  subheading: "Trusted by hundreds of satisfied clients across various industries",
  reviews: [
    {
      text: "Vision Media Entertainment transformed our corporate conference into an unforgettable experience. Their attention to detail and professional approach exceeded all our expectations.",
      author: "Sarah Johnson",
      role: "CEO, Tech Innovations",
    },
    {
      text: "Our wedding day was absolutely perfect thanks to Vision Media Entertainment. They made our dream wedding come true with flawless execution and beautiful decor.",
      author: "Michael & Emily Chen",
      role: "Wedding Clients",
    },
    {
      text: "The furniture and decor services are exceptional. They completely transformed our event space and created an atmosphere that our guests are still talking about.",
      author: "David Rodriguez",
      role: "Event Manager, Luxury Hotels",
    },
  ],
  stats: [
    { number: "500+", label: "Events Completed" },
    { number: "98%", label: "Happy Clients" },
    { number: "5.0", label: "Average Rating" },
  ],
};

export const blogPreviewSection = {
  heading: "From Our Blog",
  subheading: "Latest insights on events, weddings, venues and hospitality",
  posts: [
    { title: "Top Corporate Event Trends", text: "Ideas and formats that elevate corporate experiences—from immersive themes to meaningful engagement." },
    { title: "Wedding Planning Checklist", text: "A practical, step-by-step planning sequence that removes stress and keeps your celebration on track." },
    { title: "Choosing the Right Venue", text: "Capacity, logistics, ambience and access—what really matters before you book a venue." },
  ],
  ctaText: "Read more tips and stories on our blog",
  ctaLabel: "Visit Blog",
};

export const homeContact = {
  heading: "Get In Touch",
  subheading: "Ready to create your next exceptional event? Let's discuss your vision",
  infoHeading: "Contact Information",
  phone: "+91 90289 49398",
  email: "info@visionmediaent.com",
  address: "123 Event Avenue, City, State 12345",
  fields: { name: "name", email: "email", subject: "subject", message: "message" },
};

export const footerContent = {
  brandText:
    "Creating exceptional experiences through professional event management and hospitality services.",
};

// ---------------------------------------------------------------------------
// WEDDING PAGE (/wedding)
// ---------------------------------------------------------------------------

export const weddingPage = {
  heroImage: "/images/wedding.jpg",
  heroTitle: "Luxury Wedding Planning",
  heroSubtitle: "Creating magical moments for your perfect day",
  servicesHeading: "Wedding Services",
  servicesSubheading:
    "From intimate ceremonies to grand destination weddings, we craft extraordinary experiences that reflect your unique love story",
  services: [
    { icon: "palmtree", title: "Destination Weddings", text: "Exotic locations transformed into your perfect wedding paradise with seamless coordination and breathtaking backdrops.", items: ["International venue selection", "Travel coordination", "Local vendor partnerships", "Guest accommodation"] },
    { icon: "flower", title: "Decor & Floral Design", text: "Breathtaking decor concepts and artistic floral arrangements that bring your wedding vision to life with elegance.", items: ["Custom floral arrangements", "Venue decoration", "Lighting design", "Color coordination"] },
    { icon: "landmark", title: "Venue Selection", text: "Curated selection of premium venues that perfectly complement your style and requirements for the perfect setting.", items: ["Luxury venue sourcing", "Site visits & tours", "Venue negotiations", "Contract management"] },
    { icon: "drama", title: "Entertainment & Artists", text: "Exceptional entertainment experiences with renowned artists and performers to make your celebration unforgettable.", items: ["Live music & bands", "DJ & sound systems", "Cultural performances", "Special entertainment"] },
    { icon: "users", title: "Guest Experience", text: "Comprehensive hospitality services ensuring comfort and luxury for all your guests throughout the celebration.", items: ["Guest accommodation", "Transportation coordination", "Welcome packages", "Guest services"] },
    { icon: "gem", title: "Bespoke Planning", text: "Completely customized wedding experiences tailored to your personal style and traditions for a unique celebration.", items: ["Personalized planning", "Timeline creation", "Vendor coordination", "Day-of coordination"] },
  ],
  journeyHeading: "Your Wedding Journey",
  journeySubheading: "From initial consultation to your perfect day, we guide you through every step",
  journey: [
    { number: 1, title: "Consultation", text: "Personal consultation to understand your vision, preferences, and requirements for your special day." },
    { number: 2, title: "Design & Planning", text: "Comprehensive planning and design phase with detailed concepts, timelines, and vendor selections." },
    { number: 3, title: "Coordination", text: "Seamless coordination of all elements with regular updates, rehearsals, and final preparations." },
    { number: 4, title: "Celebration", text: "Flawless execution of your perfect day while you focus on creating beautiful memories with loved ones." },
  ],
  galleryHeading: "Wedding Gallery",
  gallerySubheading: "Explore our portfolio of beautiful weddings and magical celebrations",
  gallery: [
    { image: "/images/wedding.jpg", title: "Wedding Ceremony", text: "Elegant ceremony setup" },
    { image: "/images/gallery/wa-0824-05pm-1.jpeg", title: "Wedding Reception", text: "Beautiful reception styling" },
    { image: "/images/gallery/wa-0824-06pm-1.jpeg", title: "Wedding Decor", text: "Stunning decoration details" },
    { image: "/images/gallery/wa-0824-07pm.jpeg", title: "Wedding Setup", text: "Professional event staging" },
    { image: "/images/gallery/wa-0827-31pm.jpeg", title: "Wedding Details", text: "Attention to every detail" },
    { image: "/images/gallery/wa-0838-06pm.jpeg", title: "Wedding Atmosphere", text: "Creating magical moments" },
  ],
  contact: {
    heading: "Start Planning Your Dream Wedding",
    subheading: "Ready to create your perfect celebration? Let's discuss your vision",
    phone: "+91 90289 49398",
    email: "weddings@visionmediaent.com",
    address: "123 Event Avenue, City, State 12345",
    hours: "Mon-Fri 9AM-6PM",
    weddingTypeOptions: [
      { value: "traditional", label: "Traditional Wedding" },
      { value: "destination", label: "Destination Wedding" },
      { value: "intimate", label: "Intimate Ceremony" },
      { value: "grand", label: "Grand Celebration" },
      { value: "cultural", label: "Cultural Wedding" },
      { value: "other", label: "Other" },
    ],
  },
  footerText: "Creating magical wedding experiences through professional planning and exceptional service.",
};

// ---------------------------------------------------------------------------
// CORPORATE EVENT PAGE (/corporate-event)
// ---------------------------------------------------------------------------

export const corporatePage = {
  heroImage: "/images/corporate.jpg",
  heroTitle: "Corporate Event Management",
  heroSubtitle: "Professional event solutions for your business needs",
  servicesHeading: "Corporate Event Services",
  servicesSubheading: "From intimate board meetings to large-scale conferences, we deliver excellence in every detail",
  services: [
    { icon: "trophy", title: "Award Ceremonies & Galas", text: "Prestigious events that celebrate achievements with elegance and sophistication, creating memorable moments for your team and stakeholders.", items: ["Venue selection & setup", "Stage design & lighting", "Award presentations", "Catering coordination"] },
    { icon: "party-popper", title: "Annual Day Celebrations", text: "Company-wide annual day events that recognize achievements, strengthen culture, and boost team morale.", items: ["Theme concept & show flow", "Awards & recognition setup", "Stage, sound & lighting", "Entertainment & emcee"] },
    { icon: "rocket", title: "Product & Brand Launches", text: "Impactful launch events that create buzz and establish strong market presence with cutting-edge presentation technology.", items: ["Media relations", "Product demonstrations", "Press conferences", "Brand activation"] },
    { icon: "building", title: "Corporate Event Management", text: "End-to-end planning and execution for all corporate formats tailored to your brand goals and audience.", items: ["Strategy, budgeting & timelines", "Vendor & venue management", "On-site operations crew", "Post-event reporting"] },
    { icon: "briefcase", title: "Conferences & Seminars", text: "Professional gatherings with seamless logistics and engaging environments that maximize knowledge sharing and networking.", items: ["Speaker coordination", "Audio-visual setup", "Registration management", "Networking facilitation"] },
    { icon: "handshake", title: "Dealers & Supplier Meets", text: "Relationship-building meets that align channel partners, share roadmaps, and drive sales momentum.", items: ["Agenda & keynote planning", "Partner engagement activities", "Brand showcase zones", "Hospitality & travel desk"] },
    { icon: "users", title: "Team Building Activities", text: "Innovative programs that strengthen bonds and enhance collaboration through engaging and meaningful experiences.", items: ["Activity planning", "Venue coordination", "Team facilitation", "Progress tracking"] },
    { icon: "drama", title: "Theme Events & Conferences", text: "Immersive, on-brand thematic experiences for conferences, summits and internal events.", items: ["Concept, décor & fabrication", "Scenic design & branding", "AV, livestream & tech", "Delegate journey design"] },
    { icon: "milestone", title: "Inaugurations & Milestones", text: "Ceremonial events that mark important moments in your company's journey with dignity and celebration.", items: ["Ceremony planning", "Guest management", "Media coverage", "Memorial documentation"] },
    { icon: "store", title: "Trade Shows & Exhibitions", text: "Strategic showcases that maximize visibility and business opportunities with professional booth design and management.", items: ["Booth design & setup", "Staff coordination", "Follow-up management"] },
    { icon: "music", title: "Entertainment", text: "High-impact entertainment that elevates your corporate events and keeps audiences engaged.", items: ["Celebrity & artist management", "Live bands, DJs & acts", "Cultural & thematic performances", "Special effects & choreography"] },
  ],
  whyHeading: "Why Choose Vision Media Entertainment?",
  whySubheading: "Your trusted partner in creating exceptional corporate experiences",
  whyFeatures: [
    { icon: "target", title: "Strategic Planning", text: "Every event is meticulously planned to align with your business objectives and brand values, ensuring maximum ROI and impact." },
    { icon: "zap", title: "Flawless Execution", text: "Our experienced team ensures seamless delivery from concept to completion, handling every detail with precision and professionalism." },
    { icon: "lightbulb", title: "Creative Innovation", text: "Cutting-edge ideas and technology integration create memorable experiences that set your events apart from the competition." },
  ],
  stats: [
    { number: "200+", label: "Corporate Events" },
    { number: "15+", label: "Years Experience" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ],
  galleryHeading: "Corporate Event Gallery",
  gallerySubheading: "Explore our portfolio of successful corporate events and business celebrations",
  gallery: [
    { image: "/images/corporate.jpg", title: "Corporate Conference", text: "Professional event setup and management" },
    { image: "/images/gallery/cdp-8822.jpg", title: "Award Ceremony", text: "Elegant award presentation setup" },
    { image: "/images/gallery/cdp-8827.jpg", title: "Business Meeting", text: "Professional meeting environment" },
    { image: "/images/gallery/wa-0824-04pm.jpeg", title: "Event Setup", text: "Meticulous event preparation" },
    { image: "/images/gallery/wa-0824-05pm.jpeg", title: "Conference Room", text: "Professional conference setup" },
    { image: "/images/gallery/wa-0824-06pm.jpeg", title: "Event Decoration", text: "Elegant corporate styling" },
  ],
  contact: {
    heading: "Plan Your Corporate Event",
    subheading: "Ready to create your next exceptional corporate event? Let's discuss your vision",
    phone: "+91 90289 49398",
    email: "corporate@visionmediaent.com",
    address: "123 Event Avenue, City, State 12345",
    hours: "Mon-Fri 9AM-6PM",
    eventTypeOptions: [
      { value: "conference", label: "Conference & Seminar" },
      { value: "award", label: "Award Ceremony" },
      { value: "launch", label: "Product Launch" },
      { value: "team-building", label: "Team Building" },
      { value: "trade-show", label: "Trade Show" },
      { value: "other", label: "Other" },
    ],
  },
  footerText: "Creating exceptional corporate experiences through professional event management and hospitality services.",
};

// ---------------------------------------------------------------------------
// WEDDING VENUES PAGE (/wedding-venues)
// ---------------------------------------------------------------------------

export const venuesPage = {
  heroImage: "/images/furniture.png",
  heroTitle: "Exclusive Wedding Venues",
  heroSubtitle: "Discover the perfect setting for your dream wedding",
  servicesHeading: "Wedding Venue Services",
  servicesSubheading:
    "From luxury garden venues to historic mansions, we provide exclusive locations that create the perfect backdrop for your special day",
  services: [
    { icon: "crown", title: "Luxury Venue Selection", text: "Curated collection of premium venues that offer elegance, sophistication, and the perfect ambiance for your celebration.", items: ["Premium venue sourcing", "Venue comparison & selection", "Capacity & layout analysis", "Exclusive venue access"] },
    { icon: "leaf", title: "Outdoor Garden Venues", text: "Beautiful outdoor spaces with natural beauty, perfect lighting, and romantic settings for intimate and grand celebrations.", items: ["Garden venue selection", "Weather contingency planning", "Outdoor setup coordination", "Natural backdrop optimization"] },
    { icon: "landmark", title: "Historic Mansion Venues", text: "Timeless elegance in historic mansions and heritage properties that provide a grand and sophisticated atmosphere.", items: ["Heritage property access", "Historic venue tours", "Period-appropriate styling", "Cultural significance highlights"] },
    { icon: "waves", title: "Beach & Destination Venues", text: "Breathtaking beachfront locations and exotic destination venues for unforgettable destination weddings.", items: ["Beachfront venue selection", "Destination wedding coordination", "International venue partnerships", "Travel & accommodation planning"] },
    { icon: "bed-double", title: "Hotel & Resort Venues", text: "Luxury hotels and resorts offering comprehensive wedding packages with accommodation and hospitality services.", items: ["Hotel venue partnerships", "Resort wedding packages", "Guest accommodation coordination", "All-inclusive arrangements"] },
    { icon: "package", title: "Custom Venue Packages", text: "Tailored venue packages that combine multiple locations and unique spaces for multi-day celebrations.", items: ["Multi-venue coordination", "Custom package creation", "Venue combination planning", "Special arrangement handling"] },
  ],
  whyHeading: "Why Choose Our Venue Services?",
  whySubheading: "Exclusive partnerships and personalized service for your perfect wedding location",
  whyFeatures: [
    { icon: "handshake", title: "Exclusive Partnerships", text: "Access to exclusive venues through our established partnerships with premium properties and unique locations." },
    { icon: "target", title: "Personalized Matching", text: "We match you with venues that perfectly align with your vision, budget, and guest requirements." },
    { icon: "gem", title: "Premium Experience", text: "From initial consultation to venue tours, we provide a luxury experience throughout your venue selection process." },
  ],
  stats: [
    { number: "100+", label: "Exclusive Venues" },
    { number: "50+", label: "Destination Locations" },
    { number: "95%", label: "Happy Clients" },
    { number: "24/7", label: "Venue Support" },
  ],
  galleryHeading: "Venue Gallery",
  gallerySubheading: "Explore our collection of stunning wedding venues and exclusive locations",
  gallery: [
    { image: "/images/furniture.png", title: "Luxury Venue", text: "Elegant indoor setting" },
    { image: "/images/gallery/wa-0824-04pm.jpeg", title: "Garden Venue", text: "Beautiful outdoor setting" },
    { image: "/images/gallery/wa-0824-05pm.jpeg", title: "Historic Venue", text: "Timeless elegance" },
    { image: "/images/gallery/wa-0824-06pm.jpeg", title: "Beach Venue", text: "Breathtaking ocean views" },
    { image: "/images/gallery/wa-0824-07pm.jpeg", title: "Resort Venue", text: "All-inclusive luxury" },
    { image: "/images/gallery/wa-0827-31pm.jpeg", title: "Unique Venue", text: "One-of-a-kind locations" },
  ],
  contact: {
    heading: "Find Your Perfect Venue",
    subheading: "Ready to discover the ideal location for your wedding? Let's explore our exclusive venues together",
    phone: "+91 90289 49398",
    email: "venues@visionmediaent.com",
    address: "123 Event Avenue, City, State 12345",
    hours: "Mon-Fri 9AM-6PM",
    venueTypeOptions: [
      { value: "luxury", label: "Luxury Venue" },
      { value: "garden", label: "Garden Venue" },
      { value: "historic", label: "Historic Mansion" },
      { value: "beach", label: "Beach Venue" },
      { value: "resort", label: "Hotel/Resort" },
      { value: "destination", label: "Destination Venue" },
      { value: "other", label: "Other" },
    ],
  },
  footerText: "Creating magical wedding experiences through exclusive venues and exceptional service.",
};

// ---------------------------------------------------------------------------
// SOCIAL EVENTS PAGE (/social-events)
// ---------------------------------------------------------------------------

export const socialPage = {
  heroImage: "/images/hospitality.jpg",
  heroTitle: "Social Events & Celebrations",
  heroSubtitle: "Creating memorable moments for life's special occasions",
  servicesHeading: "Social Event Services",
  servicesSubheading:
    "From intimate gatherings to grand celebrations, we create unforgettable social events that bring people together and create lasting memories",
  services: [
    { icon: "cake", title: "Birthday Party Planning", text: "Celebrate life's milestones with personalized birthday parties that reflect the guest of honor's personality and interests.", items: ["Themed party planning", "Age-appropriate entertainment", "Custom decorations & styling", "Catering & cake coordination"] },
    { icon: "heart", title: "Anniversary Celebrations", text: "Honor love and commitment with elegant anniversary celebrations that commemorate your journey together.", items: ["Milestone anniversary planning", "Renewal ceremony coordination", "Intimate gathering setup", "Memory lane presentations"] },
    { icon: "graduation-cap", title: "Graduation Parties", text: "Celebrate academic achievements with graduation parties that honor the graduate's accomplishments and future aspirations.", items: ["Achievement celebration planning", "Future-focused themes", "Academic milestone recognition", "Family & friends coordination"] },
    { icon: "tree-pine", title: "Holiday Celebrations", text: "Make holidays extra special with festive celebrations that bring families and communities together in joy.", items: ["Seasonal party planning", "Cultural celebration coordination", "Family tradition integration", "Festive decoration & styling"] },
    { icon: "palette", title: "Custom Themed Events", text: "Create unique experiences with custom-themed events that tell your story and create unforgettable memories.", items: ["Personalized theme development", "Custom decoration design", "Themed entertainment coordination", "Story-driven event planning"] },
    { icon: "trophy", title: "Achievement Celebrations", text: "Honor personal and professional achievements with celebrations that recognize success and inspire future goals.", items: ["Success milestone recognition", "Professional achievement parties", "Personal goal celebrations", "Inspiration-focused events"] },
    { icon: "baby", title: "Baby Shower", text: "Heartwarming celebrations to welcome a new life with thoughtful themes and intimate styling.", items: ["Theme & décor curation", "Games & hosting", "Dessert & favors setup", "Photo corner arrangements"] },
    { icon: "flame", title: "Festival Events", text: "Cultural and festive gatherings that bring communities together with vibrant experiences.", items: ["Festive décor & lighting", "Cultural performances", "Stalls & activity zones", "Safety & permissions"] },
    { icon: "scroll", title: "Munj/Thread Ceremony", text: "Traditional thread ceremonies managed with cultural sensitivity and seamless hospitality.", items: ["Ritual coordination", "Stage & seating", "Traditional décor", "Catering & prasadam"] },
    { icon: "mic", title: "Concerts", text: "High-energy concerts with professional stage, sound, and crowd management.", items: ["Stage, sound & lights", "Artist liaison", "Security & barricading", "Ticketing & entries"] },
    { icon: "beer", title: "Bachelor's Party", text: "Fun, private celebrations tailored to your group's vibe and preferences.", items: ["Venue & itinerary", "Entertainment & music", "Décor & props", "Logistics & transport"] },
    { icon: "shirt", title: "Fashion Shows", text: "Sleek runway productions with professional backstage and show direction.", items: ["Runway & lighting design", "Model & lineup management", "Choreography & music", "Branding & media"] },
    { icon: "heart-handshake", title: "Anniversaries", text: "Elegant milestone celebrations crafted with personal stories and beautiful ambiance.", items: ["Theme & décor", "Audio-visual tributes", "Entertainment & cake", "Photography & video"] },
    { icon: "star", title: "Celebrity Management", text: "End-to-end management for celebrity appearances, performances, and endorsements.", items: ["Artist shortlisting & contracts", "Logistics & hospitality", "Security & protocol", "Stage & tech rider"] },
  ],
  journeyHeading: "Our Event Planning Process",
  journeySubheading: "From concept to celebration, we guide you through every step of creating your perfect social event",
  journey: [
    { number: 1, title: "Discovery & Planning", text: "We learn about your vision, preferences, and requirements to create a personalized event plan." },
    { number: 2, title: "Design & Coordination", text: "Detailed planning with theme development, vendor selection, and timeline creation for seamless execution." },
    { number: 3, title: "Preparation & Setup", text: "Final preparations, venue setup, and last-minute coordination to ensure everything is perfect." },
    { number: 4, title: "Celebration & Memories", text: "Flawless execution of your event while you enjoy every moment and create beautiful memories." },
  ],
  galleryHeading: "Social Events Gallery",
  gallerySubheading: "Explore our portfolio of memorable social celebrations and special occasions",
  gallery: [
    { image: "/images/hospitality.jpg", title: "Social Gathering", text: "Elegant event setup" },
    { image: "/images/gallery/wa-0824-38pm.jpeg", title: "Party Celebration", text: "Joyful celebration moments" },
    { image: "/images/gallery/wa-0824-39pm.jpeg", title: "Social Event", text: "Memorable gathering" },
    { image: "/images/gallery/wa-0848-01pm.jpeg", title: "Celebration", text: "Special occasion setup" },
    { image: "/images/gallery/wa-0848-02pm.jpeg", title: "Event Styling", text: "Beautiful decoration" },
    { image: "/images/gallery/wa-0848-03pm.jpeg", title: "Social Gathering", text: "Community celebration" },
  ],
  contact: {
    heading: "Plan Your Special Celebration",
    subheading: "Ready to create an unforgettable social event? Let's discuss your celebration ideas",
    phone: "+91 90289 49398",
    email: "social@visionmediaent.com",
    address: "123 Event Avenue, City, State 12345",
    hours: "Mon-Fri 9AM-6PM",
    eventCategoryOptions: [
      { value: "birthday", label: "Birthday Party" },
      { value: "anniversary", label: "Anniversary" },
      { value: "graduation", label: "Graduation Party" },
      { value: "holiday", label: "Holiday Celebration" },
      { value: "themed", label: "Custom Themed Event" },
      { value: "achievement", label: "Achievement Celebration" },
      { value: "other", label: "Other" },
    ],
  },
  footerText: "Creating memorable social celebrations and special occasions that bring people together.",
};

// ---------------------------------------------------------------------------
// BLOG PAGE (/blog)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// FOOTER — per-page brand text & quick-links, matched exactly to the
// original static pages (they differ slightly page to page).
// ---------------------------------------------------------------------------

export const footerByPath: Record<string, { text: string; links: typeof footerLinksHome }> = {
  "/": { text: footerContent.brandText, links: footerLinksHome },
  "/wedding": { text: weddingPage.footerText, links: footerLinksStandard },
  "/corporate-event": { text: corporatePage.footerText, links: footerLinksStandard },
  "/wedding-venues": { text: venuesPage.footerText, links: footerLinksStandard },
  "/social-events": { text: socialPage.footerText, links: footerLinksStandard },
};

export const blogPage = {
  heading: "Our Blog",
  subheading: "Insights and inspiration from Vision Media & Entertainment",
  listHeading: "Latest Posts",
  listSubheading: "Read our newest guides and insights",
  posts: [
    { title: "Top Corporate Event Trends", date: "Updated Oct 2025", text: "Ideas and formats that elevate corporate experiences—from immersive themes to meaningful engagement and measurable outcomes." },
    { title: "Wedding Planning Checklist", date: "Updated Oct 2025", text: "A practical, step-by-step planning sequence that removes stress and keeps your celebration on track." },
    { title: "Choosing the Right Venue", date: "Updated Oct 2025", text: "Capacity, logistics, ambience and access—what really matters before you book a venue for your big day." },
    { title: "Why Guest Experience Matters", date: "Updated Oct 2025", text: "From welcome to farewell—designing a thoughtful guest journey that creates lasting memories." },
  ],
  ctaHeading: "Have a topic you want us to cover?",
  ctaSubheading: "Reach out and we'll add it to our upcoming posts.",
  email: "info@visionmediaent.com",
  phone: "+91 90289 49398",
  footerText: "Stories and insights to help you plan unforgettable experiences.",
};

footerByPath["/blog"] = { text: blogPage.footerText, links: footerLinksBlog };
