/**
 * 1. 函数签名编写，会将函数传入什么参数，返回什么数据 描述清楚
 */
export function useImmer<S = unknown>(initialVal: S | (() => S)): any;

/**
 * 2. 函数实现必须紧跟 函数签名编写，不然函数签名会有报错
 */
export function useImmer<T>(initialVal: T) {}