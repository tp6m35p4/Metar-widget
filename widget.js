let metarUrl =
  "https://aviationweather.gov/cgi-bin/data/metar.php?ids=%airport&format=json&taf=false&hours=1";
let widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();
Script.complete();

async function createWidget() {
  const widget = new ListWidget();
  const a = args.widgetParameter;
  const data = await fetchMetar(a);
  if (data != null) {
    let text = widget.addText(data.rawOb);
    text.font = Font.boldSystemFont(18);
    text.textColor = Color.white();
  }
  return widget;
}

async function fetchMetar(airport = "RCFN") {
  let u = metarUrl.replace("%airport", airport);
  const data = await new Request(u).loadJSON();
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
