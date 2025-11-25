export function Card({ className = "", children }) {
  return (
    <div className={`border rounded-xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children }) {
  return <div className="border-b p-4">{children}</div>
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>
}
