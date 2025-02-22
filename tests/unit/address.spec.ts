import { formatContractAddress } from '../../src/utils/format'
describe('formatContractAddress', () => {
  // 测试有效地址
  it('should format a valid address with uppercase to lowercase', () => {
    const input = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const expected = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    expect(formatContractAddress(input)).toBe(expected);
  });

  it('should format a valid address without "0x" prefix', () => {
    const input = 'a0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const expected = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    expect(formatContractAddress(input)).toBe(expected);
  });

  it('should handle an already lowercase valid address', () => {
    const input = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const expected = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    expect(formatContractAddress(input)).toBe(expected);
  });

  it('should trim spaces and format a valid address', () => {
    const input = '  0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48  ';
    const expected = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    expect(formatContractAddress(input)).toBe(expected);
  });

  // 测试无效地址
  it('should return null for an address with invalid length (too short)', () => {
    const input = '0xA0b86991c6218b36c1d19D4a2e9Eb0c';
    expect(formatContractAddress(input)).toBeNull();
  });

  it('should return null for an address with invalid length (too long)', () => {
    const input = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48123';
    expect(formatContractAddress(input)).toBeNull();
  });

  it('should return null for an address with invalid characters', () => {
    const input = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB4g';
    expect(formatContractAddress(input)).toBeNull();
  });

  it('should return null for an empty string', () => {
    const input = '';
    expect(formatContractAddress(input)).toBeNull();
  });

  it('should return null for a string with only spaces', () => {
    const input = '   ';
    expect(formatContractAddress(input)).toBeNull();
  });

  it('should return null for a non-hex address with correct length', () => {
    const input = '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    expect(formatContractAddress(input)).toBeNull();
  });
});