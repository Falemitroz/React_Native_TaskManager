import React from 'react';
import { Animated, Text, View } from 'react-native';
import { createStyles } from './WeekScreen.styles';
import { ScreenWrapper } from '../Layout';
import { CircularProgress } from '../../components';
import { BaseCard, WeekTaskCard } from '../../components/cards';
import { useSlideIn } from '../../hooks/animations';
import { getWeekTasks, MONTHS } from '../../utils/date';

export default function WeekScreen() {
  const styles = createStyles();

  return (
    <ScreenWrapper screenName="Weekly Tasks">
      {getWeekTasks().map((day, index) => {
        const { translateY, scale } = useSlideIn(500, 200, index * 100);

        const completed = day.tasks.filter(t => t.checked).length;
        const total = day.tasks.length;

        return (
          <Animated.View
            key={index}
            style={{
              transform: [{ translateY }, { scale }],
            }}
          >
            <BaseCard key={day.dayName}>
              <Text style={styles.title}>
                {day.dayName} - {day.date.day} {MONTHS[day.date.month]}
              </Text>
              {total === 0 ? (
                <Text style={styles.text}>No tasks for this day.</Text>
              ) : (
                <>
                  <View style={styles.progressSection}>
                    <CircularProgress progress={completed / total} size={70} />
                    <Text style={styles.text}>
                      {completed} / {total}
                    </Text>
                  </View>
                  {day.tasks.map(task => (
                    <WeekTaskCard key={task.id} task={task} />
                  ))}
                </>
              )}
            </BaseCard>
          </Animated.View>
        );
      })}
    </ScreenWrapper>
  );
}
