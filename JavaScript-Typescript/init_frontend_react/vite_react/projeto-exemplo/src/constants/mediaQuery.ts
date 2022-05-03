export const mediaQuery = {
  mobile: '@media screen and (max-width: 420px)',
  tablet: '@media screen and (max-width: 768px)',
  desktop: '@media screen and (max-width: 1280px)',
  desktopSm: '@media screen and (max-width: 1366px)',
  desktopMd: '@media screen and (max-width: 1440px)',
  desktopMdLg: '@media screen and (max-width: 1553px)',
  desktopLg: '@media screen and (min-width: 1920px)',
  custom: (size: number) => `@media screen and (max-width: ${size}px)`,
};
