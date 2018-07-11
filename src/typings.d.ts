// FullScreen
declare namespace JQuery.fullCalendar {
  type FullCalendarStatic = (options: any) => any;

  type ToggleFullScreenStatic = () => any;
}

interface JQuery {
  fullScreen: JQuery.fullCalendar.FullCalendarStatic;
  toggleFullScreen: JQuery.fullCalendar.ToggleFullScreenStatic;
}
