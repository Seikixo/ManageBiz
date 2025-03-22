import { Button } from '@/Components/ui/button';
import { useNavigationButtonContext } from '@/hooks/Contexts/NavigationButtonContext';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const gotoPage = (url) => {
    if(url) {
        router.get(url);
    }
};

const NavigationButton = () => {
    const {prevPageUrl, nextPageUrl, currentPage, lastPage} = useNavigationButtonContext();

    return(
        <>
            <Button 
                variant="outline"
                size="sm"
                disabled={!prevPageUrl}
                onClick={() => gotoPage(prevPageUrl)}
            >
                <ChevronLeft/>
                Prev             
            </Button>
            <span>Page {currentPage} of {lastPage}</span>
            <Button 
                variant="outline"
                size="sm"
                disabled={!nextPageUrl}
                onClick={() => gotoPage(nextPageUrl)}
            >             
                Next
                <ChevronRight/>
            </Button>        
        </>
    );
};

export default NavigationButton;