import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/index';
import FastImage from 'react-native-fast-image'

interface Props {
  handleClick
  downloadUrl: string
}

const TouchableImage: React.FunctionComponent<Props> = ({handleClick, downloadUrl}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => handleClick(downloadUrl)}>
       <FastImage
        style={styles.image}
        source={{
            uri: downloadUrl,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
    </TouchableOpacity>
  );
};
export default TouchableImage;