import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='border-b-2 border-b-orange-500 py-6'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link
             to='/'
             className='text-3xl font-bold tracking-tight text-orange-500'
             >
                QuickBite
            </Link>
            <div className='flex items-center gap-4'>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <div className='md:hidden'>
                    <MobileNav />
                </div>
                <div className='hidden md:block'>
                    <MainNav />
                </div>
            </div>
        </div>
    </div>
  )
}
