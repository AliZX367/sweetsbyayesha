type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const style = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;
  return (
    <div className={`fade-in${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}
