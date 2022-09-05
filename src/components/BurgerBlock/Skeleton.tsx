import React from 'react';
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => {
    return (
        <ContentLoader
            className="burger-block"
            speed={2}
            width={280}
            height={433}
            viewBox="0 0 280 433"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="10" rx="30" ry="30" width="280" height="205" />
            <rect x="0" y="235" rx="10" ry="10" width="280" height="27" />
            <rect x="0" y="280" rx="10" ry="10" width="280" height="88" />
            <rect x="0" y="395" rx="10" ry="10" width="92" height="33" />
            <rect x="170" y="385" rx="30" ry="30" width="110" height="48" />
        </ContentLoader>
    );
};

export default Skeleton;