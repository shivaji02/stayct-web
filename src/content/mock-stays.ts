export type StayCategorySlug = 'pg' | 'hostel' | 'co-living' | 'shared-flat' | 'rental-room';

export type StayAvailability = 'available' | 'limited' | 'waitlist';

export type StaySort = 'recommended' | 'price-low' | 'price-high' | 'city';

export type StayPhotoTone = 'sage' | 'sand' | 'mist' | 'clay';

export type StayCategory = Readonly<{
  slug: StayCategorySlug;
  name: string;
  shortDescription: string;
  description: string;
  bestFor: readonly string[];
  searchHint: string;
}>;

export type CityArea = Readonly<{
  slug: string;
  name: string;
  note: string;
}>;

export type PopularAreaOption = CityArea &
  Readonly<{
    citySlug?: string;
    cityName?: string;
  }>;

export type DiscoveryCity = Readonly<{
  slug: string;
  name: string;
  headline: string;
  summary: string;
  bestFor: readonly string[];
  popularAreas: readonly CityArea[];
  whatToExpect: readonly string[];
  featuredStaySlugs: readonly string[];
  relatedSearches: readonly string[];
}>;

export type StayPhoto = Readonly<{
  title: string;
  caption: string;
  tone: StayPhotoTone;
}>;

export type MockProperty = Readonly<{
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  locality: string;
  localitySlug: string;
  category: StayCategorySlug;
  stayType: string;
  audience: string;
  priceFrom: number;
  startingPrice: string;
  deposit: string;
  responseTime: string;
  availability: StayAvailability;
  availabilityLabel: string;
  intro: string;
  summary: string;
  highlights: readonly string[];
  amenities: readonly string[];
  roomOptions: readonly string[];
  commute: readonly string[];
  photos: readonly StayPhoto[];
}>;

export type StaySearchInput = Readonly<{
  q?: string;
  city?: string;
  category?: StayCategorySlug;
  area?: string;
  sort?: StaySort;
}>;

export const STAY_CATEGORIES: readonly StayCategory[] = [
  {
    slug: 'pg',
    name: 'PG',
    shortDescription: 'Managed rooms with meals and daily essentials.',
    description: 'PG stays work well when you want a furnished room, clear monthly pricing, and low setup friction.',
    bestFor: ['Students moving for a semester', 'First-job relocations', 'Interns who need a quick move-in'],
    searchHint: 'Meals, furnished rooms, and practical move-ins',
  },
  {
    slug: 'hostel',
    name: 'Hostel',
    shortDescription: 'Shared living with simple budgets and community spaces.',
    description: 'Hostels suit people who want flexible occupancy, social living, and location-first shortlists.',
    bestFor: ['Students', 'Short-stay seekers', 'People prioritizing budget and community'],
    searchHint: 'Dorms, twin sharing, and social spaces',
  },
  {
    slug: 'co-living',
    name: 'Co-Living',
    shortDescription: 'Shared spaces with stronger amenity and community setup.',
    description: 'Co-living helps professionals find a more service-led shared stay with stronger common areas.',
    bestFor: ['Working professionals', 'Relocating teams', 'Longer stays with shared amenities'],
    searchHint: 'Flexible living with lounges, work areas, and community vibe',
  },
  {
    slug: 'shared-flat',
    name: 'Shared Flat',
    shortDescription: 'Apartment-style sharing with more privacy and home feel.',
    description: 'Shared flats fit renters who want private rooms with common kitchens and lower day-to-day supervision.',
    bestFor: ['Longer professional stays', 'Small groups moving together', 'People wanting apartment-style living'],
    searchHint: 'Private rooms inside a shared apartment',
  },
  {
    slug: 'rental-room',
    name: 'Rental Room',
    shortDescription: 'Independent room options with direct operator contact.',
    description: 'Rental rooms are useful when the seeker wants a simpler, direct room option without a PG or hostel format.',
    bestFor: ['Professionals with a fixed work zone', 'People comparing private room budgets', 'Seekers who prefer a direct room listing'],
    searchHint: 'Private room options with direct enquiries',
  },
] as const;

