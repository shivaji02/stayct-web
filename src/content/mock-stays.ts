export type MockProperty = {
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  locality: string;
  stayType: string;
  audience: string;
  startingPrice: string;
  deposit: string;
  responseTime: string;
  intro: string;
  highlights: readonly string[];
  amenities: readonly string[];
  roomOptions: readonly string[];
  commute: readonly string[];
};

export type MockCity = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  bestFor: readonly string[];
  localities: readonly string[];
  whatToExpect: readonly string[];
  featuredPropertySlugs: readonly string[];
};

export const MOCK_PROPERTIES: readonly MockProperty[] = [
  {
    slug: 'sri-lakshmi-pg',
    name: 'Sri Lakshmi PG',
    citySlug: 'hyderabad',
    cityName: 'Hyderabad',
    locality: 'Madhapur',
    stayType: 'PG for women',
    audience: 'Working professionals and interns looking for a move-in-ready option near Hitec City.',
    startingPrice: 'From Rs. 11,500 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within the same business day',
    intro:
      'Sri Lakshmi PG is a practical Hyderabad option for someone who wants a managed stay close to major work hubs without starting from an empty enquiry process.',
    highlights: [
      'Near Hitec City and Madhapur work corridors',
      'Meal plan included for daily convenience',
      'Suitable for quick move-ins and first-job relocations',
    ],
    amenities: ['Wi-Fi', 'Housekeeping', 'Meals', 'Laundry support', 'CCTV'],
    roomOptions: ['Twin sharing', 'Triple sharing', 'Compact single room'],
    commute: ['10 to 15 minutes to Hitec City', 'Easy access to metro and shared transport'],
  },
  {
    slug: 'green-nest-coliving',
    name: 'Green Nest Co-living',
    citySlug: 'hyderabad',
    cityName: 'Hyderabad',
    locality: 'Gachibowli',
    stayType: 'Co-living',
    audience: 'Professionals who want more flexibility, shared amenities, and a community-led setup.',
    startingPrice: 'From Rs. 14,000 / month',
    deposit: '1 month deposit',
    responseTime: 'Usually responds within 24 hours',
    intro:
      'Green Nest Co-living is suited to renters who want a more social shared-living environment around the Gachibowli corridor.',
    highlights: [
      'Designed for shared living and longer stays',
      'Common lounge and work-friendly spaces',
      'Useful for teams and new city relocations',
    ],
    amenities: ['Wi-Fi', 'Power backup', 'Common lounge', 'Housekeeping', 'Security'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Close to Gachibowli offices', 'Useful for daily cab and shuttle routes'],
  },
  {
    slug: 'urban-square-hostel',
    name: 'Urban Square Hostel',
    citySlug: 'bengaluru',
    cityName: 'Bengaluru',
    locality: 'Koramangala',
    stayType: 'Hostel',
    audience: 'Students and early-career professionals who want a central Bengaluru base.',
    startingPrice: 'From Rs. 9,500 / month',
    deposit: 'Flexible deposit terms',
    responseTime: 'Usually responds within 24 hours',
    intro:
      'Urban Square Hostel gives Bengaluru seekers a straightforward starting point in a popular, well-connected locality.',
    highlights: [
      'Central locality for student and startup movement',
      'Simple shared accommodation format',
      'Works well for shortlisting before inspections',
    ],
    amenities: ['Wi-Fi', 'Security', 'Laundry support', 'Common dining'],
    roomOptions: ['Dorm bed', 'Twin sharing'],
    commute: ['Convenient for Koramangala movement', 'Connected to major bus routes'],
  },
  {
    slug: 'river-view-shared-flat',
    name: 'River View Shared Flat',
    citySlug: 'pune',
    cityName: 'Pune',
    locality: 'Wakad',
    stayType: 'Shared flat',
    audience: 'Professionals who prefer apartment-style shared living over hostel or PG formats.',
    startingPrice: 'From Rs. 13,500 / month',
    deposit: '1.5 month deposit',
    responseTime: 'Usually responds within 24 hours',
    intro:
      'River View Shared Flat is a Pune option for renters who want apartment-style living with lower setup friction.',
    highlights: [
      'Apartment-style shared stay',
      'Works well for longer professional stays',
      'Closer to a home-like shared setup',
    ],
    amenities: ['Wi-Fi', 'Kitchen access', 'Housekeeping support', 'Parking'],
    roomOptions: ['Private room', 'Twin sharing'],
    commute: ['Useful for Wakad and Hinjawadi commutes', 'Balanced for office and residential access'],
  },
];

export const MOCK_CITIES: readonly MockCity[] = [
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    headline: 'A strong city for work-led stays, managed PGs, and shared living near major office clusters.',
    summary:
      'Hyderabad is a practical city to start with when the goal is to get closer to a shortlist quickly. The sample stays below show how a future STAYCT city page can move a visitor toward an enquiry instead of leaving them in browse mode.',
    bestFor: ['Interns and first-job relocations', 'Working professionals near Hitec City and Gachibowli', 'Renters who want managed PG or co-living options'],
    localities: ['Madhapur', 'Gachibowli', 'Kondapur', 'Hitec City'],
    whatToExpect: [
      'Most shortlists start by locality and commute practicality',
      'PGs and co-living options are common around work corridors',
      'A good city page should help the renter reach a property-level decision quickly',
    ],
    featuredPropertySlugs: ['sri-lakshmi-pg', 'green-nest-coliving'],
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    headline: 'Useful for student and professional stays where commute and locality fit matter early.',
    summary:
      'Bengaluru seekers usually narrow by locality and travel pattern first. This sample page shows how city content can frame that decision with a few realistic stay options.',
    bestFor: ['Students', 'Startup hires', 'Shared accommodation seekers'],
    localities: ['Koramangala', 'HSR Layout', 'Marathahalli', 'Whitefield'],
    whatToExpect: [
      'Locality usually affects budget and travel time more than category alone',
      'Hostels, PGs, and co-living all appear in common shortlists',
      'Property comparison should happen after the renter knows the right area',
    ],
    featuredPropertySlugs: ['urban-square-hostel'],
  },
  {
    slug: 'pune',
    name: 'Pune',
    headline: 'A strong fit for campus, workforce, and shared-flat searches that need a balanced city overview.',
    summary:
      'Pune works well for renters who want a quieter shortlist path with apartment-style sharing and workforce-friendly localities.',
    bestFor: ['Students', 'IT and operations teams', 'Shared-flat renters'],
    localities: ['Wakad', 'Hinjawadi', 'Baner', 'Kharadi'],
    whatToExpect: [
      'Apartment-style shared living is a common comparison point',
      'Budget and office access both shape the shortlist early',
      'City content should reduce uncertainty before the first enquiry',
    ],
    featuredPropertySlugs: ['river-view-shared-flat'],
  },
];

export function getMockCity(citySlug: string) {
  return MOCK_CITIES.find((city) => city.slug === citySlug);
}

export function getMockProperty(slug: string) {
  return MOCK_PROPERTIES.find((property) => property.slug === slug);
}

export function getPropertiesForCity(citySlug: string) {
  return MOCK_PROPERTIES.filter((property) => property.citySlug === citySlug);
}
