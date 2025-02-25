import { useCallback, useState } from 'react';
import { produce, Draft, freeze } from 'immer';
import _ from 'lodash';
/**
 * 1. 函数签名编写，会将函数传入什么参数，返回什么数据 描述清楚
 * @param initialVal 可以是一个具体的数据, 也可以是一个 拉姆达函数返回值是一个 具体数据
 * @returns useImmer 返回值是一个被管理的数据状态, 以及修改数据的方法,只是修改数据的方法被劫持了
 * 参数的类型直接描述即可,但是返回值的类型需要我们自己定义好
 */

// 定义返回值的类型
export type DraftFunction<S> = (draft: Draft<S>) => void;

export type Updater<S> = (arg: S | DraftFunction<S>) => void;

export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = unknown>(initialVal: S | (() => S)): ImmerHook<S>;

/**
 * 2. 函数实现必须紧跟 函数签名编写，不然函数签名会有报错
 */
export function useImmer<T>(initialVal: T) {
  /**
   * 2.1 内部使用的依旧是 useState
   * 需要根据 传入参数的类型执行对应的逻辑,
   * 如果传入的是一个函数,则执行函数以其返回值,作为数据初始值
   * 如果传入的是一个具体数据, 则直接将该数据作为数据初始值
   * 注意初始化的数据是需要被冻结的
   */
  const [val, updateVal] = useState(() => {
    return freeze(typeof initialVal === 'function' ? initialVal() : initialVal, true);
  });

  return [
    val,
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === 'function') {
        updateVal((oldVal: T) => {
          const newVal = produce<T>(updater as DraftFunction<T>)(oldVal);
          return _.isEqual(oldVal, newVal) ? oldVal : newVal;
        });
      } else {
        const newVal = freeze(updater);
        updateVal((oldVal: T) => {
          return _.isEqual(oldVal, newVal) ? oldVal : newVal;
        });
      }
    }, []),
  ];
}
