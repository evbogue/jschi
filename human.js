export const human = (seconds) => {
  if (seconds instanceof Date)
    seconds = Math.round((Date.now() - seconds) / 1000);
  seconds = Math.abs(seconds);

  var times = [
    seconds / 60 / 60 / 24 / 365, // years
    seconds / 60 / 60 / 24 / 30,  // months
    seconds / 60 / 60 / 24 / 7,   // weeks
    seconds / 60 / 60 / 24,       // days
    seconds / 60 / 60,            // hours
    seconds / 60,                 // minutes
    seconds                       // seconds
  ];
  var names = ['y', 'mo', 'w', 'd', 'h', 'm', 's'];

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);
    var name = names[i];
    if (time >= 1)
      return time + name;
  }
  return 'now'
}

