import { useEffect, type RefObject } from 'react';

type TUseActiveTabTrackingParams = {
  containerRef: RefObject<HTMLDivElement | null>;
  headersRef: RefObject<Map<string, HTMLHeadingElement>>;
  activeTab: string | null;
  onTabChange: (label: string) => void;
  isEnabled?: boolean;
};

export const useActiveTab = ({
  containerRef,
  headersRef,
  activeTab,
  onTabChange,
  isEnabled = true,
}: TUseActiveTabTrackingParams): void => {
  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;
    const headers = headersRef.current;

    if (!headers || headers.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeaders = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return aTop - bTop;
          });

        if (visibleHeaders.length > 0) {
          const topHeader = visibleHeaders[0];
          const label = (topHeader.target as HTMLElement).dataset.label;

          if (label && label !== activeTab) {
            onTabChange(label);
          }
        }
      },
      {
        root: container,
        rootMargin: '-1px 0px 0px 0px',
        threshold: 0,
      }
    );

    headers.forEach((header) => {
      observer.observe(header);
    });

    return () => {
      observer.disconnect();
    };
  }, [containerRef, headersRef, activeTab, onTabChange, isEnabled]);
};
