type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return <span className="inline-flex rounded-full px-2 py-1 border text-xs">{label}</span>;
}
