export const formatContractAddress = (address: string): string | null => {
  // 去除地址两边的空格
  address = address.trim();

  // 检查地址是否以 '0x' 开头
  if (!address.startsWith('0x')) {
    address = '0x' + address;
  }

  // 检查地址是否是 42 个字符，'0x' + 40 个十六进制字符
  if (address.length !== 42 || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return null; // 返回 null 表示地址格式不正确
  }

  return address.toLowerCase(); // 统一转为小写字母，通常以太坊地址是小写
};
