import hero from "../assets/hero.png"
import heroDark from "../assets/hero-dark.png"
import { useTheme } from "next-themes"

export default function Hero() {
  const { theme } = useTheme();

  return (
    <div>
        <img 
          src={theme === 'dark' ? heroDark : hero} 
          className='w-full max-h-[600px] object-cover'
          alt="Hero"
        />
    </div>
  )
}
