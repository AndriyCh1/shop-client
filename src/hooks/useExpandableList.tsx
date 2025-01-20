import { useState } from 'react';

interface UseExpandableListParams<T> {
  items: T[];
  /**
   * Initial number of visible items
   */
  initial: number;

  /*
   * Maximum number of visible items
   */
  maximum: number;

  perExpand: number;
}

/**
 *  Allows a list of items to be expanded and collapsed, controls items visibility
 *  and if the list is expandable.
 */
export const useExpandableList = <T,>(options: UseExpandableListParams<T>) => {
  const { initial, maximum, perExpand, items } = options;
  const [visibleCount, setVisibleCount] = useState(initial);
  const visibleItems = items.slice(0, Math.min(visibleCount, items.length));

  const expand = () => {
    setVisibleCount((prev) => Math.min(prev + perExpand, maximum));
  };

  const collapse = () => {
    setVisibleCount(initial);
  };

  const expandable = visibleCount < items.length && visibleCount < maximum;
  const expanded = visibleCount > initial;

  return { items: visibleItems, expand, collapse, expandable, expanded };
};
