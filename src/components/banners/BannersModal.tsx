import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modalize} from 'react-native-modalize';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

interface Banner {
  img: string;
  capition: string;
  html_desc: string;
  link: string;
  link_text: string;
  banner_date: Date;
  _id: string;
}

type Props = {
  banner: Banner | undefined;
};

const BannersModal: React.FC<Props> = ({banner}, ref) => {
  const insets = useSafeAreaInsets();

  return (
    <Modalize
      modalTopOffset={insets.top + 100}
      ref={ref}
      modalStyle={styles.modalStyle}
      handlePosition={'inside'}>
      {banner && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: 0.9034 * width,
              height: 0.145 * height,
              marginTop: 0.04 * height,
              marginLeft: 0.0483 * width,
              marginRight: 0.0483 * width,
            }}>
            <FastImage
              source={{
                uri: `${banner.img}`,
              }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.caption}>
            {banner.capition ? banner.capition : ''}
          </Text>
          <View style={styles.descriptionContainer}>
            <RenderHTML
              source={{html: banner.html_desc}}
              contentWidth={width * 0.9}
              baseStyle={renderHtmlBaseStyle}
              tagsStyles={renderHtmlTagsStyles}
              enableExperimentalBRCollapsing
            />
          </View>
          {banner.link.length !== 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(banner.link)}>
              <Text style={styles.buttonLabel}>{banner.link_text}</Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              marginTop: 0.15 * height,
            }}></View>
        </ScrollView>
      )}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  caption: {
    paddingLeft: width * 0.05,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
  },

  descriptionContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },

  button: {
    marginBottom: 20,
    marginTop: 20,
  },

  buttonLabel: {
    color: '#0000EE',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default React.forwardRef(BannersModal);

export const renderHtmlTagsStyles = {
  strong: {
    fontWeight: 'normal',
  },
  em: {
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  del: {
    fontWeight: 'normal',
  },
  a: {
    textDecorationLine: 'none',
  },
};

export const renderHtmlBaseStyle = {};
