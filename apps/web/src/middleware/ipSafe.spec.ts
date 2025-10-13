import { ipSafe } from './ipSafe';
import ipaddr from 'ipaddr.js';

const badIps = [
  '127.0.0.1', // IPv4 loopback
  '::1', // IPv6 loopback
  '10.0.0.1', // 10.0.0.0/8 private IP
  '172.16.0.13', // 172.16.0.0/12 private IP
  '192.168.15.15', // 192.168.0.0/16 private IP
  '169.254.169.254', // AWS metadata endpoint
  '0.0.0.0', // IPv4 unspecified address
  '1.2.3.0/24', // IPv4 network CIDR (won't pass string-based IP checks)
  '::ffff:192.0.2.128', // IPv6 mapped address pointing to IPv4 private address
  '::ffff:172.16.0.0', // ditto
  '::ffff:10.0.0.0', // ditto
  '::ffff:169.254.169.254', // ditto, but pointing at AWS metadata address
  '::ffff:127.0.0.1', // ditto, but pointing at localhost
  '::ffff:c0a8:8b32', // mapped IP address in hex format (192.168.139.50)
  'fe80::c800:eff:fe74:8', // IPv6 link-local address
  'fd6d:8d64:af0c::', // IPv6 unique local address
  'nonsense', // nonsense IP
];

jest.mock('ipaddr.js', () => ({
  parse: jest.fn(),
  IPv4: {
    subnetMaskFromPrefixLength: jest.fn(() => ({
      match: jest.fn(() => true),
    })),
  },
  IPv6: {
    subnetMaskFromPrefixLength: jest.fn(() => ({
      match: jest.fn(() => true),
    })),
  },
}));
describe('IP Safe Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  badIps.forEach((badIp) => {
    test(`returns false for unsafe IP: ${badIp}`, () => {
      expect(ipSafe(badIp)).toBe(false);
    });
  });

  test('returns false for invalid IP address', () => {
    (ipaddr.parse as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid IP');
    });

    expect(ipSafe('invalid-ip')).toBe(false);
  });

  test('returns false for unsafe IPv4 address', () => {
    const mockIPv4 = {
      kind: () => 'ipv4',
      range: () => 'private',
      toString: () => '127.0.0.1',
      match: () => true,
    };
    (ipaddr.parse as jest.Mock).mockReturnValueOnce(mockIPv4);

    expect(ipSafe('127.0.0.1')).toBe(false);
  });

  test('returns true for safe IPv4 address', () => {
    const mockIPv4 = {
      kind: () => 'ipv4',
      range: () => 'unicast',
      toString: () => '8.8.8.8',
      match: () => true,
    };
    (ipaddr.parse as jest.Mock).mockReturnValueOnce(mockIPv4);

    expect(ipSafe('8.8.8.8')).toBe(true);
  });

  test('returns false for unsafe IPv6 address', () => {
    const mockIPv6 = {
      kind: () => 'ipv6',
      range: () => 'loopback',
      isIPv4MappedAddress: () => false,
      match: () => true,
    };
    (ipaddr.parse as jest.Mock).mockReturnValueOnce(mockIPv6);

    expect(ipSafe('::1')).toBe(false);
  });

  test('returns true for safe IPv6 address', () => {
    const mockIPv6 = {
      kind: () => 'ipv6',
      range: () => 'unicast',
      isIPv4MappedAddress: () => false,
      match: () => true,
    };
    (ipaddr.parse as jest.Mock).mockReturnValueOnce(mockIPv6);

    expect(ipSafe('2001:4860:4860::8888')).toBe(true);
  });

  test('returns true for safe IPv6 mapped IPv4 address', () => {
    const mockIPv6 = {
      kind: () => 'ipv6',
      range: () => 'unicast',
      isIPv4MappedAddress: () => true,
      toIPv4Address: () => ({
        kind: () => 'ipv4',
        range: () => 'unicast',
        match: () => true,
      }),
    };
    (ipaddr.parse as jest.Mock).mockReturnValueOnce(mockIPv6);

    expect(ipSafe('::ffff:8.8.8.8')).toBe(true);
  });
});
