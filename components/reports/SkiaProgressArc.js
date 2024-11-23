import React, { useState } from "react";
import { Canvas, Path, Skia, Circle } from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../assets/colors";
import { useSharedValue } from 'react-native-reanimated';
import { useValue } from '@shopify/react-native-skia';


export default SkiaProgressArc = () => {
  /*Back ground Arc */
  const width = 350;
  const height = 300;
  const [value, setValue] = useState(0); // Dynamic value to adjust position
  const strokeWidth = 15;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 40;
  const startAngle = Math.PI;
  const endAngle = Math.PI * 2;

  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;

  const backgroundPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(backgroundPath);


  /*Progress Indicator */
  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);

  const previousCx = useSharedValue(x2);
  const previousCy = useSharedValue(y2);

  const skiaCx = useSharedValue(x2);
  const skiaCy = useSharedValue(y2);

   

  if (!backgroundPath) {
    return <View />;
  }

  return (
    
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path
          path={skiaBackgroundPath}
          strokeWidth={strokeWidth}
          strokeCap="round"
          color={Colors.lightGrey}
          style="stroke"
        />
        <Circle 
          r={15} cx={skiaCx} cy={skiaCy} color="green"
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        borderWidth: 1,
    height: 200,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    flex: 1,
    alignSelf: 'center',
    width: "100%",
    height: "100%",
  },
});
