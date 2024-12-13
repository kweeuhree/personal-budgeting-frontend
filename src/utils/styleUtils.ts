const hideOnSmallScreen = "hidden md:block";

const getHeaderVisibility = (header: string) =>
  header === "Description" || header === "Account" ? hideOnSmallScreen : "";

export const getHeaderStyle = (header: string) =>
  `font-medium md:font-bold ${getHeaderVisibility(header)}`;
