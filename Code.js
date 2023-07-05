function main() {
  calendar = CalendarApp.getCalendarById(CALENDAR_ID)
  var start = new Date();
  start.setMonth(start.getMonth() - 1);
  start.setDate(1)
  start.setHours(0)
  var end = new Date();
  end.setDate(1)
  end.setHours(0);
  var events = calendar.getEvents(start, end);
  var min134 = min167 = min267 = 0;
  for (var event of events) {
    if (event.getTitle() == '[加班]') {
      var day = event.getStartTime().getDay() | 0;
      var date = event.getStartTime().getDate() | 0;
      var duration = Math.round(event.getEndTime() - event.getStartTime()) / 1000 / 60;
      var overlapStart = Math.max((event.getStartTime().getTime() / 1000 / 60 + 8 * 60) % (60 * 24) / 60, 12)
      var overlapEnd = Math.min((event.getEndTime().getTime() / 1000 / 60 + 8 * 60) % (60 * 24) / 60, 13)
      if (overlapStart < overlapEnd) {
        duration -= (overlapEnd - overlapStart) * 60;
      }
      console.log('%d 日 (星期 %d) 加班 %d hrs', date, day, duration / 60)
      if (day == 0 || day == 6) {
        min134 += Math.min(duration, 2 * 60);
        min167 += Math.min(Math.max(duration - 2 * 60, 0), 6 * 60);
        min267 += Math.max(duration - 8 * 60, 0)
      } else {
        min134 += Math.min(duration, 2 * 60);
        min167 += Math.max(duration - 2 * 60, 0);
      }
    }
  }
  console.log('1.34x: %d', min134 / 60);
  console.log('1.67x: %d', min167 / 60);
  console.log('2.67x: %d', min267 / 60);
  console.log('Total: %d', ((min134 * 1.34 + min167 * 1.67 + min267 * 2.67) / 60).toFixed(4));
}