export const MOCK_CITIES: readonly DiscoveryCity[] = [
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    headline: 'Find managed PGs and co-living stays near fast-moving work corridors.',
    summary:
      'Hyderabad is strongest when the decision starts with commute, move-in speed, and managed accommodation near Hitec City and Gachibowli.',
    bestFor: ['Interns joining fast', 'Professionals near Hitec City', 'Seekers comparing PG vs co-living'],
    popularAreas: [
      { slug: 'madhapur', name: 'Madhapur', note: 'Useful for office-led PG searches.' },
      { slug: 'gachibowli', name: 'Gachibowli', note: 'A strong co-living and professional corridor.' },
      { slug: 'kondapur', name: 'Kondapur', note: 'Balanced for budget and access.' },
    ],
    whatToExpect: [
      'Location and commute usually narrow the shortlist first.',
      'Managed PG and co-living inventory is common near work corridors.',
      'A good Hyderabad page should move the seeker into stay comparison quickly.',
    ],
    featuredStaySlugs: ['sri-lakshmi-pg', 'green-nest-coliving'],
    relatedSearches: ['Women-friendly PGs', 'Co-living near Hitec City', 'Managed stays with meals'],
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    headline: 'Compare hostels and rental rooms by neighborhood before budget fatigue sets in.',
    summary:
      'Bengaluru search usually gets easier once the seeker picks the right locality cluster. STAYCT should surface that choice before long explanations.',
    bestFor: ['Students', 'Startup hires', 'Seekers prioritizing locality fit'],
    popularAreas: [
      { slug: 'koramangala', name: 'Koramangala', note: 'Strong for student and early-career movement.' },
      { slug: 'hsr-layout', name: 'HSR Layout', note: 'Good for commute-led shortlists.' },
      { slug: 'whitefield', name: 'Whitefield', note: 'Useful for private room and office access needs.' },
    ],
    whatToExpect: [
      'Neighborhood fit matters earlier than category for many Bengaluru searches.',
      'Hostels and rental rooms often appear in the same shortlist.',
      'The page should help the user keep orientation while switching between areas.',
    ],
    featuredStaySlugs: ['urban-square-hostel', 'whitefield-rental-room'],
    relatedSearches: ['Hostels in Koramangala', 'Private rooms in Whitefield', 'Student stays in Bengaluru'],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    headline: 'Shortlist co-living and shared flats by line and locality before rent and commute pile up.',
    summary:
      'Mumbai search works best when the page helps the seeker fix a railway line and locality cluster first, then compare managed co-living and shared-flat options inside it.',
    bestFor: ['Professionals near BKC and Andheri', 'Students and early-career movers', 'Seekers comparing co-living vs shared flat'],
    popularAreas: [
      { slug: 'andheri', name: 'Andheri', note: 'Strong for office-led co-living and shared-flat searches.' },
      { slug: 'powai', name: 'Powai', note: 'Useful for managed stays near the tech and campus corridor.' },
      { slug: 'thane', name: 'Thane', note: 'Balanced for budget and central-line commute access.' },
    ],
    whatToExpect: [
      'Commute line and locality usually narrow the shortlist before budget does.',
      'Co-living and shared flats often appear in the same comparison here.',
      'A good Mumbai page should move the seeker into stay comparison quickly.',
    ],
    featuredStaySlugs: ['powai-coliving-house', 'andheri-shared-flat'],
    relatedSearches: ['Co-living in Powai', 'Shared flats in Andheri', 'Budget stays near Thane'],
  },
  {
    slug: 'vijayawada',
    name: 'Vijayawada',
    headline: 'Use a smaller-city page to get from broad intent to a practical PG shortlist.',
    summary:
      'Vijayawada works best when the page acts like a direct shortlist builder instead of a generic city explainer.',
    bestFor: ['Students', 'People relocating within Andhra Pradesh', 'Budget-first seekers'],
    popularAreas: [
      { slug: 'benz-circle', name: 'Benz Circle', note: 'Useful for central access and daily movement.' },
      { slug: 'm-g-road', name: 'M.G. Road', note: 'A practical zone for shortlisting by convenience.' },
      { slug: 'governorpet', name: 'Governorpet', note: 'Often works for budget-led room searches.' },
    ],
    whatToExpect: [
      'Smaller-market seekers want clarity faster, not more browsing layers.',
      'PG and rental-room comparisons usually do the most work here.',
      'Support should remain close when the first shortlist is still unclear.',
    ],
    featuredStaySlugs: ['krishna-river-pg'],
    relatedSearches: ['Affordable PGs in Vijayawada', 'Rooms near Benz Circle', 'Student stays in Vijayawada'],
  },
  {
    slug: 'pune',
    name: 'Pune',
    headline: 'Shortlist shared flats and mixed workforce stays with commute and layout in view.',
    summary:
      'Pune pages should prioritize apartment-style sharing and work-led localities instead of forcing the user into generic marketing.',
    bestFor: ['IT teams', 'Shared-flat renters', 'People comparing budget with office access'],
    popularAreas: [
      { slug: 'wakad', name: 'Wakad', note: 'Strong for shared-flat comparisons.' },
      { slug: 'hinjawadi', name: 'Hinjawadi', note: 'Useful when office access drives the search.' },
      { slug: 'baner', name: 'Baner', note: 'Balanced for budget and daily convenience.' },
    ],
    whatToExpect: [
      'Shared-flat comparisons often win over hostel-style browsing here.',
      'Locality and commute shape the shortlist early.',
      'Listings should stay above explanatory city content.',
    ],
    featuredStaySlugs: ['river-view-shared-flat'],
    relatedSearches: ['Shared flats in Wakad', 'Private rooms near Hinjawadi', 'Professional stays in Pune'],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    headline: 'Move quickly from area choice to PG or co-living options for work and study corridors.',
    summary:
      'Chennai needs a city page that helps seekers choose between corridor-led PGs and more service-heavy co-living inventory.',
    bestFor: ['Students', 'Professionals near OMR', 'Women seeking managed PG options'],
    popularAreas: [
      { slug: 'taramani', name: 'Taramani', note: 'Useful for OMR and tech corridor movement.' },
      { slug: 'velachery', name: 'Velachery', note: 'A practical crossover area for study and work.' },
      { slug: 'nungambakkam', name: 'Nungambakkam', note: 'Often shortlisted for city access.' },
    ],
    whatToExpect: [
      'City pages should connect OMR-led intent to real stay choices fast.',
      'PG and co-living comparison is more useful than broad city storytelling.',
      'Popular areas should act like shortcuts into search, not static labels.',
    ],
    featuredStaySlugs: ['marina-womens-pg', 'taramani-coliving-house'],
    relatedSearches: ['Women-friendly PGs in Chennai', 'Co-living near OMR', 'Student stays in Chennai'],
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    headline: 'Use a multi-area page to narrow toward the right sub-market before you compare stays.',
    summary:
      'Delhi NCR needs orientation first: the page should help the seeker pick the right area cluster and then compare hostels or rental rooms inside it.',
    bestFor: ['Professionals relocating to Gurugram or Noida', 'Seekers who need area-led orientation', 'People comparing private room and hostel formats'],
    popularAreas: [
      { slug: 'gurugram-sector-43', name: 'Gurugram Sector 43', note: 'Useful for work-led private room searches.' },
      { slug: 'noida-sector-62', name: 'Noida Sector 62', note: 'A practical hostel and room corridor.' },
      { slug: 'south-delhi', name: 'South Delhi', note: 'Useful when city access matters more than one office zone.' },
    ],
    whatToExpect: [
      'Users need strong navigation recovery because the market is broad.',
      'Area shortcuts should sit near listing content, not below it.',
      'A city page should reduce decision fatigue before the first enquiry.',
    ],
    featuredStaySlugs: ['noida-metro-hostel', 'gurugram-rental-room'],
    relatedSearches: ['Rental rooms in Gurugram', 'Hostels in Noida', 'Long-stay options in Delhi NCR'],
  },
] as const;

