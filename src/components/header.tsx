import { Command } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-4 py-5 bg-slate-900">
      <Command className="size-6 hover:animate-spin text-white" />

      <nav>
        <ThemeToggle />
      </nav>
    </header>
  )
}
