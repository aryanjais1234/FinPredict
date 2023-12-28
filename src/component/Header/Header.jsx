import React from 'react';
import { ReactComponent as AbcLogo } from '../images/abclogo.svg';
import hrclogo from '../images/hrclogo.svg'
import './Header.css'
export default function Header() {
  return (
    <div>
    <AbcLogo className='logo'/>
    <img src={hrclogo}  alt="" />
    </div>
    )
}
