import * as React from "react"

export function Button({ className = "", ...props }) {
  return (
    <button
      className={`bg-gray-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 ${className}`}
      {...props}
    />
  )
}
