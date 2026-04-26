type HeaderPromoBarProps = {
  text: string;
  topBarClass: string;
};

export default function HeaderPromoBar({ text, topBarClass }: HeaderPromoBarProps) {
  return (
    <div className={`border-b backdrop-blur ${topBarClass}`}>
      <div className="w-full overflow-hidden px-6 py-3 text-xs">
        <div className="flex w-full items-center justify-center gap-12 whitespace-nowrap animate-[headerMarquee_18s_linear_infinite]">
          <p className="tracking-wide">{text}</p>
          <p className="tracking-wide" aria-hidden="true">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
