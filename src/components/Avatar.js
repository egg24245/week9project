export default function Avatar({ username }) {
  if (!username) return null;

  const firstLetter = username[0].toUpperCase();

  return (
    <div className="avatar" aria-label={`Avatar for ${username}`}>
      {firstLetter}
    </div>
  );
}
