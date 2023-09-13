import React from 'react';
import BtnActions from './BtnActions';

export default function BtnTable({ action, to, onclick, title }) {
  return (
      <BtnActions action={action} to={to} onclick={onclick} title={title}/>
  );
}
