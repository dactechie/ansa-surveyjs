import { getCurrentYearMonthDayString } from "@/common/utils";

export function generateRowKey(surveyTypeCode, program) {
  // SAPPHIRE_INAS_20201009
  return `${program}_${surveyTypeCode}_${getCurrentYearMonthDayString()}`;
}

export function buildNav(survey) {
  const panels = survey.getAllPanels();

  const nav = [];
  panels.forEach(panel => {
    let pages = panel.data.pages;
    pages.forEach((page, index) => {
      nav.push({
        pgno: index,
        title: page.title
      });
    });
  });
  return nav;
  //survey.getAllPanels()[0].data.pages[4].title
}
