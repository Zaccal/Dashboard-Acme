import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../lib/data";
import { SecondaryFont } from "../ui/font";
import { Card } from "./cards";
import LatestInvoices from "./latest-invoices";
import RevenueChart from "./revenue-chart";

type Props = {};

async function Page({}: Props) {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${SecondaryFont.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" type="collected" value={totalPaidInvoices} />
        <Card title="Pending" type="pending" value={totalPendingInvoices} />
        <Card title="Total Invoices" type="pending" value={numberOfInvoices} />
        <Card
          title="Total customers"
          type="customers"
          value={numberOfCustomers}
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
        <RevenueChart revenue={revenue} />{" "}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}

export default Page;
