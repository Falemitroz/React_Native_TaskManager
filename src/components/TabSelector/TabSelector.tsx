import { Animated, ScrollView, View } from 'react-native';
import { DefaultButton } from '../buttons';
import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../hooks';
import { useFadeAnim } from '../../hooks/animations';

type TabSelectorProps = {
  labels: string[];
  contents: React.ReactNode[];
};

export const TabSelector: React.FC<TabSelectorProps> = ({
  labels,
  contents,
}) => {
  const { colors, typography } = useTheme();
  const { start, fadeAnim, translateY } = useFadeAnim();

  const [activeIndex, setActiveIndex] = useState(0);

  const visibleLabels = useMemo(() => {
    const last = labels.length - 1;
    const prev = activeIndex === 0 ? last : activeIndex - 1;
    const next = activeIndex === last ? 0 : activeIndex + 1;
    return [labels[prev], labels[activeIndex], labels[next]];
  }, [labels, activeIndex]);

  useEffect(() => {
    start();
  }, [contents]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
        {visibleLabels.map(label => {
          const isActive = label === labels[activeIndex];
          return (
            <DefaultButton
              key={label}
              mode="text"
              text={label}
              textColor={
                isActive
                  ? colors.components.button.default
                  : colors.base.surfaceAlt
              }
              textSize={
                isActive ? typography.h3.fontSize : typography.label.fontSize
              }
              onPress={() => setActiveIndex(labels.indexOf(label))}
            />
          );
        })}
      </View>

      {/* Contenuto tab attivo */}
      <ScrollView style={{ flexGrow: 1, marginTop: 10 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          {contents[activeIndex]}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
