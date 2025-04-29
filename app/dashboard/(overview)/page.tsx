import { SecondaryFont } from "@/app/ui/font";
import CardWrapper from "@/app/dashboard/cards";
import LatestInvoices from "@/app/dashboard/latest-invoices";
import RevenueChart from "@/app/dashboard/revenue-chart";
import { Suspense } from "react";
import {
  CardSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";

async function Page() {
  return (
    <main>
      <h1 className={`${SecondaryFont.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense
          fallback={
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          }
        >
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />{" "}
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}

export default Page;
