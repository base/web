/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useBaseGuild, GuildBadges } from './useBaseGuild';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Create a wrapper with QueryClientProvider
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const BASE_GUILD_ID = 20111;

describe('useBaseGuild', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: async () => Promise.resolve({ roles: [] }),
    });
  });

  describe('when no address is provided', () => {
    it('should return all badges as false and empty as true', () => {
      const { result } = renderHook(() => useBaseGuild(), {
        wrapper: createWrapper(),
      });

      expect(result.current.empty).toBe(true);
      expect(result.current.badges.BASE_BUILDER).toBe(false);
      expect(result.current.badges.BUILDATHON_PARTICIPANT).toBe(false);
      expect(result.current.badges.BASE_INITIATE).toBe(false);
      expect(result.current.badges.BASE_LEARN_NEWCOMER).toBe(false);
      expect(result.current.badges.BUILDATHON_WINNER).toBe(false);
      expect(result.current.badges.BASE_GRANTEE).toBe(false);
    });

    it('should not call fetch when address is undefined', () => {
      renderHook(() => useBaseGuild(undefined), {
        wrapper: createWrapper(),
      });

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('when address is provided', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;

    it('should call fetch with correct Guild API URL', async () => {
      mockFetch.mockResolvedValue({
        json: async () => Promise.resolve({ roles: [] }),
      });

      renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          `https://api.guild.xyz/v2/users/${address}/memberships?guildId=${BASE_GUILD_ID}`,
        );
      });
    });

    it('should return empty true when roles array is empty', async () => {
      mockFetch.mockResolvedValue({
        json: async () => Promise.resolve({ roles: [] }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.empty).toBe(true);
      });
    });

    it('should return empty true when API returns errors', async () => {
      mockFetch.mockResolvedValue({
        json: async () => Promise.resolve({ errors: ['some error'], roles: [] }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.empty).toBe(true);
      });
    });

    it('should return empty true when roles is undefined', async () => {
      mockFetch.mockResolvedValue({
        json: async () => Promise.resolve({}),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.empty).toBe(true);
      });
    });

    it('should set BASE_BUILDER badge to true when roleId 116358 has access', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 116358, access: true }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_BUILDER).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should set BUILDATHON_PARTICIPANT badge to true when roleId 140283 has access', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 140283, access: true }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BUILDATHON_PARTICIPANT).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should set BASE_INITIATE badge to true when roleId 116357 has access', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 116357, access: true }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_INITIATE).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should set BASE_LEARN_NEWCOMER badge to true when roleId 120420 has access', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 120420, access: true }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_LEARN_NEWCOMER).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should not set badge when role access is false', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 116358, access: false }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_BUILDER).toBe(false);
        expect(result.current.empty).toBe(true);
      });
    });

    it('should not set badge when roleId is not in ROLE_ID_TO_BADGE mapping', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [{ roleId: 999999, access: true }],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.empty).toBe(true);
      });
    });

    it('should set multiple badges when user has multiple roles with access', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [
              { roleId: 116358, access: true }, // BASE_BUILDER
              { roleId: 140283, access: true }, // BUILDATHON_PARTICIPANT
              { roleId: 116357, access: true }, // BASE_INITIATE
              { roleId: 120420, access: true }, // BASE_LEARN_NEWCOMER
            ],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_BUILDER).toBe(true);
        expect(result.current.badges.BUILDATHON_PARTICIPANT).toBe(true);
        expect(result.current.badges.BASE_INITIATE).toBe(true);
        expect(result.current.badges.BASE_LEARN_NEWCOMER).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should only set badges for roles with access true in a mixed list', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [
              { roleId: 116358, access: true }, // BASE_BUILDER - has access
              { roleId: 140283, access: false }, // BUILDATHON_PARTICIPANT - no access
              { roleId: 116357, access: true }, // BASE_INITIATE - has access
              { roleId: 120420, access: false }, // BASE_LEARN_NEWCOMER - no access
            ],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BASE_BUILDER).toBe(true);
        expect(result.current.badges.BUILDATHON_PARTICIPANT).toBe(false);
        expect(result.current.badges.BASE_INITIATE).toBe(true);
        expect(result.current.badges.BASE_LEARN_NEWCOMER).toBe(false);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should always return BUILDATHON_WINNER and BASE_GRANTEE as false since they are not in role mapping', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>
          Promise.resolve({
            roles: [
              { roleId: 116358, access: true },
              { roleId: 140283, access: true },
              { roleId: 116357, access: true },
              { roleId: 120420, access: true },
            ],
          }),
      });

      const { result } = renderHook(() => useBaseGuild(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.BUILDATHON_WINNER).toBe(false);
        expect(result.current.badges.BASE_GRANTEE).toBe(false);
      });
    });
  });

  describe('return type structure', () => {
    it('should return an object with badges and empty properties', () => {
      const { result } = renderHook(() => useBaseGuild(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toHaveProperty('badges');
      expect(result.current).toHaveProperty('empty');
    });

    it('should return badges object with all GuildBadges keys', () => {
      const { result } = renderHook(() => useBaseGuild(), {
        wrapper: createWrapper(),
      });

      const expectedBadges: GuildBadges[] = [
        'BASE_BUILDER',
        'BUILDATHON_PARTICIPANT',
        'BASE_INITIATE',
        'BASE_LEARN_NEWCOMER',
        'BASE_GRANTEE',
        'BUILDATHON_WINNER',
      ];

      expectedBadges.forEach((badge) => {
        expect(result.current.badges).toHaveProperty(badge);
        expect(typeof result.current.badges[badge]).toBe('boolean');
      });
    });
  });
});
