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

export type CityContent = Readonly<{
  slug: string;
  name: string;
  headline: string;
  summary: string;
  bestFor: readonly string[];
  popularAreas: readonly CityArea[];
  whatToExpect: readonly string[];
  relatedSearches: readonly string[];
}>;

export const CITIES: readonly CityContent[] = [
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
    relatedSearches: ['Rental rooms in Gurugram', 'Hostels in Noida', 'Long-stay options in Delhi NCR'],
  },
] as const;

export function getCity(citySlug: string) {
  return CITIES.find((city) => city.slug === citySlug);
}

export function getPopularAreas(citySlug?: string): readonly PopularAreaOption[] {
  if (citySlug) {
    return getCity(citySlug)?.popularAreas ?? [];
  }

  return CITIES.flatMap((city) =>
    city.popularAreas.map((area) => ({
      ...area,
      citySlug: city.slug,
      cityName: city.name,
    })),
  );
}
