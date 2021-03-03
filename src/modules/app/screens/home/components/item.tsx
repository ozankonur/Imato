import React from 'react';
import Card from './card';

interface Props {
  handleClick
  downloadUrl: string
  user: string
  setDownloadStatus
}

const Item: React.FunctionComponent<Props> = ({handleClick, downloadUrl, user, setDownloadStatus}) => {
  return (
    <Card handleClick={handleClick} downloadUrl={downloadUrl} user={user} setDownloadStatus={setDownloadStatus}/>
  );
};

export default Item;
