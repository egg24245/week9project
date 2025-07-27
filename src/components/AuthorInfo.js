import Avatar from "./Avatar";

export default function AuthorInfo({ user }) {
  if (!user) return null;

  return (
    <div className="author-info">
      <Avatar username={user.username} />
      <span className="author-name">{user.username}</span>
    </div>
  );
}
