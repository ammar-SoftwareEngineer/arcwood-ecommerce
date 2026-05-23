import { getPathname } from "@/i18n/navigation";

type ShareProductOptions = {
  locale: string;
  href: `/products/${string}`;
  title: string;
  onCopied: () => void;
  onFailed: () => void;
};

export async function shareProduct({
  locale,
  href,
  title,
  onCopied,
  onFailed,
}: ShareProductOptions) {
  const url = `${window.location.origin}${getPathname({ locale, href })}`;

  try {
    if (typeof navigator.share === "function") {
      await navigator.share({ title, text: title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    onCopied();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return;
    onFailed();
  }
}
