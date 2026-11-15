import { useEffect, useState } from 'react';

/**
 * Reports which of the given section ids is currently the one being read.
 * A section counts as current once its top has passed the header line.
 */
export function useScrollSpy(ids: string[], offset = 96): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      let current: string | null = null;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      // The last section can be too short to ever reach the header line.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setActive(atBottom ? (ids.at(-1) ?? current) : current);
    };

    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [ids, offset]);

  return active;
}
