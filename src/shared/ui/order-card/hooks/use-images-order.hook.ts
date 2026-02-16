import { useState, useMemo } from 'react';

export type TOrderCardImageItem = {
  src: string;
  index: number;
  slideIn: boolean;
  showOverlay: boolean;
  restCount: number;
};

type TUseOrderCardImagesResult = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  isExpanded: boolean;
  items: TOrderCardImageItem[];
};

export function useImagesOrderHook(srcs: string[], max = 6): TUseOrderCardImagesResult {
  const [expanded, setExpanded] = useState(false);

  return useMemo(() => {
    const hasMore = !expanded && srcs.length > max;
    const visible = hasMore ? srcs.slice(0, max) : srcs;

    const rest = hasMore ? srcs.length - max : 0;
    const len = visible.length;

    const items: TOrderCardImageItem[] = visible.map((src, i) => ({
      src,
      index: i,
      slideIn: expanded && i >= max,
      showOverlay: hasMore && i === len - 1,
      restCount: rest,
    }));

    return {
      expanded,
      setExpanded,
      isExpanded: expanded,
      items,
    };
  }, [expanded, srcs, max]);
}
