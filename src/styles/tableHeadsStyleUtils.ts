const hideOnSmallScreen = "hidden md:table-cell";

const responsiveThStyle =
  "table-cell font-medium md:font-bold lg:px-4 sm:px-none py-2 border-b";

export const getHeaderVisibility = (header: string) =>
  header === "Description" || header === "Account" ? hideOnSmallScreen : "";

export const getHeaderStyle = (header: string) =>
  `${responsiveThStyle} ${getHeaderVisibility(header)}`;
