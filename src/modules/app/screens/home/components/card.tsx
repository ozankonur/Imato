import React from 'react';
import TouchableImage from '../../../../../components/touchableImage';
import {View, Text, PermissionsAndroid, Platform, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../../../../styles/index';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import {getResources} from '../../../../../components/getResources';
import Share from 'react-native-share';

interface Props {
  handleClick;
  downloadUrl: string;
  user: string;
  setDownloadStatus;
}

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const downloadImage = async (downloadUrl, setDownloadStatus) => {
  setDownloadStatus({
    loading: true,
    finished: false,
    started: true,
    success: false,
    errorMessage: '',
  });
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png',
  })
    .fetch('GET', downloadUrl)
    .then(async (res) => {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(res.data)
        .then((res) => {
          setDownloadStatus({
            loading: false,
            finished: true,
            started: true,
            success: true,
            errorMessage: '',
          });

          setTimeout(() => {
            setDownloadStatus({
              loading: false,
              finished: true,
              started: false,
              success: true,
              errorMessage: '',
            });
          }, 2000);
        })
        .catch((err) => {
          setDownloadStatus({
            loading: false,
            finished: true,
            started: true,
            success: false,
            errorMessage: err,
          });
          setTimeout(() => {
            setDownloadStatus({
              loading: false,
              finished: true,
              started: false,
              success: false,
              errorMessage: err,
            });
          }, 3000);
        });
    })
    .catch((error) =>{
        setDownloadStatus({
            loading: false,
            finished: true,
            started: true,
            success: false,
            errorMessage: error,
          });
          setTimeout(() => {
            setDownloadStatus({
              loading: false,
              finished: true,
              started: false,
              success: false,
              errorMessage: error,
            });
          }, 3000);
    });
};

const shareSingleImage = async (downloadUrl) => {
    const shareOptions = {
      title: 'Share file',
      url: downloadUrl,
      failOnCancel: false,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

const Card: React.FunctionComponent<Props> = ({
  handleClick,
  downloadUrl,
  user,
  setDownloadStatus,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableImage
            handleClick={handleClick}
            downloadUrl={downloadUrl}
          />
        </View>
        </View>
        <View style={styles.operationsContainer}>
          <Text style={styles.user}>{user}</Text>
          <TouchableOpacity
            style={styles.download}
            onPress={() => downloadImage(downloadUrl, setDownloadStatus)}>
            <Image
              style={styles.cardOperations}
              source={getResources('download')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.download}
            onPress={() => shareSingleImage(downloadUrl)}>
            <Image
              style={styles.cardOperations}
              source={getResources('share')}></Image>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Card;
