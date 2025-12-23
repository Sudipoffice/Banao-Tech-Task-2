// components/Button.jsx
export default function Button({ children, ...props }) {
    return (
      <button
        className="px-4 py-2 bg-black text-white rounded cursor-pointer disabled:opacity-50"
        {...props}
      >
        {children}
      </button>
    );
  }