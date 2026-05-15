
type HeaderPromoBarProps = {
  promoText: string;
  topBarClass: string;
};

const PromoRepeat = 2;

function PromoItems({ text }: { text: string }) {
  return Array.from({ length: PromoRepeat }, (_, index) => (
    <p key={index} className="header-promo-item">
      {text}
    </p>
  ));
}

export default function HeaderPromoBar({ promoText, topBarClass }: HeaderPromoBarProps) {
  return (
    <div className={`border-b ${topBarClass}`}>
      <div className="header-promo-viewport">
        <div className="header-promo-rail">
          <div className="header-promo-set">
            <PromoItems text={promoText} />
          </div>
          <div className="header-promo-set" aria-hidden="true">
            <PromoItems text={promoText} />
          </div>
        </div>
      </div>
    </div>
  );
}
