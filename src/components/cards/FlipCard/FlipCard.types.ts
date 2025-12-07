export type FlipCardProps<
  FProps extends Record<string, any> = {},
  BProps extends Record<string, any> = {},
> = {
  Front: React.ComponentType<FProps>;
  Back: React.ComponentType<BProps>;
  frontProps?: FProps;
  backProps?: BProps;
  style?: object;
};
