"use client";

const labels = {
  username: "Username",
  bio: "Bio",
  skills: "Skills",
};

export default function ProfileForm({ form, setForm, onSubmit }) {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      {["username", "bio", "skills"].map((field) => (
        <div key={field}>
          <label>{labels[field]}</label>
          {field === "bio" ? (
            <textarea
              name={field}
              placeholder={labels[field]}
              value={form[field]}
              onChange={handleChange}
            />
          ) : (
            <input
              name={field}
              placeholder={labels[field]}
              value={form[field]}
              onChange={handleChange}
              required={field === "username"}
            />
          )}
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
