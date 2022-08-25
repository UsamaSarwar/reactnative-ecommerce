//React
import React, { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";

//Providers
import { useGlobal } from "../../providers/GlobalProvider";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Items
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import UniversalStyles from "../../styles/UniversalStyles";

export default function CarouselBanner() {
  const { carouselData } = useGlobal();
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={1000}
      key={"Carousal" + "View"}
    >
      <Carousel
        key={"Carousal" + "Main"}
        layout="tinder"
        layoutCardOffset={1}
        ref={isCarousel}
        data={carouselData}
        loop={true}
        autoplay={true}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        lockScrollWhileSnapping={true}
        enableMomentum={false}
        autoplayInterval={6000}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        containerStyle={UniversalStyles.pagination_container}
        dotsLength={carouselData.length}
        activeDotIndex={index}
        key={"Carousal" + "Pagination"}
        carouselRef={isCarousel}
        dotStyle={UniversalStyles.pagination_dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </Animatable.View>
  );
}
