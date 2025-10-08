export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold">404 - Page Not Found</h1>
      <p className="text-slate-600 dark:text-slate-300">The page you are looking for does not exist.</p>
    </div>
  )
}
