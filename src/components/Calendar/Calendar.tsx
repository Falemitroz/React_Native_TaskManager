import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MONTHS, Task } from '../../types/taskTypes';
import { createStyles } from './Calendar.styles';
import { PressableIcon } from '../buttons';
import { useTheme } from '../../hooks';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Calendar: React.FC<{
  size?: number;
  taskDueDate?: Task['dueDate'];
  onChangeDate?: (date: { day: number; month: number; year: number }) => void;
}> = ({ size = 252, taskDueDate, onChangeDate }) => {
  const { colors } = useTheme();

  const today = new Date();
  const selectedDay = taskDueDate?.day ?? today.getDate();
  const initialMonth = taskDueDate?.month ?? today.getMonth();
  const initialYear = taskDueDate?.year ?? today.getFullYear();

  const [monthIndex, setMonthIndex] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthName = MONTHS[monthIndex];

  const firstDay = new Date(year, monthIndex, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const totalCells = offset + daysInMonth;
  const totalRows = Math.ceil(totalCells / 7);

  const cells = Array.from({ length: totalRows * 7 }, (_, i) => {
    const day = i - offset + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const changeMonth = (delta: number) => {
    const newDate = new Date(year, monthIndex + delta);
    setMonthIndex(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const styles = createStyles(size);
  const iconSize = size / 7;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableIcon
          name="chevron-left"
          onPress={() => changeMonth(-1)}
          color={colors.base.foreground}
          size={iconSize}
        />

        <Text style={styles.title}>{`${monthName} ${year}`}</Text>

        <PressableIcon
          name="chevron-right"
          onPress={() => changeMonth(1)}
          color={colors.base.foreground}
          size={iconSize}
        />
      </View>

      <View style={styles.grid}>
        {WEEK_DAYS.map((day, i) => (
          <View key={i} style={styles.dayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}

        {cells.map((day, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dayCell,
              day === selectedDay && { backgroundColor: colors.base.blue },
            ]}
            onPress={() => {
              if (!day) return;
              onChangeDate?.({ day, month: monthIndex, year });
            }}
          >
            {day && (
              <Text
                style={[
                  styles.dayText,
                  day === selectedDay && { color: colors.base.foreground },
                ]}
              >
                {day}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
