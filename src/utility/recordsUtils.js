const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ASSET_TYPES = {
  Cash: "Cash",
  Asset: "Asset",
  Liability: "Liability",
};

const recordsParser = (recordsData) => {
  //   console.log(recordsData);
  let record_edit = [];
  let record_parsed = new Map();
  let counter_key = 0;

  if (recordsData == null) {
    return [];
  }

  //Sanitize the records data.
  recordsData.map((record) => {
    let date = new Date(record.recordDate);
    let recordFormattedDate = `${
      MONTHS[date.getMonth()]
    }_${date.getFullYear()}`;
    let item = {
      recordFormattedDate: recordFormattedDate,
      recordItemValue: parseFloat(record.itemValue),
      recordItemType: record.ItemType.itemCategory,
      recordFullDate: date,
    };
    record_edit.push(item);
  });

  //Sort the sanitized records data.
  record_edit.sort(function (a, b) {
    return a.recordFullDate - b.recordFullDate;
  });

  for (const key in record_edit) {
    let formattedDateKey = record_edit[key].recordFormattedDate;

    if (!record_parsed.has(formattedDateKey)) {
      record_parsed.set(formattedDateKey, {
        cash: 0,
        asset: 0,
        liability: 0,
      });
    }

    if (record_edit[key].recordItemType == ASSET_TYPES.Cash) {
      let row_item = record_parsed.get(formattedDateKey);
      row_item.cash = row_item.cash + record_edit[key].recordItemValue;
      record_parsed.set(formattedDateKey, row_item);
    }

    if (record_edit[key].recordItemType == ASSET_TYPES.Asset) {
      let row_item = record_parsed.get(formattedDateKey);
      row_item.asset = row_item.asset + record_edit[key].recordItemValue;
      record_parsed.set(formattedDateKey, row_item);
    }

    if (record_edit[key].recordItemType == ASSET_TYPES.Liability) {
      let row_item = record_parsed.get(formattedDateKey);
      row_item.liability =
        row_item.liability + record_edit[key].recordItemValue;
      record_parsed.set(formattedDateKey, row_item);
    }
  }

  return record_parsed;
};

module.exports = { recordsParser };
