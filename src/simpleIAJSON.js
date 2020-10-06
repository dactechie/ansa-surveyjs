export default {
  title: "ANSA Initial Assessment",
  completedHtml: "Submitted ... PDC : {PrincipalDrugOfConcern}",
  pages: [
    {
      name: "survey_meta",
      elements: [
        {
          type: "radiogroup",
          name: "Team",
          titleLocation: "hidden",
          isRequired: true,
          choices: [
            {
              value: "EUROPATH",
              text: "Pathways Eurobodalla"
            },
            {
              value: "MONAPATH",
              text: "Pathways Monaro"
            },
            {
              value: "BEGAPATH",
              text: "Pathways Bega"
            },
            {
              value: "TSS",
              text: "TSS"
            },
            {
              value: "MWIO",
              text: "Murrumbidgee Work It Out"
            },
            {
              value: "MICE",
              text: "Murrumbidgee Ice"
            },
            {
              value: "GOLGEN",
              text: "Goulburn General"
            },
            {
              value: "GOLICE",
              text: "Goulburn Ice"
            },
            {
              value: "GRIFHEAD",
              text: "Griffith Headspace"
            },
            {
              value: "GRIFWIO",
              text: "Griffith Work It Out"
            }
          ],
          colCount: 6
        },
        {
          type: "radiogroup",
          name: "Staff",
          titleLocation: "hidden",
          isRequired: true,
          choices: [
            {
              value: "vic.may",
              text: "Vic",
              visibleIf: "{Team} = 'EUROPATH'"
            },
            {
              value: "glenda.mccarthy",
              text: "Glenda",
              visibleIf: "{Team} = 'EUROPATH'"
            },
            {
              value: "jacinta.hayward-ryan",
              text: "Jacinta",
              visibleIf: "{Team} = 'EUROPATH' or {Team} = 'MONPATH'"
            },
            {
              value: "tracy.sims",
              text: "Tracy",
              visibleIf: "{Team} = 'EUROPATH'"
            },
            {
              value: "belinda.pendergast",
              text: "Belinda",
              visibleIf: "{Team} = 'MONAPATH'"
            },
            {
              value: "michelle.figares",
              text: "Michelle",
              visibleIf: "{Team} = 'BEGAPATH'"
            },
            {
              value: "tim.ireson",
              text: "Tim",
              visibleIf: "{Team} = 'TSS' or {Team} = 'BEGAPATH'"
            },
            {
              value: "canon.hanly",
              text: "Canon",
              visibleIf: "{Team} = 'TSS'"
            },
            {
              value: "charles.debaecker",
              text: "Charles",
              visibleIf: "{Team} = 'GRIFHEAD' or {Team} = 'GRIFWIO'"
            },
            {
              value: "craig.maxwell",
              text: "Craig",
              visibleIf: "{Team} = 'MICE' or {Team} = 'MWIO'"
            },
            {
              value: "deanna.price-maxwell",
              text: "Deanna",
              visibleIf: "{Team} = 'MICE' or {Team} = 'MWIO'"
            },
            {
              value: "elizabeth.newcombe",
              text: "Libby",
              visibleIf: "{Team} = 'GOLGEN' or {Team} = 'GOLICE'"
            },
            {
              value: "tatenda.chitsungo",
              text: "Teddy",
              visibleIf: "{Team} = 'TSS'"
            },
            {
              value: "tina.dowse",
              text: "Tina",
              visibleIf: "{Team} = 'TSS'"
            },
            {
              value: "camila.kuss",
              text: "Camila",
              visibleIf: "{Team} = 'TSS'"
            }
          ]
        }
      ],
      questionTitleLocation: "hidden",
      title: "Program and Staff"
    },
    {
      name: "PrincipalDrugOfConcern",
      elements: [
        {
          type: "radiogroup",
          name: "PrincipalDrugOfConcern",
          indent: 3,
          titleLocation: "hidden",
          isRequired: true,
          choices: [
            {
              value: "alcohol",
              text: "Alcohol"
            },
            {
              value: "amphetamine",
              text: "Amphetamines"
            },
            {
              value: "cocaine",
              text: "Cocaine"
            },
            {
              value: "opioid",
              text: "Opioids"
            },
            {
              value: "nicotine",
              text: "Nicotine"
            },
            {
              value: "sedative",
              text: "Sedatives"
            }
          ],
          colCount: 6
        },
        {
          type: "panel",
          name: "MethodOfUse",
          elements: [
            {
              type: "radiogroup",
              name: "MethodOfUse",
              visible: false,
              visibleIf: "{PrincipalDrugOfConcern} notempty",
              indent: 3,
              titleLocation: "hidden",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "ingests",
                  text: "Ingests",
                  visibleIf:
                    "{PrincipalDrugOfConcern} = 'alcohol' or {PrincipalDrugOfConcern} = 'nicotine' or {pdc} = 'sedative' or {pdc} = 'amphetamine'"
                },
                {
                  value: "injects",
                  text: "Injects",
                  visibleIf:
                    "{PrincipalDrugOfConcern} = 'amphetamine' or {PrincipalDrugOfConcern} = 'opioid'"
                },
                {
                  value: "inhales",
                  text: "Inhales",
                  visibleIf:
                    "{PrincipalDrugOfConcern} = 'nicotine' or {PrincipalDrugOfConcern} = 'alcohol' or {PrincipalDrugOfConcern} = 'cocaine'"
                },
                {
                  value: "transdermal",
                  text: "Transdermal",
                  visibleIf:
                    "{PrincipalDrugOfConcern} = 'nicotine' or {PrincipalDrugOfConcern} = 'sedative'"
                },
                {
                  value: "sublingual",
                  text: "Sublingual",
                  visibleIf: "{PrincipalDrugOfConcern} = 'nicotine'"
                },
                {
                  value: "smokes",
                  text: "Smokes",
                  visibleIf:
                    "{PrincipalDrugOfConcern} = 'nicotine' or {PrincipalDrugOfConcern} = 'amphetamine' or {PrincipalDrugOfConcern} = 'opioid'"
                }
              ],
              colCount: 6
            }
          ]
        }
      ],
      title: "Principal Substance of Concern and Method of Use"
    },
    {
      name: "summary_page",
      elements: [
        {
          type: "html",
          name: "pre_final_summary",
          html:
            "consider injecting dynamic html into Syrvey JS via the VUE application.. loop over arrays etc."
        }
      ],
      readOnly: true,
      title: "Summary",
      description: "Please review all data before submission.",
      navigationButtonsVisibility: "show"
    }
  ],
  showTitle: false,
  progressBarType: "questions",
  goNextPageAutomatic: true
};
