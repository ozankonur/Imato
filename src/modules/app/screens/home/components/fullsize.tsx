import React from 'react';
import {Modal} from "react-native"
import ImageViewer from 'react-native-image-zoom-viewer';
const FullSizeImage = (props) => {
    return (
      <Modal visible={true} transparent={true}>
         <ImageViewer 
         imageUrls={[{"url":props.downloadUrl}]}
         renderIndicator={() => <></>}
         enableImageZoom
         enableSwipeDown
         onCancel={props.closeImage}
         saveToLocalByLongPress={false}
         />
      </Modal>
    );
  };

  export default FullSizeImage