export const MOCK_PROPERTIES: readonly MockProperty[] = [
  {
    slug: 'sri-lakshmi-pg',
    name: 'Sri Lakshmi PG',
    citySlug: 'hyderabad',
    cityName: 'Hyderabad',
    locality: 'Madhapur',
    localitySlug: 'madhapur',
    category: 'pg',
    stayType: 'Women-friendly PG',
    audience: 'Working professionals and interns looking for a move-in-ready option near Hitec City.',
    priceFrom: 11500,
    startingPrice: 'From Rs. 11,500 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds the same business day',
    availability: 'available',
    availabilityLabel: 'Rooms available now',
    intro:
      'Sri Lakshmi PG helps a Hyderabad seeker move from broad browsing into a practical women-friendly shortlist near major work hubs.',
    summary: 'Meals, housekeeping, and practical access to Hitec City.',
    highlights: [
      'Near Hitec City and Madhapur work corridors',
      'Meals included for daily convenience',
      'Useful for quick move-ins and first-job relocations',
    ],
    amenities: ['Wi-Fi', 'Housekeeping', 'Meals', 'Laundry support', 'CCTV'],
    roomOptions: ['Twin sharing', 'Triple sharing', 'Compact single room'],
    commute: ['10 to 15 minutes to Hitec City', 'Easy access to metro and shared transport'],
    photos: [
      { title: 'Front entrance', caption: 'Managed entry with secure access.', tone: 'sand' },
      { title: 'Sharing room', caption: 'Twin-sharing setup with storage.', tone: 'sage' },
      { title: 'Dining zone', caption: 'Daily meal service area.', tone: 'clay' },
    ],
  },
  {
    slug: 'green-nest-coliving',
    name: 'Green Nest Co-living',
    citySlug: 'hyderabad',
    cityName: 'Hyderabad',
    locality: 'Gachibowli',
    localitySlug: 'gachibowli',
    category: 'co-living',
    stayType: 'Co-living',
    audience: 'Professionals who want more flexibility, shared amenities, and a community-led setup.',
    priceFrom: 14000,
    startingPrice: 'From Rs. 14,000 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within 24 hours',
    availability: 'limited',
    availabilityLabel: 'Limited beds this week',
    intro:
      'Green Nest Co-living is suited to renters who want a service-led shared stay around the Gachibowli corridor.',
    summary: 'Community-led living with flexible room plans and work-friendly common spaces.',
    highlights: [
      'Shared lounge and work-friendly spaces',
      'Useful for longer professional stays',
      'Balanced for teams and solo relocations',
    ],
    amenities: ['Wi-Fi', 'Power backup', 'Common lounge', 'Housekeeping', 'Security'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Close to Gachibowli offices', 'Useful for daily cab and shuttle routes'],
    photos: [
      { title: 'Common lounge', caption: 'A flexible shared lounge for work and downtime.', tone: 'mist' },
      { title: 'Private room', caption: 'Private room option with study desk.', tone: 'sage' },
      { title: 'Community kitchen', caption: 'Shared kitchen and dining setup.', tone: 'sand' },
    ],
  },
  {
    slug: 'urban-square-hostel',
    name: 'Urban Square Hostel',
    citySlug: 'bengaluru',
    cityName: 'Bengaluru',
    locality: 'Koramangala',
    localitySlug: 'koramangala',
    category: 'hostel',
    stayType: 'Hostel',
    audience: 'Students and early-career professionals who want a central Bengaluru base.',
    priceFrom: 9500,
    startingPrice: 'From Rs. 9,500 / month',
    deposit: 'Flexible deposit terms',
    responseTime: 'Usually responds within 24 hours',
    availability: 'available',
    availabilityLabel: 'Beds available this month',
    intro:
      'Urban Square Hostel gives Bengaluru seekers a direct hostel comparison route in a well-connected locality.',
    summary: 'Simple shared accommodation in a central Koramangala zone.',
    highlights: [
      'Central locality for student and startup movement',
      'Shared living with practical pricing',
      'Works well for quick shortlist decisions',
    ],
    amenities: ['Wi-Fi', 'Security', 'Laundry support', 'Common dining'],
    roomOptions: ['Dorm bed', 'Twin sharing'],
    commute: ['Convenient for Koramangala movement', 'Connected to major bus routes'],
    photos: [
      { title: 'Dorm room', caption: 'Shared-bed setup for budget-led searches.', tone: 'clay' },
      { title: 'Dining hall', caption: 'Simple common dining and social area.', tone: 'sand' },
      { title: 'Study corner', caption: 'Useful for students and exam prep.', tone: 'mist' },
    ],
  },
  {
    slug: 'whitefield-rental-room',
    name: 'Whitefield Rental Room',
    citySlug: 'bengaluru',
    cityName: 'Bengaluru',
    locality: 'Whitefield',
    localitySlug: 'whitefield',
    category: 'rental-room',
    stayType: 'Rental room',
    audience: 'Professionals who want a private room option close to large office clusters.',
    priceFrom: 12500,
    startingPrice: 'From Rs. 12,500 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within one business day',
    availability: 'limited',
    availabilityLabel: 'Limited private rooms',
    intro:
      'Whitefield Rental Room is a cleaner fit for a private-room seeker who wants to skip generic hostel browsing.',
    summary: 'Private room inventory near Whitefield work hubs with direct operator contact.',
    highlights: [
      'Private room format with fewer shared trade-offs',
      'Strong for Whitefield office commutes',
      'Useful when a seeker wants a direct room listing',
    ],
    amenities: ['Wi-Fi', 'Attached washroom', 'Parking', 'Housekeeping'],
    roomOptions: ['Private room'],
    commute: ['15 to 20 minutes to major Whitefield offices', 'Easy access to shuttle and cabs'],
    photos: [
      { title: 'Private room', caption: 'Independent room setup for work-led stays.', tone: 'sage' },
      { title: 'Building lobby', caption: 'Operator-managed entry and support desk.', tone: 'mist' },
      { title: 'Washroom', caption: 'Attached washroom with storage niche.', tone: 'sand' },
    ],
  },
  {
    slug: 'krishna-river-pg',
    name: 'Krishna River PG',
    citySlug: 'vijayawada',
    cityName: 'Vijayawada',
    locality: 'Benz Circle',
    localitySlug: 'benz-circle',
    category: 'pg',
    stayType: 'PG',
    audience: 'Students and early professionals who want a straightforward room option near central Vijayawada.',
    priceFrom: 7800,
    startingPrice: 'From Rs. 7,800 / month',
    deposit: 'Half-month deposit',
    responseTime: 'Usually responds the same day',
    availability: 'available',
    availabilityLabel: 'Move-in slots open',
    intro:
      'Krishna River PG keeps the Vijayawada page from becoming a browse-only route by giving seekers a real first shortlist.',
    summary: 'Budget-friendly PG with meal support near Benz Circle.',
    highlights: [
      'Central location for daily movement',
      'Simple pricing and low setup friction',
      'Works well for shorter shortlists and student moves',
    ],
    amenities: ['Wi-Fi', 'Meals', 'Laundry support', 'CCTV'],
    roomOptions: ['Twin sharing', 'Triple sharing'],
    commute: ['10 minutes to major bus routes', 'Useful for central city access'],
    photos: [
      { title: 'Building front', caption: 'Street-facing managed PG entry.', tone: 'sand' },
      { title: 'Sharing room', caption: 'Functional room layout for student use.', tone: 'mist' },
      { title: 'Meal area', caption: 'Daily meal service corner.', tone: 'clay' },
    ],
  },
  {
    slug: 'river-view-shared-flat',
    name: 'River View Shared Flat',
    citySlug: 'pune',
    cityName: 'Pune',
    locality: 'Wakad',
    localitySlug: 'wakad',
    category: 'shared-flat',
    stayType: 'Shared flat',
    audience: 'Professionals who prefer apartment-style shared living over hostel or PG formats.',
    priceFrom: 13500,
    startingPrice: 'From Rs. 13,500 / month',
    deposit: '1.5 month deposit',
    responseTime: 'Usually responds within 24 hours',
    availability: 'available',
    availabilityLabel: 'Rooms available this week',
    intro:
      'River View Shared Flat is a Pune option for renters who want apartment-style living with lower setup friction.',
    summary: 'Apartment-style shared stay with kitchen access and practical office routes.',
    highlights: [
      'Apartment-style shared stay',
      'Works well for longer professional stays',
      'Closer to a home-like shared setup',
    ],
    amenities: ['Wi-Fi', 'Kitchen access', 'Housekeeping support', 'Parking'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Useful for Wakad and Hinjawadi commutes', 'Balanced for office and residential access'],
    photos: [
      { title: 'Living room', caption: 'Shared apartment lounge for day-to-day living.', tone: 'mist' },
      { title: 'Bedroom', caption: 'Private room option with storage.', tone: 'sage' },
      { title: 'Kitchen', caption: 'Shared kitchen and dining setup.', tone: 'sand' },
    ],
  },
  {
    slug: 'powai-coliving-house',
    name: 'Powai Co-living House',
    citySlug: 'mumbai',
    cityName: 'Mumbai',
    locality: 'Powai',
    localitySlug: 'powai',
    category: 'co-living',
    stayType: 'Co-living',
    audience: 'Professionals who want a service-led shared stay near Powai’s tech and campus corridor.',
    priceFrom: 18500,
    startingPrice: 'From Rs. 18,500 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within 24 hours',
    availability: 'limited',
    availabilityLabel: 'Limited beds this week',
    intro:
      'Powai Co-living House suits a Mumbai renter who wants managed, community-led living close to the Powai work and study cluster.',
    summary: 'Community-led co-living with flexible plans and work-friendly common spaces.',
    highlights: [
      'Close to Powai tech and campus corridor',
      'Shared lounge and work-friendly spaces',
      'Useful for longer professional stays',
    ],
    amenities: ['Wi-Fi', 'Power backup', 'Common lounge', 'Housekeeping', 'Security'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Quick access to Powai and JVLR routes', 'Practical for central and western corridor movement'],
    photos: [
      { title: 'Common lounge', caption: 'Work-friendly shared lounge.', tone: 'sage' },
      { title: 'Private room', caption: 'Private room option with storage.', tone: 'mist' },
      { title: 'Dining zone', caption: 'Shared kitchen and dining setup.', tone: 'sand' },
    ],
  },
  {
    slug: 'andheri-shared-flat',
    name: 'Andheri Shared Flat',
    citySlug: 'mumbai',
    cityName: 'Mumbai',
    locality: 'Andheri',
    localitySlug: 'andheri',
    category: 'shared-flat',
    stayType: 'Shared flat',
    audience: 'Professionals who prefer apartment-style shared living near Andheri’s office and metro access.',
    priceFrom: 16000,
    startingPrice: 'From Rs. 16,000 / month',
    deposit: '1.5 month deposit',
    responseTime: 'Usually responds the same business day',
    availability: 'available',
    availabilityLabel: 'Rooms available this week',
    intro:
      'Andheri Shared Flat is a Mumbai option for renters who want apartment-style living with strong metro and office access.',
    summary: 'Apartment-style shared stay with kitchen access and practical office routes.',
    highlights: [
      'Close to Andheri metro and office corridors',
      'Apartment-style shared stay',
      'Works well for longer professional stays',
    ],
    amenities: ['Wi-Fi', 'Kitchen access', 'Housekeeping support', 'Parking'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Easy access to Andheri metro and Western line', 'Balanced for BKC and SEEPZ routes'],
    photos: [
      { title: 'Living room', caption: 'Shared apartment lounge for day-to-day living.', tone: 'mist' },
      { title: 'Bedroom', caption: 'Private room option with storage.', tone: 'sage' },
      { title: 'Kitchen', caption: 'Shared kitchen and dining setup.', tone: 'clay' },
    ],
  },
  {
    slug: 'marina-womens-pg',
    name: 'Marina Women’s PG',
    citySlug: 'chennai',
    cityName: 'Chennai',
    locality: 'Velachery',
    localitySlug: 'velachery',
    category: 'pg',
    stayType: 'Women-friendly PG',
    audience: 'Students and professionals who want a women-focused PG near study and work corridors.',
    priceFrom: 10200,
    startingPrice: 'From Rs. 10,200 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within one business day',
    availability: 'available',
    availabilityLabel: 'Rooms open for this month',
    intro:
      'Marina Women’s PG gives Chennai seekers a managed PG option that sits close to common work and study movement.',
    summary: 'Women-friendly PG with meals and easy Velachery access.',
    highlights: [
      'Women-friendly move-in path',
      'Strong fit for work and study corridors',
      'Meals and housekeeping included',
    ],
    amenities: ['Wi-Fi', 'Meals', 'Housekeeping', 'Security', 'Laundry support'],
    roomOptions: ['Twin sharing', 'Single room'],
    commute: ['15 minutes to Taramani and OMR connectors', 'Useful for local train and bus access'],
    photos: [
      { title: 'Entrance', caption: 'Secure entry and reception desk.', tone: 'sand' },
      { title: 'Single room', caption: 'Compact private room option.', tone: 'sage' },
      { title: 'Dining space', caption: 'Daily meal setup and seating.', tone: 'clay' },
    ],
  },
  {
    slug: 'taramani-coliving-house',
    name: 'Taramani Co-Living House',
    citySlug: 'chennai',
    cityName: 'Chennai',
    locality: 'Taramani',
    localitySlug: 'taramani',
    category: 'co-living',
    stayType: 'Co-living',
    audience: 'Professionals who want a more flexible shared stay close to Chennai tech corridors.',
    priceFrom: 14800,
    startingPrice: 'From Rs. 14,800 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within 24 hours',
    availability: 'limited',
    availabilityLabel: 'A few rooms left',
    intro:
      'Taramani Co-Living House is useful when the seeker wants stronger amenities and a more flexible community setup near OMR.',
    summary: 'Service-led co-living with common work areas near Taramani.',
    highlights: [
      'Common workspace and lounge setup',
      'Good fit for OMR professionals',
      'Flexible shared-living format',
    ],
    amenities: ['Wi-Fi', 'Power backup', 'Work lounge', 'Housekeeping', 'Security'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Quick access to OMR and Taramani offices', 'Useful for daily cab routes'],
    photos: [
      { title: 'Work lounge', caption: 'Shared lounge with work-ready seating.', tone: 'mist' },
      { title: 'Room', caption: 'Bright shared room with storage.', tone: 'sage' },
      { title: 'Common kitchen', caption: 'Community kitchen and snack zone.', tone: 'clay' },
    ],
  },
  {
    slug: 'noida-metro-hostel',
    name: 'Noida Metro Hostel',
    citySlug: 'delhi-ncr',
    cityName: 'Delhi NCR',
    locality: 'Noida Sector 62',
    localitySlug: 'noida-sector-62',
    category: 'hostel',
    stayType: 'Hostel',
    audience: 'Students and young professionals who want a simple, connected hostel near a metro corridor.',
    priceFrom: 8800,
    startingPrice: 'From Rs. 8,800 / month',
    deposit: 'Flexible deposit terms',
    responseTime: 'Usually responds the same day',
    availability: 'available',
    availabilityLabel: 'Beds open now',
    intro:
      'Noida Metro Hostel gives Delhi NCR seekers a clear hostel option tied to a specific sub-market instead of a vague city promise.',
    summary: 'Metro-connected hostel inventory for budget-led Delhi NCR searches.',
    highlights: [
      'Metro-led orientation for easier shortlisting',
      'Useful for students and early-career professionals',
      'Shared living with a direct enquiry path',
    ],
    amenities: ['Wi-Fi', 'Security', 'Laundry support', 'Common dining'],
    roomOptions: ['Dorm bed', 'Twin sharing'],
    commute: ['Walkable access to metro connectors', 'Useful for Noida office routes'],
    photos: [
      { title: 'Dorm bay', caption: 'Shared dorm layout with practical storage.', tone: 'clay' },
      { title: 'Common hall', caption: 'Shared hall for meals and informal study.', tone: 'sand' },
      { title: 'Entry desk', caption: 'Front-desk support and visitor check-in.', tone: 'mist' },
    ],
  },
  {
    slug: 'gurugram-rental-room',
    name: 'Gurugram Rental Room',
    citySlug: 'delhi-ncr',
    cityName: 'Delhi NCR',
    locality: 'Gurugram Sector 43',
    localitySlug: 'gurugram-sector-43',
    category: 'rental-room',
    stayType: 'Rental room',
    audience: 'Professionals who want a private room near Gurugram offices without entering a PG-style setup.',
    priceFrom: 16800,
    startingPrice: 'From Rs. 16,800 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within one business day',
    availability: 'waitlist',
    availabilityLabel: 'Waitlist open for next vacancy',
    intro:
      'Gurugram Rental Room makes the Delhi NCR page more actionable by showing a direct private-room route for office-led movers.',
    summary: 'Private room option in Gurugram with direct operator contact and waitlist support.',
    highlights: [
      'Private room route for work-led stays',
      'Useful when the seeker wants a quieter setup',
      'Waitlist path still keeps the journey alive',
    ],
    amenities: ['Wi-Fi', 'Attached washroom', 'Parking', 'Security'],
    roomOptions: ['Private room'],
    commute: ['Useful for Gurugram office commutes', 'Connected to rapid metro and cabs'],
    photos: [
      { title: 'Room setup', caption: 'Private room with work desk and wardrobe.', tone: 'sage' },
      { title: 'Building front', caption: 'Operator-managed building with controlled access.', tone: 'mist' },
      { title: 'Pantry', caption: 'Shared pantry for day-to-day convenience.', tone: 'sand' },
    ],
  },
] as const;

export type StaySearchResult = Readonly<{
  items: readonly MockProperty[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}>;

const DEFAULT_PAGE_SIZE = 6;

export function getMockCity(citySlug: string) {
  return MOCK_CITIES.find((city) => city.slug === citySlug);
}

export function getMockProperty(slug: string) {
  return MOCK_PROPERTIES.find((property) => property.slug === slug);
}

export function getPropertiesForCity(citySlug: string) {
  return MOCK_PROPERTIES.filter((property) => property.citySlug === citySlug);
}

export function getPropertiesForCategory(categorySlug: StayCategorySlug) {
  return MOCK_PROPERTIES.filter((property) => property.category === categorySlug);
}

export function getStayCategory(categorySlug: StayCategorySlug) {
  return STAY_CATEGORIES.find((category) => category.slug === categorySlug);
}

export function getFeaturedProperties(limit = 6) {
  return MOCK_PROPERTIES.slice(0, limit);
}

export function getRelatedProperties(property: MockProperty, limit = 3) {
  return MOCK_PROPERTIES.filter(
    (candidate) =>
      candidate.slug !== property.slug &&
      (candidate.citySlug === property.citySlug || candidate.category === property.category),
  ).slice(0, limit);
}

export function getPopularAreas(citySlug?: string): readonly PopularAreaOption[] {
  if (citySlug) {
    return getMockCity(citySlug)?.popularAreas ?? [];
  }

  return MOCK_CITIES.flatMap((city) =>
    city.popularAreas.map((area) => ({
      ...area,
      citySlug: city.slug,
      cityName: city.name,
    })),
  );
}

export function searchProperties(
  { q, city, category, area, sort = 'recommended' }: StaySearchInput,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): StaySearchResult {
  const query = q?.trim().toLowerCase() ?? '';

  const filtered = MOCK_PROPERTIES.filter((property) => {
    const matchesCity = city ? property.citySlug === city : true;
    const matchesCategory = category ? property.category === category : true;
    const matchesArea = area ? property.localitySlug === area : true;
    const matchesQuery = query
      ? [
          property.name,
          property.cityName,
          property.locality,
          property.stayType,
          property.summary,
          ...property.amenities,
          ...property.highlights,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      : true;

    return matchesCity && matchesCategory && matchesArea && matchesQuery;
  });

  const sorted = [...filtered].sort((left, right) => {
    if (sort === 'price-low') {
      return left.priceFrom - right.priceFrom;
    }

    if (sort === 'price-high') {
      return right.priceFrom - left.priceFrom;
    }

    if (sort === 'city') {
      return left.cityName.localeCompare(right.cityName) || left.name.localeCompare(right.name);
    }

    return MOCK_PROPERTIES.findIndex((property) => property.slug === left.slug) -
      MOCK_PROPERTIES.findIndex((property) => property.slug === right.slug);
  });

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageIndex = Math.min(safePage, totalPages);
  const start = (pageIndex - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return {
    items,
    total: sorted.length,
    page: pageIndex,
    pageSize,
    totalPages,
  };
}
