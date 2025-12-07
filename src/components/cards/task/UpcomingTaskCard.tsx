// export const UpcomingTaskCard = ({
//   title,
//   type,
//   typeColor,
//   completed,
//   dueDate,
// }: {
//   title: string;
//   type: string;
//   typeColor: string;
//   completed: boolean;
//   dueDate: string;
// }) => {
//   const { colors, typography } = useTheme();
//   return (
//     <Card>
//       <View
//         style={{
//           borderColor: typeColor,
//           borderLeftWidth: 10,
//           gap: 10,
//           paddingLeft: 15,
//         }}
//       >
//         <Text
//           style={{
//             ...(typography.h3 as TextStyle),
//             color: completed
//               ? colors.base.foregroundAlt
//               : colors.base.foreground,
//             textDecorationLine: completed ? 'line-through' : 'none',
//           }}
//         >
//           {title}
//         </Text>
//         <Text
//           style={{
//             ...(typography.h3 as TextStyle),
//             color: colors.base.foregroundAlt,
//           }}
//         >
//           {type} - {dueDate}
//         </Text>
//       </View>
//     </Card>
//   );
// };
