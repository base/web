import { useQuery } from '@tanstack/react-query';

// Type for the User profile
type Bio = {
  text: string;
};

type Profile = {
  bio: Bio;
};

// Type for viewer context (the user's interaction with the viewer)
type ViewerContext = {
  following: boolean;
  followed_by: boolean;
};

// Type for verified addresses
type VerifiedAddresses = {
  eth_addresses: string[];
  sol_addresses: string[];
};

// Type for the main User object
export type User = {
  object: string;
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: VerifiedAddresses;
  active_status: string;
  power_badge: boolean;
  viewer_context: ViewerContext;
};

export type FIDResponse = {
  users: User[];
};

const fetchFIDData = async (fid?: number | undefined): Promise<FIDResponse | undefined> => {
  if (!fid) return;
  const response = await fetch(`/farcaster/user?fid=${fid}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as unknown as Promise<FIDResponse>;
};

export const useFIDQuery = (fid?: number | undefined) => {
  return useQuery<FIDResponse | undefined>({
    queryKey: ['fidData', fid],
    queryFn: async () => fetchFIDData(fid),
    enabled: !!fid,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
