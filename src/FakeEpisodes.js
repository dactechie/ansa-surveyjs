// export default [
//   {
//     PartitionKey: "SLKFT010820012",
//     RowKey: "SAPPHIRE_20201005",
//     AODHistory:
//       '[{ drug_type: "nicotine", method_of_use: "smokes",  age_first_used: 15,  amount_used: 15,   how_often_used: "weekly",  units_consumed_per_period: "50 - 59",  usage_units: "cigarettes" }]',
//     ClientID: "1111",
//     "CommencementDate@odata.type": "Edm.DateTime",
//     CommencementDate: "2020-06-14T00:00:00Z",
//     IDType: "CCARE",
//     MethodOfUse: "ingests",
//     OtherDrugsOfConcern:
//       '[{ how_many_days: 15, drug_type: "opioids", method_of_use: "injects" }]',
//     PrincipalDrugOfConcern: "alcohol",
//     Staff: "ronan.oconnor",
//     SurveyMeta:
//       '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}',
//     //SurveyMeta :     '{survey_id: "9fe4d164-8c6c-4b0a-ac60-aabf803413b7","version_lastmod_date:": "2020-10-04",status: "Incomplete"}',
//     Team: "SAPPHIRE"
//   }
// ];


ClientID
SourceDatabase
Staff
Status
SurveyData
SurveyID
SurveyName


export default [
  {
    "odata.metadata": "https://storageaccountansa9783.table.core.windows.net/$metadata#ANSA",
    "value": [
      {
        "odata.etag": "W/\"datetime'2020-10-12T02%3A45%3A33.7599829Z'\"",
        "PartitionKey": "ALLFT210719811",
        "RowKey": "BEGAPATH_INAS_2020912",
        "Timestamp": "2020-10-12T02:45:33.7599829Z",
        "ClientID": "1234",
        "Program": "BEGAPATH",
        "SourceDatabase": "CCARE",
        "Staff": "Tim.Ireson",
        "SurveyData": "{\"Timestamp\":\"Mon Oct 12 2020\",\"Status\":\"Incomplete\",\"SurveyID\":\"ddc3dec4-6de5-4bc9-a963-87e20896feed\",\"AODHistory\":[{\"drug_type\":\"nicotine\",\"method_of_use\":\"smokes\",\"age_first_used\":15,\"amount_used\":15,\"how_often_used\":\"weekly\",\"units_consumed_per_period\":\"50 - 59\",\"usage_units\":\"cigarettes\"}],\"MethodOfUse\":\"ingests\",\"OtherDrugsOfConcern\":[{\"how_many_days\":15,\"drug_type\":\"opioids\",\"method_of_use\":\"injects\"}],\"PrincipalDrugOfConcern\":\"alcohol\",\"AddictiveBehaviours\":[\"sex\",\"gambling\"],\"Risks\":[\"usealone\",\"other\",\"violence\"],\"RisksOtherComments\":\"\",\"ImpactOnDailyActivities\":3,\"aod_history\":[{\"drug_type\":\"opioids\",\"method_of_use\":\"injects\",\"age_first_used\":2,\"how_often_used\":\"daily\",\"units_consumed_per_period\":\"10 - 14\",\"usage_units\":\"shots\"}],\"aod_harms_risks\":[\"memloss\"],\"impctdaily\":\"1\",\"additive_behaviours\":[\"hoarding\"]}",
        "SurveyID": "ddc3dec4-6de5-4bc9-a963-87e20896feed",
        "SurveyName": "ANSA InitialAssessment"
      },
      {
        "odata.etag": "W/\"datetime'2020-10-12T02%3A30%3A27.3789274Z'\"",
        "PartitionKey": "ALLFT210719811",
        "RowKey": "SAPPHIRE_INAS_20201009",
        "Timestamp": "2020-10-12T02:30:27.3789274Z",
        "ClientID": "1234",
        "Program": "SAPPHIRE",
        "SourceDatabase": "CCARE",
        "Staff": "Tim.Ireson",
        "Status": "Incomplete",
        "SurveyData": "{\"AODHistory\":[{\"drug_type\":\"nicotine\",\"method_of_use\":\"smokes\",\"age_first_used\":15,\"amount_used\":15,\"how_often_used\":\"weekly\",\"units_consumed_per_period\":\"50 - 59\",\"usage_units\":\"cigarettes\"}],\"MethodOfUse\":\"ingests\",\"OtherDrugsOfConcern\":[{\"how_many_days\":15,\"drug_type\":\"opioids\",\"method_of_use\":\"injects\"}],\"PrincipalDrugOfConcern\":\"alcohol\",\"AddictiveBehaviours\":[\"sex\",\"gambling\"],\"Risks\":[\"usealone\",\"other\",\"violence\"],\"RisksOtherComments\":\"\",\"ImpactOnDailyActivities\":3}",
        "SurveyID": "ddc3dec4-6de5-4bc9-a963-87e20896feed",
        "SurveyName": "ANSA InitialAssessment"
      },
      {
        "odata.etag": "W/\"datetime'2020-10-12T02%3A46%3A08.3589209Z'\"",
        "PartitionKey": "ALLFT210719811",
        "RowKey": "SAPPHIRE_INAS_2020912",
        "Timestamp": "2020-10-12T02:46:08.3589209Z",
        "SurveyData": "{\"AODHistory\":[{\"drug_type\":\"nicotine\",\"method_of_use\":\"smokes\",\"age_first_used\":15,\"amount_used\":15,\"how_often_used\":\"weekly\",\"units_consumed_per_period\":\"50 - 59\",\"usage_units\":\"cigarettes\"}],\"MethodOfUse\":\"ingests\",\"OtherDrugsOfConcern\":[{\"how_many_days\":15,\"drug_type\":\"opioids\",\"method_of_use\":\"injects\"}],\"PrincipalDrugOfConcern\":\"alcohol\",\"AddictiveBehaviours\":[\"sex\",\"gambling\"],\"Risks\":[\"usealone\",\"other\",\"violence\"],\"RisksOtherComments\":\"\",\"ImpactOnDailyActivities\":3,\"aod_history\":[{\"drug_type\":\"opioids\",\"method_of_use\":\"ingests\",\"how_often_used\":\"weekly\",\"age_first_used\":22,\"usage_units\":\"quart\",\"units_consumed_per_period\":\"30 - 39\"}],\"aod_harms_risks\":[\"usealone\"],\"impctdaily\":\"1\",\"additive_behaviours\":[\"hoarding\"]}",
        "ClientID": "1234",
        "Program": "SAPPHIRE",
        "SourceDatabase": "CCARE",
        "Staff": "Tim.Ireson",
        "Status": "Incomplete",
        "SurveyID": "ddc3dec4-6de5-4bc9-a963-87e20896feed",
        "SurveyName": "ANSA InitialAssessment"
      }
    ]
  }
];