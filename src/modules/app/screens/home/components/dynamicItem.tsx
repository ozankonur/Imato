import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from '../style/style';

interface Props {
  handleClick;
  randomImageUrl: string;
}

const DynamicItem: React.FunctionComponent<Props> = ({
  randomImageUrl,
  handleClick,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={1} onPress={() => handleClick(randomImageUrl)}>
       <Image
        style={styles.image}
        source={{
            uri: randomImageUrl,
        }}
    />
    </TouchableOpacity>
    </View>
  );
};
export default DynamicItem;
