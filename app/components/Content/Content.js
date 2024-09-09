'use client'

import React from 'react';
import parse from 'html-react-parser';

const Content = ({content}) => {
    return (
        <div>
            {parse(content)}
        </div>
    )
}
     
export default Content;