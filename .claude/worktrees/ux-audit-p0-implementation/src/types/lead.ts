export type LeadSource = 'website' | 'search' | 'property_page' | 'city_page' | 'operator_page';

export type LeadType = 'property_enquiry' | 'callback_request' | 'general_contact';

export interface LeadContactDetails {
  name: string;
  phone?: string;
  email?: string;
}

export interface LeadCreateInput extends LeadContactDetails {
  type: LeadType;
  source: LeadSource;
  message?: string;
  propertySlug?: string;
  citySlug?: string;
}

export interface LeadCreateResponse {
  id: string;
  status: 'queued' | 'submitted' | 'received';
  receivedAt: string;
}
