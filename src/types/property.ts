export type PropertyCategory = 'pg' | 'hostel' | 'co-living' | 'shared-flat' | 'rental-room';

export type PropertyVisibility = 'available' | 'limited' | 'waitlist';

export type PropertyStatus = PropertyVisibility;

export type PropertyAddress = {
  addressLine1: string;
  locality: string | null;
  city: string | null;
  state: string | null;
};

export type PropertyLocation = PropertyAddress;

export type PropertyAmenity = string;

export interface PropertyListItem {
  id: string;
  identifier: string;
  name: string;
  propertyType: string | null;
  category: PropertyCategory;
  genderCategory: 'GENTS' | 'LADIES' | 'UNISEX';
  addressLine1: string;
  locality: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  coverPhotoUrl: string | null;
  photos: readonly string[];
  amenities: readonly string[];
  startingFromRent: number | null;
  totalBeds: number;
  availableBeds: number;
  organizationName: string;
  organizationDisplayCode: string | null;
  availabilityLabel: string;
}

export interface PropertyDetail extends PropertyListItem {
  occupiedBeds: number;
  reservedBeds: number;
  organization: {
    id: string;
    name: string;
    displayCode: string | null;
  };
  floors: readonly {
    id: string;
    name: string;
    floorNumber: number;
    flats: readonly {
      id: string;
      name: string;
      unitNumber: string;
      floorId: string;
      floorNumber: number;
      status: 'VACANT' | 'OCCUPIED' | 'PARTIAL';
      capacity: number;
      occupied: number;
      available: number;
      flatType: 'ROOM' | 'ONE_RK' | 'ONE_BHK' | 'TWO_BHK' | null;
      flatAmenities: readonly string[];
      monthlyRent: number | null;
      rooms: readonly {
        id: string;
        name: string;
        status: 'VACANT' | 'OCCUPIED' | 'PARTIAL';
        capacity: number;
        occupied: number;
        available: number;
        flatType: 'ROOM' | 'ONE_RK' | 'ONE_BHK' | 'TWO_BHK' | null;
        flatAmenities: readonly string[];
        monthlyRent: number | null;
      }[];
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyQuery {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  locality?: string;
  category?: PropertyCategory;
  propertyType?: string;
  availability?: PropertyVisibility;
  sortBy?: 'recommended' | 'price-low' | 'price-high' | 'city';
}

export interface PropertyListResponse {
  items: readonly PropertyListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
