import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, SafeAreaView} from 'react-native';
import api from '../../../../api';
import useToast from '../../../../hooks/useToast';
import useModal from '../../../../hooks/useModal';
import LottieView from 'lottie-react-native';
import FullSizeImage from './components/fullsize';
import styles from './style/style';
import Item from './components/item';
import DynamicItem from './components/dynamicItem';
import NetInfo from '@react-native-community/netinfo';
import Modal from '../../../../components/modal';
import {getResources} from '../../../../components/getResources';
import {downloadStatusModel} from './data/downloadStatus';
export default function App() {
  const notify = useToast();

  const [images, setImages] = useState([]);
  const [randomImageUrl, setRandomImageUrl] = useState({
    path: getResources('placeholder'),
  });
  const [pageNumber, setPage] = useState(1);
  const [limitNumber, setLimit] = useState(5);
  const [dynamicImageLoading, setDynamicImageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState('');
  const [isConnected, setConnection] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState(downloadStatusModel);

  const {
    visible: repeatModalVisible,
    open: openRepeatModal,
    close: closeRepeatModal,
  } = useModal();

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setConnection(false);
        openRepeatModal();
      } else {
        setConnection(true);
        closeRepeatModal();
      }
    });
  }, []);

  useEffect(() => {
    requestDynamicImage();
  }, []);

  useEffect(() => {
    requestImages();
  }, [pageNumber, isConnected]);

  const requestImages = async () => {
    try {
      setImagesLoading(true);
      const response = await api.picsum.getImageList({
        page: pageNumber,
        limit: limitNumber,
      });
      setImages(images.concat(response));
      setImagesLoading(false);
    } catch (err) {
      setImagesLoading(false);
      JSON.stringify(JSON.stringify(err));
      notify('Error', JSON.stringify(err));
    }
  };

  const requestDynamicImage = async () => {
    try {
      setDynamicImageLoading(true);
      const response = await api.picsum.getRandomImage();
      setRandomImageUrl(response);
      setDynamicImageLoading(false);
    } catch (err) {
      setDynamicImageLoading(false);
      notify('Error', JSON.stringify(err));
    }
  };

  const loadMore = () => {
    if (isConnected) {
      setPage(pageNumber + 1);
      setImagesLoading(true);
    } else {
      openRepeatModal();
    }
  };

  const closeImage = () => {
    setFullScreenImageUrl('');
    setShowImageFullScreen(false);
  };

  const handleClick = (url) => {
    if (isConnected) {
      setFullScreenImageUrl(url);
      setShowImageFullScreen(true);
    } else {
      openRepeatModal();
    }
  };

  const renderItem = ({item}) => (
    <Item
      downloadUrl={item.download_url}
      handleClick={handleClick}
      user={item.author}
      setDownloadStatus={setDownloadStatus}
    />
  );

  return (
    <View style={styles.container}>
      {showImageFullScreen && (
        <FullSizeImage
          downloadUrl={fullScreenImageUrl}
          closeImage={closeImage}
        />
      )}
      {dynamicImageLoading && imagesLoading ? (
        <LottieView
          source={require('../../../../assests/loading.json')}
          autoPlay
          loop
          style={{
            width: 150,
          }}
        />
      ) : (
        <View style={styles.container}>
          <Text style={[styles.header, styles.marginTop]}>Imato's special</Text>
          <DynamicItem
            randomImageUrl={randomImageUrl}
            handleClick={handleClick}
          />
          <LottieView
            source={require('../../../../assests/lunar.json')}
            autoPlay
            loop
            style={{
              width: 200,
            }}
          />
          <Text style={[styles.header, styles.marginTop]}>Explore</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{height: 750, marginBottom: 100}}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
          />
          <LottieView
            source={require('../../../../assests/lhrt.json')}
            autoPlay
            loop
            style={{
              width: 200,
            }}
          />
          <Text style={styles.love}>Made with love for Gelato</Text>
        </View>
      )}

      <Modal visible={!!repeatModalVisible} close={closeRepeatModal}>
        <View style={styles.modalContainer}>
          <Text style={[styles.text, styles.marginTop]}>
            No internet connection
          </Text>
          <LottieView
            source={require('../../../../assests/noConnection.json')}
            autoPlay
            loop
            style={{
              height: 100,
              width: 150,
            }}
          />
        </View>
      </Modal>

      <Modal visible={downloadStatus.started} close={closeRepeatModal}>
        {downloadStatus.loading ? (
          <View style={styles.modalContainer}>
            <Text style={[styles.text, styles.marginTop]}>
              Download started
            </Text>
            <LottieView
              source={require('../../../../assests/waiting.json')}
              autoPlay
              loop
              style={{
                height: 100,
                width: 150,
              }}
            />
          </View>
        ) : downloadStatus.success ? (
          <View style={styles.modalContainer}>
            <Text style={[styles.text, styles.marginTop]}>
              Download Success!
            </Text>
            <LottieView
              source={require('../../../../assests/success.json')}
              autoPlay
              loop={false}
              style={{
                height: 100,
              }}
            />
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <Text style={[styles.text, styles.marginTop]}>
              Download failed!
            </Text>
            <LottieView
              source={require('../../../../assests/error.json')}
              autoPlay
              loop={false}
              style={{
                marginTop: 10,
                height: 75,
              }}
            />
          </View>
        )}
      </Modal>
    </View>
  );
}
