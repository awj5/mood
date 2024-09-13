import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

// Hack! - useWindowDimensions doesn't return correct dimensions when rotating iPad so

const useDeviceDimensions = () => {
  const { height, width } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ width: width, height: height });
  const initWidth = width;
  const initHeight = height;
  const initOrientation = width > height ? "landscape" : "portrait";

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      if (
        (initOrientation === "portrait" && e.orientationInfo.orientation === 3) ||
        (initOrientation === "portrait" && e.orientationInfo.orientation === 4) ||
        (initOrientation === "landscape" && e.orientationInfo.orientation !== 3 && e.orientationInfo.orientation !== 4)
      ) {
        setDimensions({ width: initHeight, height: initWidth });
      } else {
        setDimensions({ width: initWidth, height: initHeight });
      }
    });

    return () => ScreenOrientation.removeOrientationChangeListener(subscription); // Clean up
  }, []);

  return dimensions;
};

export default useDeviceDimensions;
