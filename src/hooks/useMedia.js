import { useEffect, useState } from 'react';

const useMedia = (mediaQueryString, { initialMatches = true } = {}) => {
    const [matches, setMatches] = useState(initialMatches);

    useEffect(
        () => {
            const mediaQueryList = window.matchMedia(mediaQueryString);

            setMatches(mediaQueryList.matches);

            const handleChange = e => setMatches(e.matches);
            mediaQueryList.addListener(handleChange);
            return () => mediaQueryList.removeListener(handleChange);
        },
        [mediaQueryString],
    );

    return matches;
}

export default useMedia;