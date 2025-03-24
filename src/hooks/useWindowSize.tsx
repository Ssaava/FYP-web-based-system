import { useState , useEffect} from "react";

// Window size hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Call once to set initial size

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize