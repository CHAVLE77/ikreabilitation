export default function BackgroundDecor({ rings = false, dots = true }) {
  return (
    <div className="bg-decor" aria-hidden="true">
      <span className="bg-orb bg-orb--gold" />
      <span className="bg-orb bg-orb--navy" />
      {rings && <span className="bg-rings" />}
      {dots && <span className="bg-dots" />}
    </div>
  );
}