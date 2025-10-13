export type ManagedAddressesData = {
  domain: string;
  expires_at: string;
  is_primary: boolean;
  manager_address: string;
  network_id: string;
  owner_address: string;
  primary_address: string;
  token_id: string;
};

export type ManagedAddressesResponse = {
  data: ManagedAddressesData[];
  has_more: boolean;
  next_page: string;
  total_count: number;
};
