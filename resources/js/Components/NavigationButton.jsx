import { Button } from '@/Components/ui/button';
import { useNavigationButtonContext } from '@/hooks/Contexts/NavigationButtonContext';
import { router } from '@inertiajs/react';


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
                Previous
            </Button>
            <span>Page {currentPage} of {lastPage}</span>
            <Button 
                variant="outline"
                size="sm"
                disabled={!nextPageUrl}
                onClick={() => gotoPage(nextPageUrl)}
            >
                Next
            </Button>        
        </>
    );
};

export default NavigationButton;