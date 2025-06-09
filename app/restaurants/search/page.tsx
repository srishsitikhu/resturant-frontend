// app/restaurants/search/page.tsx

import React, { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

const Page = () => {
  return (
    <Suspense fallback={<div className="p-10">Loading search results...</div>}>
      <SearchPageClient />
    </Suspense>
  );
};

export default Page;
