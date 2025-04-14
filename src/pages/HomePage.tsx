import landingImage from '../assets/landing.png'
import landingDarkImage from '../assets/landing-dark.png'
import appDownloadImage from '../assets/appDownload.png'
import appDownloadDarkImage from '../assets/appDownload-dark.png'
import SearchBar, { SearchForm } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';

export default function HomePage() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className='flex flex-col gap-12'>
            <div className='md:px-32 bg-white dark:bg-gray-900 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
                <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
                    Tuck into a takeaway today
                </h1>
                <span className='text-xl text-gray-900 dark:text-white'>
                    Food is just a click away!
                </span>
                <SearchBar
                    placeHolder="Search by City or Town"
                    onSubmit={handleSearchSubmit}
                />
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
                <img src={theme === 'dark' ? landingDarkImage : landingImage} alt="Landing" />
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <span className='font-bold text-3xl tracking-tighter text-gray-900 dark:text-white'>
                        Order takeaway even faster!
                    </span>
                    <span className='text-gray-900 dark:text-white'>
                        Download the QuickBite App for faster ordering and personalized recommendations
                    </span>
                    <img src={theme === 'dark' ? appDownloadDarkImage : appDownloadImage} alt="App Download" />
                </div>
            </div>
        </div>
    )
}
