export default function BaseCardComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`from-primary-gradient to-secondary-gradient border-1 border-white bg-linear-to-r text-white ${className}`}
    >
      {children}
    </div>
  );
}
