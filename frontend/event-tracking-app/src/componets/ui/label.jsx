export function Label({ className = "", children, ...props }) {
  return (
    <label className={`block mb-1 font-medium ${className}`} {...props}>
      {children}
    </label>
  )
}
