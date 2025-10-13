import { useQuery } from '@tanstack/react-query';

const BASE_GUILD_ID = 20111;

export type GuildBadges =
  | 'BASE_BUILDER'
  | 'BUILDATHON_PARTICIPANT'
  | 'BASE_INITIATE'
  | 'BASE_LEARN_NEWCOMER'
  | 'BASE_GRANTEE'
  | 'BUILDATHON_WINNER';

const ROLE_ID_TO_BADGE: Record<number, GuildBadges> = {
  116358: 'BASE_BUILDER',
  140283: 'BUILDATHON_PARTICIPANT',
  116357: 'BASE_INITIATE',
  120420: 'BASE_LEARN_NEWCOMER',
};

type Memberships = {
  roles: {
    roleId: number;
    access: boolean;
  }[];
  errors?: [];
};

export function useBaseGuild(address?: `0x${string}`): {
  badges: Record<GuildBadges, boolean>;
  empty: boolean;
} {
  const query = useQuery<Memberships>({
    queryKey: ['guild'],
    queryFn: async () => {
      const profile = await fetch(
        `https://api.guild.xyz/v2/users/${address}/memberships?guildId=${BASE_GUILD_ID}`,
      );
      const data = await profile.json();
      return data as Memberships;
    },
    enabled: !!address,
  });

  // const badges: GuildBadges[] = [];
  const badges: Record<GuildBadges, boolean> = {
    BASE_BUILDER: false,
    BUILDATHON_PARTICIPANT: false,
    BASE_INITIATE: false,
    BASE_LEARN_NEWCOMER: false,
    BUILDATHON_WINNER: false,
    BASE_GRANTEE: false,
  };

  let empty = true;
  if (query.data) {
    if (query.data.errors ?? !query.data.roles) {
      return { badges, empty: true };
    }

    for (const role of query.data.roles) {
      if (role.access && role.roleId in ROLE_ID_TO_BADGE) {
        badges[ROLE_ID_TO_BADGE[role.roleId]] = true;
        empty = false;
      }
    }
  }

  return { badges, empty };
}
