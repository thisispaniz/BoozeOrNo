import React, { useEffect, useRef } from 'react';
import { toSvg } from 'jdenticon';

const Identicon = ({
    email,
    size = 295,
    className = '',
    fallbackSrc = "./avatar-1577909_1280.png"
}) => {
    const svgRef = useRef(null);
    const [showFallback, setShowFallback] = React.useState(false);

    useEffect(() => {
        if (email && svgRef.current && !showFallback) {
            const svgString = toSvg(email, size);
            svgRef.current.innerHTML = svgString;
        }
    }, [email, size, showFallback]);

  // Handle fallback to default image
    const handleUseFallback = () => {
        setShowFallback(true);
    };

  // Handle switching back to identicon
    const handleUseIdenticon = () => {
        setShowFallback(false);
    };

    if (showFallback && fallbackSrc) {
    return (
        <img
            src={fallbackSrc}
            alt="User avatar"
            width={size}
            height={size}
            className={className}
            onClick={handleUseIdenticon} // Optional: click to switch back
            style={{ cursor: 'pointer' }}
        />
        );
    }

    return (
    <div
        ref={svgRef}
        className={className}
        style={{ 
            width: size, 
            height: size,
            cursor: fallbackSrc ? 'pointer' : 'default'
        }}
        onClick={fallbackSrc ? handleUseFallback : undefined} // Optional: click to switch to fallback
        />
    );
    };

export default Identicon;