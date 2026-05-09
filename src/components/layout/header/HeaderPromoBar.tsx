
type HeaderPromoBarProps = {
  promoText: string;
  topBarClass: string;
};

export default function HeaderPromoBar({ promoText, topBarClass }: HeaderPromoBarProps) {

  return (
    <div className={`border-b ${topBarClass}`}>
      <div className="w-full overflow-hidden px-6 py-3 text-sm font-bold">
        <div className="flex w-full items-center justify-center gap-12 whitespace-nowrap animate-[headerMarquee_18s_linear_infinite]">
          <p className="tracking-wide">{promoText}</p>
          <p className="tracking-wide" aria-hidden="true">
            {promoText}
          </p>
        </div>
      </div>
    </div>
  );
}
