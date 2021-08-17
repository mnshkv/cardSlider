import React, { useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';

const { width } = Dimensions.get('window')

const cardWidth = width - 120

const colors = ['red', 'green', 'blue', 'red', 'green', 'blue']

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        renderItem={() => {
          return <CardScroller />
        }}
      />
    </View>
  );
}

const CardScroller = () => {
  const value = useRef(new Animated.Value(0)).current

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      style={{ transform: [{ scaleX: -1 }], marginTop: 20 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: value } } }], { useNativeDriver: true })}
      showsHorizontalScrollIndicator={false}
    >
      {colors.map((item, index) => {
        const scale = value.interpolate({
          inputRange: [width * (index - 1), width * (index), width * (index + 1)],
          outputRange: [0.9, 1, 1]
        })

        const opacity = value.interpolate({
          inputRange: [width * (index - 3), width * (index - 2), width * (index - 1), width * (index), width * (index + 1)],
          outputRange: [0, 0.6, 0.8, 1, 0]
        })


        const translateX = value.interpolate({
          inputRange: [width * (index - 3), width * (index - 2), width * (index - 1), width * (index), width * (index + 1)],
          outputRange: [(width * 4), (width * 2) + 120, width + 10, 0, 0]
        })

        return (
          <View style={{ width, alignItems: 'center', zIndex: colors.length - index, transform: [{ scaleX: -1 }] }}>
            <Animated.View style={{
              width: cardWidth,
              backgroundColor: item,
              height: 450,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale }, { translateX }],
              opacity,
              zIndex: colors.length - index,
              borderRadius: 20
            }}>
              <Text>item: {item} zIndex: {colors.length - index}, index: {index}</Text>
            </Animated.View>
          </View>
        )
      })}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  }
});
