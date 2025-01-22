/* eslint-disable @typescript-eslint/no-explicit-any */
export function groupByKeys<T>(
  array: T[],
  unique = true
): Record<keyof T, any[]> {
  return array.reduce(
    (acc, item) => {
      for (const key in item) {
        if (!acc[key]) {
          acc[key] = [];
        }

        if (unique && acc[key].includes(item[key])) {
          continue;
        }

        acc[key].push(item[key]);
      }
      return acc;
    },
    {} as Record<keyof T, any[]>
  );
}
