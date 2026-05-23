/** Cart shop page — server shell; interactive table is a client component. */
import HeroPages from "@/components/layout/hero/HeroPages";
import { CartTable } from "@/components/cart";

export default function CartPage() {
  return (
    <section>
      <HeroPages />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <CartTable />
      </div>
    </section>
  );
}
