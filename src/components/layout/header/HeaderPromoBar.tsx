
type HeaderPromoBarProps = {
  promoText: string;
  topBarClass: string;
};



const PromosRepeat = 2;

export default function HeaderPromoBar({
  promoText,
  topBarClass,
}: HeaderPromoBarProps) {
  const items = Array(PromosRepeat).fill(promoText);

  return (
    <div className={`border-b ${topBarClass}`}>
      <div className="header-promo-viewport">
        <div className="header-promo-rail">
          <div className="header-promo-rail">
            {Array.from({ length: PromosRepeat }).map((_, index) => (
              <div
                key={index}
                className="header-promo-set"
                aria-hidden={index > 0}
              >
                <p className="header-promo-item">{promoText}</p>
                <p className="header-promo-item">{promoText}</p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
