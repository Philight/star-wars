export const fetchAllPages = async (url) => {
  const firstRes = await fetch(url);

  const { count, results } = await firstRes.json();

  if (count === 0) {
    return [];
  }

  const pageLength = results.length;

  const pages = [
    // first page
    results,
    ...(await Promise.all(
      [
        // -1 because first page already fetched
        ...new Array(Math.ceil(count / pageLength) - 1).keys()
      ].map(async (n) => {
        // +1 because zero-indexed
        // +1 because first page already fetched
        const page = n + 2;

        const res = await fetch(`${url}?page=${page}`);

        return (await res.json()).results;
      })
    ))
  ];

  return pages.flat();
};
