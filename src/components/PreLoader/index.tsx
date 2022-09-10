import React from "react";
import classes from './PreLoader.module.scss';

const PreLoader: React.FC = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.spinner}></div>
        </div>
    );
}

export default PreLoader;