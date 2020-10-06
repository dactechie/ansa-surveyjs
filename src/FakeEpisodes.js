export default [
  {
    PartitionKey: "SLKFT010820012",
    RowKey: "SAPPHIRE_20201005",
    AODHistory:
      '[{ drug_type: "nicotine", method_of_use: "smokes",  age_first_used: 15,  amount_used: 15,   how_often_used: "weekly",  units_consumed_per_period: "50 - 59",  usage_units: "cigarettes" }]',
    ClientID: "1111",
    "CommencementDate@odata.type": "Edm.DateTime",
    CommencementDate: "2020-06-14T00:00:00Z",
    IDType: "CCARE",
    MethodOfUse: "ingests",
    OtherDrugsOfConcern:
      '[{ how_many_days: 15, drug_type: "opioids", method_of_use: "injects" }]',
    PrincipalDrugOfConcern: "alcohol",
    Staff: "ronan.oconnor",
    SurveyMeta:
      '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}',
    //SurveyMeta :     '{survey_id: "9fe4d164-8c6c-4b0a-ac60-aabf803413b7","version_lastmod_date:": "2020-10-04",status: "Incomplete"}',
    Team: "SAPPHIRE"
  }
];
