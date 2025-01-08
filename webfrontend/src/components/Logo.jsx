/*export default function TractorIcon({ size=24 }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-2.075 0-3.537-1.463T1 15t1.463-3.537T6 10t3.538 1.463T11 15t-1.463 3.538T6 20m0-3.5q-.625 0-1.062-.437T4.5 15t.438-1.062T6 13.5t1.063.438T7.5 15t-.437 1.063T6 16.5M19.5 20q-1.45 0-2.475-1.025T16 16.5t1.025-2.475T19.5 13t2.475 1.025T23 16.5t-1.025 2.475T19.5 20M7 7q.825 0 1.413.588T9 9H3V7zM6 18q1.25 0 2.125-.875T9 15t-.875-2.125T6 12t-2.125.875T3 15t.875 2.125T6 18m13.5 0q.625 0 1.063-.437T21 16.5t-.437-1.062T19.5 15t-1.062.438T18 16.5t.438 1.063T19.5 18m-7.6-2h3.15q.25-1.8 1.562-2.875t2.963-1.075q.625 0 1.238.175T22 12.75V6h-8.3l-1.05-1.1l1.4-1.4l-.7-.7L9.8 6.35l.75.7l1.4-1.4L13 6.7V9q0 .825-.587 1.413T11 11h-.55q.75.825 1.138 1.85t.387 2.15q0 .25-.013.5t-.062.5"></path></svg>
}*/

import React from 'react';
import logoImage from '../assets/Tara-Logo-FINAL-taglinegold.png'; // Logo Path

export default function Logo({ width = 200, height = 150 }) {
    return (
        <img 
            src={logoImage} 
            alt="Tara McCool Leadership" 
            width={width} 
            height={height} 
            style={{ display: 'inline-block' }} 
        />
    );
}
