import { useQuery } from '@tanstack/react-query';

async function fetchPassport(address: `0x${string}`): Promise<Data> {
  const response = await fetch(`/api/basenames/talentprotocol/${address}`);
  const data = (await response.json()) as Data;
  return data;
}

type Data = {
  score: {
    points: number;
    v1_score: number;
  };
  error?: string;
};

export function useTalentProtocol(address?: `0x${string}`) {
  const query = useQuery<Data>({
    queryKey: ['talent-protocol', address],
    queryFn: async ({ queryKey }) => fetchPassport(queryKey[1] as `0x${string}`),
    enabled: !!address,
  });

  if (query.data) {
    if (query.data.error) {
      return undefined;
    }
    return query.data.score.points;
  }

  return undefined;
}
