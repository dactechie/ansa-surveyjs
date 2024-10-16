{
 "title": "ATOM Initial Assessment",
 "logoPosition": "right",
 "completedHtml": "<h2>Thanks for completing an ATOM</h2>\n<p>\nA summary will be emailed to:\n</p>\n<p>\nPlease ensure the summary is uploaded to the client file\n</p>\n\n",
 "completedBeforeHtml": "\nCompleted before HTML",
 "loadingHtml": "\n\nLOADING ...",
 "pages": [
  {
   "name": "survey_meta",
   "elements": [
    {
     "type": "text",
     "name": "AssessmentDate",
     "minWidth": "200px",
     "maxWidth": "650px",
     "title": "Date of Assessment",
     "titleLocation": "top",
     "description": "(When completed with the client)",
     "defaultValueExpression": "today()",
     "inputType": "date",
     "size": 10
    },
    {
     "type": "radiogroup",
     "name": "AssessmentType",
     "defaultValue": "InitialAssessment",
     "readOnly": true,
     "choices": [
      {
       "value": "InitialAssessment",
       "text": "ATOM Initial Assessment"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "Program",
     "title": "Program Details",
     "titleLocation": "top",
     "isRequired": true,
     "choices": [
      {
       "value": "SAPPHIRE",
       "text": "Sapphire Health & Wellbeing Service"
      },
      {
       "value": "EUROPATH",
       "text": "Eurobodalla"
      },
      {
       "value": "MONPATH",
       "text": "Monaro"
      },
      "TSS",
      {
       "value": "MURMICE",
       "text": "Murrumbidgee Ice"
      },
      {
       "value": "MURMHEAD",
       "text": "Murrumbidgee Headspace"
      },
      {
       "value": "MURMPP",
       "text": "Murrumbidgee Pre/Post"
      },
      {
       "value": "MURMWIO",
       "text": "Murrumbidgee Work It Out"
      },
      {
       "value": "GOLBGNRL",
       "text": "Goulburn General"
      },
      {
       "value": "GOLBICE",
       "text": "Goulburn Ice"
      },
      {
       "value": "TEST",
       "text": "For ATOM Training/Trials"
      },
      {
       "value": "COCO",
       "text": "CoCo"
      },
      {
       "value": "ALONGSIDE",
       "text": "Alongside"
      },
      {
       "value": "BEGAMH",
       "text": "Bega Mental Health Hub"
      },
      {
       "value": "PCS - Bega",
       "text": "Post Custodial Support - Bega"
      },
      {
       "value": "PCS - Eurobodalla",
       "text": "Post Custodial Support - Eurobodalla"
      },
      {
       "value": "PCS - Goulburn",
       "text": "Post Custodial Support - Goulburn"
      },
      {
       "value": "PCS - Murrumbidgee",
       "text": "Post Custodial Support - Murrumbidgee"
      },
      {
       "value": "PCS - Griffith",
       "text": "Post Custodial Support - Griffith"
      },
      {
       "value": "PCS - Wagga Wagga",
       "text": "Post Custodial Support - Wagga Wagga"
      },
      {
       "value": "PPB",
       "text": "Priority Populations - Bega"
      },
      {
       "value": "PPC",
       "text": "Priority Populations - Cooma"
      },
      {
       "value": "PPE",
       "text": "Priority Populations - Eurobodalla"
      },
      {
       "value": "PPG",
       "text": "Priority Populations - Goulburn"
      },
      {
       "value": "PPQ",
       "text": "Priority Populations - Queanbeyan"
      },
      {
       "value": "PPW",
       "text": "Priority Populations - Wagga Wagga"
      },
      {
       "value": "YCB",
       "text": "Youth Counselling - Bega"
      },
      {
       "value": "YCC",
       "text": "Youth Counselling - Cooma"
      },
      {
       "value": "YCE",
       "text": "Youth Counselling - Eurobodalla"
      },
      {
       "value": "YCG",
       "text": "Youth Counselling - Goulburn"
      },
      {
       "value": "YCQ",
       "text": "Youth Counselling - Queanbeyan"
      }
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "Staff",
     "title": "Team Members",
     "titleLocation": "top",
     "isRequired": true,
     "choices": [
      {
       "value": "Mimi.Avila",
       "text": "Mimi",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Vic.May",
       "text": "Vic",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'TEST' or {Program} = 'PCS - Eurobodalla'"
      },
      {
       "value": "Jacinta.Ryan",
       "text": "Jacinta",
       "visibleIf": "((({Program} = 'EUROPATH') or ({Program} = 'MONPATH')) or ({Program} = 'TEST')) or ({Program} = 'PCS - Bega')"
      },
      {
       "value": "Tracy.Sims",
       "text": "Tracy S",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'TEST' or {Program} = 'PCS - Eurobodalla'"
      },
      {
       "value": "Tim.Ireson",
       "text": "Tim",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST']"
      },
      {
       "value": "Charles.Debaecker",
       "text": "Charles",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMICE', 'MURMWIO', 'TEST', 'MURMPP', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Craig.Maxwell",
       "text": "Craig",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Deanna.Price-Maxwell",
       "text": "Deanna",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Michele.Lumb",
       "text": "Michele",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST']"
      },
      {
       "value": "Erica.Murphy",
       "text": "Erica",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Anthony.Williams",
       "text": "Anthony",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Bronwen.Whistance",
       "text": "Bronwen",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Carol.Sharp",
       "text": "Carol",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Kaylene.Mallott",
       "text": "Kaylene",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Mysh.Kirkwood",
       "text": "Mysh",
       "visibleIf": "{Program} = 'COCO' or {Program} = 'TEST'"
      },
      {
       "value": "Camilo.Ledesma",
       "text": "Camilo",
       "visibleIf": "{Program} anyof ['ALONGSIDE', 'TSS', 'TEST']"
      },
      {
       "value": "Catherine.Dooley",
       "text": "Catherine",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Emiltus.Emmanuel",
       "text": "Emiltus",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Holly.Pither",
       "text": "Holly",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Karen.Freedman",
       "text": "Karen",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Leanne.Wilkins",
       "text": "Leanne",
       "visibleIf": "{Program} anyof ['TSS', 'Alongside', 'TEST']"
      },
      {
       "value": "Suzanne.Russel",
       "text": "Suzanne",
       "visibleIf": "{Program} = 'CoCo' or {Program} = 'TEST'"
      },
      {
       "value": "Nurgul.Sawut",
       "text": "Nurgul",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Oliver.Lewis",
       "text": "Ollie",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Tina.Dowse",
       "text": "Tina",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Tony.Zheng",
       "text": "Tony",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Liz.Scott",
       "text": "Liz",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST']"
      },
      {
       "value": "Kylie.Wood",
       "text": "Kylie",
       "visibleIf": "({Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST', 'PCS - Bega']) "
      },
      {
       "value": "Belinda.Grooms",
       "text": "Bel",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST'"
      },
      {
       "value": "Aftab.Jalal",
       "text": "MJ",
       "visibleIf": "{Program} = 'TEST'"
      },
      {
       "value": "Corrina.Trimarchi",
       "text": "Corrina",
       "visibleIf": "{Program} = 'TEST'"
      },
      {
       "value": "Simona.Angeli",
       "text": "Simona",
       "visibleIf": "{Program} = 'GOLBGNRL' or {Program} = 'GOLBICE'"
      },
      {
       "value": "Claudia.Imbriano",
       "text": "Claudia",
       "visibleIf": "{Program} anyof ['TSS', 'Alongside', 'TEST']"
      },
      {
       "value": "Nick.Vanbreda",
       "text": "Nick",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST']"
      },
      {
       "value": "Jasmin.Gilchrist",
       "text": "Jasmin",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Paul.Crowe",
       "text": "Paul",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'TEST'"
      },
      {
       "value": "Jim.Downey",
       "text": "Jim",
       "visibleIf": "{Program} = 'COCO' or {Program} = 'TEST'"
      },
      {
       "value": "Lexxie.Jury",
       "text": "Lexxie",
       "visibleIf": "{Program} anyof ['ALONGSIDE', 'TSS', 'TEST']"
      },
      {
       "value": "Tina.Raccanello",
       "text": "Tina R",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMICE', 'MURMWIO', 'TEST', 'MURMPP', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Patrick.Thomson",
       "text": "Patrick",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'other', 'TEST', 'PCS - Eurobodalla', 'PCS - Bega']"
      },
      {
       "value": "Michelle.Figares",
       "text": "Michelle",
       "visibleIf": "{Program} anyof ['ALONGSIDE', 'TSS', 'TEST']"
      },
      {
       "value": "Mikaela.Feltham",
       "text": "Mikaela",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMICE', 'MURMWIO', 'TEST', 'MURMPP', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Glenda.McCarthy",
       "text": "Glenda",
       "visibleIf": "(({Program} = 'EUROPATH') or ({Program} = 'MONPATH')) or ({Program} = 'PCS - Bega')"
      },
      {
       "value": "Michelle.Wilkie",
       "text": "Michelle",
       "visibleIf": "{Program} = 'SAPPHIRE' "
      },
      {
       "value": "Harry.Bellchambers",
       "text": "Harry",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST' or {Program} = 'COCO' or {Program} = 'TSS' "
      },
      {
       "value": "Helen.Waite",
       "text": "Helen",
       "visibleIf": "{Program} = 'XPP' or {Program} = 'BEGAPATH' or {Program} = 'TEST' or {Program} = 'MONPATH' or {Program} = 'PPC' or {Program} = PPC"
      },
      {
       "value": "Molly.Reynolds",
       "text": "Molly",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH','TEST','XYP','YCB']"
      },
      {
       "value": "Shaquille.Aldridge",
       "text": "Shaquille",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST']"
      },
      {
       "value": "Kath.Musgrove",
       "text": "Kath",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "Gabriel.Spira",
       "text": "Gabriel",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "Renee.Cafe-Pollack",
       "text": "Renee",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "Sam.Barratt",
       "text": "Sam",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "Maya.Jashnehvand",
       "text": "Maya",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST'"
      },
      {
       "value": "Megan.Grant",
       "text": "Megan",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Louise.Kelly",
       "text": "Louise",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "James.Costello",
       "text": "James",
       "visibleIf": "{Program} = 'PCS - Goulburn' or {Program} = 'GOLBGNRL' or {Program} = 'TEST' or {Program} = 'GOLBICE'"
      },
      {
       "value": "Indigo.DeWaal",
       "text": "Indigo",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST' or {Program} = 'COCO'"
      },
      {
       "value": "Sarah.Meissner",
       "text": "Sarah",
       "visibleIf": "{Program} anyof ['TSS', 'TEST', 'ALONGSIDE']"
      },
      {
       "value": "Trae.Oneill",
       "text": "Trae",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST']"
      },
      {
       "value": "Lionel.Rogers",
       "text": "Lionel",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Lachy.Weymouth",
       "text": "Lachy",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMICE', 'MURMWIO', 'TEST', 'MURMPP', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Anastasia.Crawford",
       "text": "Anastasia",
       "visibleIf": "{Program} = 'XPP' or {Program} = 'BEGAPATH' or {Program} = 'TEST' or {Program} = 'MONPATH' or {Program} = 'PPC' or {Program} = PPC"
      },
      {
       "value": "Christa.McCarthy",
       "text": "Christa",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'MONPATH' or {Program} = 'TEST'"
      },
      {
       "value": "Taya.Bate",
       "text": "Taya",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'MONPATH' or {Program} = 'TEST'"
      },
      {
       "value": "Tracy.Glendenning",
       "text": "Tracy G",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'MONPATH' or {Program} = 'TEST'"
      },
      {
       "value": "Rikki.Lloyd",
       "text": "Rikki",
       "visibleIf": "{Program} anyof ['ALONGSIDE', 'TSS', 'TEST'] or\n{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Charlotte.Taylor",
       "text": "Charlotte",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Amy.Robbins",
       "text": "Amy",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST','XYP','YCB']"
      },
      {
       "value": "Louise.Harrington",
       "text": "Louise",
       "visibleIf": "{Program} anyof ['TSS', 'TEST', 'ALONGSIDE']"
      },
      {
       "value": "Lei.Wang",
       "text": "Lei",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST' or {Program} = 'COCO'"
      },
      {
       "value": "Kendra.Bielmann",
       "text": "Kendra",
       "visibleIf": "{Program} anyof ['SAPPHIRE', 'BEGAPATH', 'TEST']"
      },
      {
       "value": "Daniel.Roos",
       "text": "Daniel R",
       "visibleIf": "{Program} = 'EUROPATH' or {Program} = 'XYP' or {Program} = 'TEST'"
      },
      {
       "value": "Rose.Liddall",
       "text": "Rose L",
       "visibleIf": "{Program} anyof ['TEST','BEGAMH']"
      },
      {
       "value": "Mimi.Ward",
       "text": "Mimi W",
       "visibleIf": "{Program} = 'GOLBICE' or {Program} = 'GOLBGNRL' or {Program} = 'TEST'"
      },
      {
       "value": "Rhys.Cummins",
       "text": "Rhys C",
       "visibleIf": "{Program} anyof ['MURMHEAD', 'MURMPP', 'MURMICE', 'MURMWIO', 'TEST', 'PCS - Murrumbidgee']"
      },
      {
       "value": "Caragh.Palmer",
       "text": "Caragh P",
       "visibleIf": "{Program} = 'TSS' or {Program} = 'TEST'"
      },
      {
       "value": "Bryce.Jarvis",
       "text": "Bryce J",
       "visibleIf": "{Program} = 'other' or {Program} = 'TEST' or {Program} = 'COCO'"
      }
     ],
     "separateSpecialChoices": true,
     "otherText": "Corrina",
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "ClientType",
     "title": "Client Type",
     "titleLocation": "top",
     "isRequired": true,
     "choices": [
      {
       "value": "ownuse",
       "text": "Own Substance Use"
      },
      {
       "value": "othersuse",
       "text": "Other's Substance Use"
      }
     ]
    },
    {
     "type": "dropdown",
     "name": "Relationship",
     "visibleIf": "{ClientType} = 'othersuse'",
     "title": "Your relationship to the person using alcohol or other drugs?",
     "titleLocation": "top",
     "choices": [
      "Partner",
      "Ex-partner",
      "Child",
      "Parent",
      "Sibling",
      "Other family member",
      "Friend"
     ]
    },
    {
     "type": "dropdown",
     "name": "IndigenousStatus",
     "title": "Does the client identify as Aboriginal and/or Torres Strait Islander?",
     "titleLocation": "top",
     "choices": [
      "Aboriginal but not Torres Strait Islander",
      "Torres Strait Islander but not Aboriginal",
      "Both Aboriginal and Torres Strait Islander",
      "Neither Aboriginal nor Torres Strait Islander"
     ]
    },
    {
     "type": "dropdown",
     "name": "PreferredLanguage",
     "title": "Preferred Language",
     "titleLocation": "top",
     "description": "Preferred Language",
     "choices": [
      "English",
      "Inadequately Described",
      "Non Verbal, so described",
      "Not Stated ",
      "Australian Indigenous Languages, nfd",
      "Other Languages, nfd",
      "Acehnese",
      "Acholi",
      "African Languages, nec",
      "Afrikaans",
      "Akan",
      "Albanian",
      "American Languages",
      "Amharic",
      "Anuak",
      "Arabic",
      "Armenian",
      "Aromunian (Macedo-Romanian)",
      "Assamese",
      "Assyrian Neo-Aramaic",
      "Azeri",
      "Balinese",
      "Balochi",
      "Bari",
      "Basque",
      "Bassa",
      "Belarusian",
      "Bemba",
      "Bengali",
      "Bikol",
      "Bililuna Dialect",
      "Bisaya",
      "Bislama",
      "Bosnian",
      "Bulgarian",
      "Burmese",
      "Burmese and Related Languages, nec",
      "Cantonese",
      "Catalan",
      "Cebuano",
      "Celtic, nec",
      "Chaldean Neo-Aramaic",
      "Chin Haka",
      "Chinese, nec",
      "Croatian",
      "Croatian Serbian",
      "Czech",
      "Czechoslovakian, so described",
      "Dan (Gio-Dan)",
      "Danish",
      "Dari",
      "Dhivehi",
      "Dinka",
      "Dravidian, nec",
      "Dutch",
      "Estonian",
      "Ewe",
      "Fijian",
      "Fijian Hindustani",
      "Filipino",
      "Finnish",
      "Finnish and Related Languages, nec",
      "French",
      "Frisian",
      "Fulfulde",
      "Ga",
      "Gaelic (Scotland)",
      "Georgian",
      "German",
      "Gilbertese",
      "Greek",
      "Gujarati",
      "Hakkah",
      "Harari",
      "Hausa",
      "Hawaiian English",
      "Hazaraghi",
      "Hebrew",
      "Hindi",
      "Hmong",
      "Hmong-Mien, nec",
      "Hungarian",
      "Iban",
      "Iberian Romance, nec",
      "Icelandic",
      "Igbo",
      "IIokano",
      "Ilonggo (Hiligaynon)",
      "Indo-Aryan, nec",
      "Indonesian",
      "Iranic, nec",
      "Irish",
      "Italian",
      "Japanese",
      "Javanese",
      "Kannada",
      "Karen",
      "Kashmiri",
      "Khmer",
      "Kikuyu",
      "Kinyarwanda (Rwanda)",
      "Kirundi (Rundi)",
      "Kiwai",
      "Konkani",
      "Korean",
      "Kpelle",
      "Krahn",
      "Krio",
      "Kurdish",
      "Lao",
      "Latin",
      "Latvian",
      "Letzeburgish",
      "Liberian (Liberian English)",
      "Lithuanian",
      "Loma (Lorma)",
      "Luganda",
      "Lumun (Kuku Lumun)",
      "Luo",
      "Macedonian",
      "Madi",
      "Malay",
      "Malayalam",
      "Maltese",
      "Manaean (Mandaic)",
      "Mandarin",
      "Mandinka",
      "Mann",
      "Maori (Cook Island)",
      "Maori (New Zealand)",
      "Marathi",
      "Mauritian Creole",
      "Middle Eastern Semitic Languages, nec",
      "Min Nan",
      "Mon",
      "Mongolian",
      "Mon-Khmer, nec",
      "Moro (Nuba Moro)",
      "Motu (Hiri Motu)",
      "Nauruan",
      "Ndebele",
      "Nepali",
      "Niue",
      "Norwegian",
      "Nuer",
      "Nyanja (Chichewa)",
      "Oceanian Pidgins and Creoles, nec",
      "Oriya",
      "Oromo",
      "Other Eastern Asian Languages, nec",
      "Other Eastern European Languages, nec",
      "Other Southeast Asian Languages",
      "Other Southern Asian Languages",
      "Other Southern European Languages, nec",
      "Other Southwest and Central Asian Languages, nec",
      "Pacific Austronesian Languages, nec",
      "Pampangan",
      "Papua New Guinea Languages, nec",
      "Pashto",
      "Persian (excluding Dari)",
      "Pitcairnese",
      "Polish",
      "Portuguese",
      "Punjabi",
      "Rohingya",
      "Romanian",
      "Romany",
      "Rotuman",
      "Russian",
      "Samoan",
      "Scandinavian, nec",
      "Serbian",
      "Serbo-Croatian/Yugoslavian, so described",
      "Seychelles Creole",
      "Shilluk",
      "Shona",
      "Sign Languages, nec",
      "Sindhi",
      "Sinhalese",
      "Slovak",
      "Slovene",
      "Solomon Islands Pijin",
      "Somali",
      "Southeast Asian Austronesian Languages, nec",
      "Spanish",
      "Swahili",
      "Swedish",
      "Tagalog",
      "Tai, nec",
      "Tamil",
      "Tatar",
      "Telugu",
      "Tetum",
      "Thai",
      "Themne",
      "Tibetan",
      "Tigre",
      "Tigrinya",
      "Timorese",
      "Tok Pisin (Neomelanesian)",
      "Tokelauan",
      "Tongan",
      "Tswana",
      "Tulu",
      "Turkic, nec",
      "Turkish",
      "Turkmen",
      "Tuvaluan",
      "Ukrainian",
      "Urdu",
      "Uygur",
      "Uzbek",
      "Vietnamese",
      "Welsh",
      "Wu",
      "Xhosa",
      "Yapese",
      "Yiddish",
      "Yoruba",
      "Zulu"
     ]
    },
    {
     "type": "dropdown",
     "name": "CountryOfBirth",
     "title": "Country of Birth",
     "titleLocation": "top",
     "description": "Country of Birth",
     "choices": [
      "Australia",
      "New Zealand",
      "England",
      "Inadequately Described",
      "At Sea",
      "Not Stated",
      "Adelie Land (France)",
      "Afghanistan",
      "Aland Islands",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antigua and Barbuda",
      "Argentina",
      "Argentinian Antarctic Territory",
      "Armenia",
      "Aruba",
      "Australian Antarctic Territory",
      "Australian External Territories, nec",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "British Antarctic Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "Chilean Antarctic Territory",
      "China (excludes SARs and Taiwan) ",
      "Colombia",
      "Comoros",
      "Congo, Democratic Republic of",
      "Congo, Republic of",
      "Cook Islands",
      "Costa Rica",
      "Cote d'Ivoire",
      "Croatia",
      "Cuba",
      "Curacao",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "Gabon",
      "Gambia",
      "Gaza Strip and West Bank",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Holy See",
      "Honduras",
      "Hong Kong (SAR of China)",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, Democratic People's Republic of (North)",
      "Korea, Republic of (South)",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau (SAR of China)",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Myanmar",
      "Mozambique",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Caledonia",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Ireland",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn Islands",
      "Poland",
      "Polynesia (excludes Hawaii), nec",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Queen Maud Land (Norway)",
      "Reunion",
      "Romania",
      "Ross Dependency (New Zealand)",
      "Russian Federation",
      "Rwanda",
      "Samoa",
      "Samoa, American",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Scotland",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South America, nec",
      "South Sudan",
      "Southern and East Africa, nec",
      "Spain",
      "Spanish North Africa",
      "Sri Lanka",
      "St Barthelemy",
      "St Helena",
      "St Kitts and Nevis",
      "St Lucia",
      "St Martin (French part)",
      "St Pierre and Miquelon",
      "St Vincent and the Grenadines",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan ",
      "Tajikistan",
      "Tanzania",
      "The former Yugoslav Republic of Macedonia",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Virgin Islands, British ",
      "Virgin Islands, United States",
      "Wales",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe"
     ]
    }
   ],
   "questionTitleLocation": "hidden",
   "title": "Program and Staff"
  },
  {
   "name": "maindoc",
   "elements": [
    {
     "type": "matrixdynamic",
     "name": "PDC",
     "maxWidth": "",
     "title": "Main Substance of Concern / Gambling",
     "isRequired": true,
     "columns": [
      {
       "name": "PDCSubstanceOrGambling",
       "title": "Drug of concern/Gambling",
       "cellType": "dropdown",
       "isRequired": true,
       "choices": [
        {
         "value": "Ethanol",
         "text": "Alcohol (Ethanol)"
        },
        "Amphetamines, n.f.d.",
        "Benzodiazepines, n.f.d.",
        "Caffeine",
        "Cannabinoids and Related Drugs, n.f.d.",
        "Cocaine",
        "Gambling",
        "Heroin",
        "MDMA/Ecstasy",
        "Methadone",
        "Methamphetamine",
        "Nicotine",
        "Pharmaceutical Opioids, n.f.d.",
        "Psychostimulants, n.f.d.",
        {
         "value": "Other Drugs of Concern",
         "text": "--- Other Drugs of Concern ---"
        },
        "1-(3-Trifluoromethylphenyl)-piperazine",
        "1,4-butanediol",
        "1-Benzylpiperazine",
        "2C-B",
        "Acetone",
        "Acetylsalicylic acid",
        "Alcohols, n.e.c.",
        "Aliphatic Hydrocarbons, n.e.c.",
        "Alprazolam",
        "Amisulpride",
        "Amitriptyline",
        "Amphetamine",
        "Amphetamine analogues",
        "Amphetamines, n.e.c.",
        "Amyl nitrate",
        "Amylobarbitone",
        "Anabolic Androgenic Steroids, n.e.c.",
        "Anaesthetics, n.e.c.",
        "Antikaliuretics",
        "Aripriprazole",
        "Aromatic Hydrocarbons, n.e.c.",
        "Atropinic alkaloids",
        "Atypical Antipsychotics, n.e.c.",
        "Barbiturates, n.e.c.",
        "Benzodiazepines, n.e.c.",
        "Beta2 Agonists, n.e.c.",
        "Boldenone",
        "Bromochlorodifluoromethane",
        "Buprenorphine",
        "Butane",
        "Butyl nitrate",
        "Butyrophenones",
        "Cannabinoid agonists",
        "Cannabinoids",
        "Cannabinoids and Related Drugs, n.e.c.",
        "Cathinone",
        "Cathinone analogues",
        "Cathinones, n.e.c.",
        "Chlormethiazole",
        "Chloroform",
        "Chlorpromazine",
        "Chorionic gonadotrophin",
        "Citalopram",
        "Clomipramine ",
        "Clonazepam",
        "Clozapine",
        "Codeine",
        "Corticotrophin",
        "Dehydroepiandrosterone",
        "Dexamphetamine",
        "Diazepam",
        "Diethyltryptamine",
        "Dimethyltryptamine",
        "Diuretics, n.e.c.",
        "DOB",
        "Docylamine",
        "DOI",
        "DOM",
        "Dothiepin",
        "Doxepin",
        "Eformoterol",
        "Ephedra Alkaloids, n.e.c.",
        "Ephedrine",
        "Erythropoietin",
        "Ethyl acetate",
        "Fenoterol",
        "Fentanyl",
        "Fentanyl analogues",
        "Flunitrazepam",
        "Fluoxetine",
        "Fluoxymesterone",
        "Flupenthixol",
        "Fluphenazine",
        "Gamma-butrolactone",
        "Gamma-hydroxybutyrate",
        "GHB type Drugs and Analogues, n.e.c.",
        "Growth hormone",
        "Halogenated Hydrocarbons, n.e.c.",
        "Inadequately Described",
        "Insulin",
        "Kava lactones",
        "Ketamine",
        "Laxatives",
        "Levomethadyl acetate hydrochloride",
        "Lithium",
        "Loop diuretics",
        "Lorazepam",
        "Lysergic acid diethylamide",
        "MDA",
        "MDEA",
        "Meperidine analogues",
        "Mescaline",
        "Mesterolone",
        "Methandriol",
        "Methanol",
        "Methcathinone",
        "Methenolone",
        "Methylphenidate",
        "Methylphenobarbitone",
        "Mianserin",
        "Moclobemide",
        "Monoamine Oxidase Inhibitors, n.e.c.",
        "Morphine",
        "Naloxone",
        "Naltrexone",
        "Nandrolone",
        "Nitrazepam",
        "Nitrous oxide",
        "Non Opioid Analgesics, n.e.c.",
        "Norephedrine",
        "Nortriptyline",
        "Not Stated",
        "Olanzapine",
        "Opioid Antagonists, n.e.c.",
        "Organic Opiate Analgesics, n.e.c.",
        "Other Anabolic Agents and Selected Hormones, n.e.c.",
        "Other Antidepressants and Antipsychotics, n.e.c.",
        "Other Stimulants and Hallucinogens, n.e.c.",
        "Other Volatile Solvents, n.e.c.",
        "Oxandrolone",
        "Oxazepam",
        "Oxycodone",
        "Paracetamol",
        "Paroxetine",
        "Peptide Hormones, Mimetics and Analogues, n.e.c.",
        "Pericyazine",
        "Pethidine",
        "Petroleum",
        "Phencyclidine",
        "Phenelzine",
        "Phenethylamine analogues",
        "Phenethylamines, n.e.c.",
        "Phenobarbitone",
        "Phenothiazines, n.e.c.",
        "Phenylipiperazine analogues",
        "Piperazines, n.e.c.",
        "PMA",
        "PMMA",
        "Promethazine",
        "Propane",
        "Propofol",
        "Pseudoephedrine",
        "Psilocybin or Psilocin",
        "Quetiapine",
        "Risperidone",
        "Salbutamol",
        "Semisynthetic Opioid Analgesics, n.e.c.",
        "Serotonin Reuptake Inhibitors, n.e.c.",
        "Sertraline",
        "Stanozolol",
        "Sulfonylurea hypoglycaemic agents",
        "Synthetic Opioid Analgesics, n.e.c.",
        "Tamoxifen",
        "Temazepam",
        "Testosterone",
        "Tetrachloroethylene",
        "Thiazides",
        "Thioridazine",
        "Thiothixene",
        "Thioxanthenes, n.e.c.",
        "Thyroxine",
        "TMA",
        "Toluene",
        "Tranylcypromine",
        "Trichloroethane",
        "Trichloroethylene",
        "Tricyclic Antidepressants, n.e.c.",
        "Trifluoperazin",
        "Tryptamine anologues",
        "Tryptamines, n.e.c.",
        "Volatile Nitrates, n.e.c.",
        "Xylene",
        "Ziprasidone",
        "Zolpidem",
        "Zopiclone"
       ]
      },
      {
       "name": "PDCMethodOfUse",
       "title": "Method of Use",
       "cellType": "dropdown",
       "isRequired": true,
       "choices": [
        "Ingest",
        "Inject",
        "Smoke",
        "Sniff (powder)",
        "Inhale (vapour)",
        "Transdermal",
        "Sublingual",
        "Other"
       ]
      },
      {
       "name": "PDCDaysInLast28",
       "title": "Days used in last 4 weeks?",
       "cellType": "dropdown",
       "choices": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
       ]
      },
      {
       "name": "PDCUnits",
       "title": "Units",
       "cellType": "dropdown",
       "choices": [
        "standard drinks",
        "cones / joints",
        "quarts",
        "grams",
        "points",
        "$$$",
        "pills",
        "lines",
        "dosage (mgs)",
        "dosage (mls)",
        "cigarettes / darts"
       ]
      },
      {
       "name": "PDCHowMuchPerOccasion",
       "title": "How much per occasion of use?",
       "cellType": "dropdown",
       "choices": [
        "0",
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "10-14",
        "15-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "80-99",
        "100-149",
        "150-200"
       ]
      },
      {
       "name": "PDCAgeFirstUsed",
       "title": "Age First Used",
       "cellType": "text",
       "validators": [
        {
         "type": "numeric",
         "text": "Please enter a value between 5 and 99",
         "minValue": 5,
         "maxValue": 99
        }
       ],
       "inputType": "number"
      },
      {
       "name": "PDCAgeLastUsed",
       "title": "Age Last Used",
       "cellType": "text",
       "validators": [
        {
         "type": "numeric",
         "text": "Please enter a value between 5 and 99",
         "minValue": 5,
         "maxValue": 99
        }
       ],
       "inputType": "number"
      },
      {
       "name": "PDCGoals",
       "title": "Goals",
       "cellType": "dropdown",
       "choices": [
        "Cease Use",
        "Reduce Use",
        "Reduce Harms",
        "Maintain Current level of use",
        "Maintain Abstinence"
       ]
      }
     ],
     "transposeData": true,
     "placeholder": "Please choose...",
     "allowAddRows": false,
     "allowRemoveRows": false,
     "rowCount": 1,
     "maxRowCount": 1,
     "confirmDelete": true,
     "confirmDeleteText": "Are you sure you want to delete this drug?"
    },
    {
     "type": "comment",
     "name": "PDCnotes",
     "title": "Notes",
     "autoGrow": true
    }
   ],
   "visibleIf": "{ClientType} = 'ownuse'",
   "title": "Current Main Substance of Concern / Gambling"
  },
  {
   "name": "odoc",
   "elements": [
    {
     "type": "radiogroup",
     "name": "Anyodc",
     "title": "Any other drugs of concern / historical drug use?",
     "choices": [
      "no",
      "yes"
     ],
     "colCount": 2
    },
    {
     "type": "matrixdynamic",
     "name": "ODC",
     "visible": false,
     "visibleIf": "{Anyodc} = 'yes'",
     "title": "Other Substances of Concern / Gambling / AOD History",
     "description": "Including non-current substance use (up to a maximum of 5).",
     "columns": [
      {
       "name": "OtherSubstancesConcernGambling",
       "title": "Other Substances of Concern",
       "cellType": "dropdown",
       "isUnique": true,
       "choices": [
        {
         "value": "Ethanol",
         "text": "Alcohol (Ethanol)",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Ethanol'"
        },
        {
         "value": "Amphetamines, n.f.d.",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Amphetamines, n.f.d'"
        },
        {
         "value": "Benzodiazepines, n.f.d.",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Benzodiazepines, n.f.d.'"
        },
        {
         "value": "Caffeine",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Caffeine'"
        },
        {
         "value": "Cannabinoids and related drugs, n.f.d.",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Cannabinoids and Related Drugs, n.f.d.'"
        },
        {
         "value": "Cocaine",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Cocaine'"
        },
        {
         "value": "Gambling",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Gambling'"
        },
        {
         "value": "Heroin",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Heroin'"
        },
        {
         "value": "MDMA/Ecstasy",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'MDMA/Ecstasy'"
        },
        {
         "value": "Methadone",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Methadone'"
        },
        {
         "value": "Methamphetamine",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Methamphetamine'"
        },
        {
         "value": "Nicotine",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Nicotine'"
        },
        {
         "value": "Pharmaceutical Opioids, n.f.d.",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> 'Pharmaceutical Opioids, n.f.d.'"
        },
        {
         "value": "Psychostimulants, n.f.d.",
         "visibleIf": "{PDC[0].PDCSubstanceOrGambling} <> '0006'"
        },
        "Other Drugs of Concern"
       ]
      },
      {
       "name": "MethodOfUse",
       "title": "Method of Use",
       "cellType": "dropdown",
       "choices": [
        "Ingest",
        "Inject",
        "Smoke",
        "Sniff (powder)",
        "Inhale (vapour)",
        "Transdermal",
        "Sublingual",
        "Other"
       ]
      },
      {
       "name": "DaysInLast28",
       "title": "Days in last 4 weeks?",
       "cellType": "dropdown",
       "choices": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
       ]
      },
      {
       "name": "Units",
       "cellType": "dropdown",
       "choices": [
        "standard drinks",
        "cones / joints",
        "quarts",
        "grams",
        "points",
        "$$$",
        "pills",
        "lines",
        "dosage (mgs)",
        "dosage (mls)",
        "cigarettes / darts"
       ]
      },
      {
       "name": "HowMuchPerOccasion",
       "title": "How much per occasion of use?",
       "cellType": "dropdown",
       "choices": [
        "0",
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "10-14",
        "15-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "80-99",
        "100-149",
        "150-200",
        "Other"
       ]
      },
      {
       "name": "AgeFirstUsed",
       "title": "Age First Used",
       "cellType": "text",
       "inputType": "number"
      },
      {
       "name": "AgeLastUsed",
       "title": "Age Last Used",
       "cellType": "text",
       "inputType": "number"
      },
      {
       "name": "Goals",
       "cellType": "dropdown",
       "choices": [
        "Cease Use",
        "Reduce Use",
        "Reduce Harms",
        "Maintain Current Level of use",
        "Maintain Abstinence"
       ]
      }
     ],
     "allowAddRows": false,
     "allowRemoveRows": false,
     "rowCount": 5,
     "minRowCount": 5,
     "maxRowCount": 5,
     "confirmDelete": true,
     "confirmDeleteText": "Are you sure you want to delete this drug?",
     "addRowText": "Add another"
    },
    {
     "type": "comment",
     "name": "NotesODC",
     "title": "Notes",
     "autoGrow": true
    },
    {
     "type": "radiogroup",
     "name": "HaveYouEverInjected",
     "visibleIf": "{ClientType} = 'ownuse'",
     "title": "Have you ever injected substances?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "dropdown",
     "name": "HowLongSinceLastInjected",
     "visibleIf": "{HaveYouEverInjected} = 'Yes'",
     "title": "Injecting Drug Status ",
     "description": "How long since you last injected?",
     "choices": [
      "Within last 4 weeks",
      "Within the last three months",
      "More than three months but less than twelve months ago",
      "More than twelve months ago",
      "Never Injected",
      "Not Stated"
     ]
    },
    {
     "type": "radiogroup",
     "name": "HaveYouEverSharedEquipment",
     "visibleIf": "{HaveYouEverInjected} = 'Yes'",
     "title": "Have you shared any injecting equipment? (including needles, syringes, waters, spoons, filters)",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "dropdown",
     "name": "Past4WkNumInjectingDays",
     "visibleIf": "{HowLongSinceLastInjected} = 'Within last 4 weeks'",
     "title": "Number of injecting days in the last 4 weeks?",
     "choices": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28"
     ]
    }
   ],
   "visibleIf": "{ClientType} = 'ownuse'",
   "title": "Other Substances of Concern / AOD History"
  },
  {
   "name": "SDS",
   "elements": [
    {
     "type": "radiogroup",
     "name": "SDSIsAODUseOutOfControl",
     "title": "Do you ever think that your drug / alcohol use is out of control?",
     "choices": [
      {
       "value": "0",
       "text": "Never or almost never"
      },
      {
       "value": "1",
       "text": "Sometimes"
      },
      {
       "value": "2",
       "text": "Often"
      },
      {
       "value": "3",
       "text": "Always"
      }
     ],
     "colCount": 4
    },
    {
     "type": "radiogroup",
     "name": "SDSDoesMissingFixMakeAnxious",
     "title": "Does the prospect of missing a session / fix make you very anxious or nervous?",
     "choices": [
      {
       "value": "0",
       "text": "Never or almost never"
      },
      {
       "value": "1",
       "text": "Sometimes"
      },
      {
       "value": "2",
       "text": "Often"
      },
      {
       "value": "3",
       "text": "Always"
      }
     ],
     "colCount": 4
    },
    {
     "type": "radiogroup",
     "name": "SDSHowMuchDoYouWorryAboutAODUse",
     "title": "How much do you worry about your use of drugs / alcohol?",
     "choices": [
      {
       "value": "0",
       "text": "Not at all"
      },
      {
       "value": "1",
       "text": "A little"
      },
      {
       "value": "2",
       "text": "Often"
      },
      {
       "value": "3",
       "text": "Always or nearly always"
      }
     ],
     "colCount": 4
    },
    {
     "type": "radiogroup",
     "name": "SDSDoYouWishToStop",
     "title": "Do you wish you could stop?",
     "choices": [
      {
       "value": "0",
       "text": "Never or almost never"
      },
      {
       "value": "1",
       "text": "Sometimes"
      },
      {
       "value": "2",
       "text": "Often"
      },
      {
       "value": "3",
       "text": "Always"
      }
     ],
     "colCount": 4
    },
    {
     "type": "radiogroup",
     "name": "SDSHowDifficultToStopOrGoWithout",
     "title": "How difficult would you find it to stop or go without your substance of concern?",
     "choices": [
      {
       "value": "0",
       "text": "Not difficult at all"
      },
      {
       "value": "1",
       "text": "Quite Difficult"
      },
      {
       "value": "2",
       "text": "Very difficult"
      },
      {
       "value": "3",
       "text": "Impossible"
      }
     ],
     "colCount": 4
    },
    {
     "type": "expression",
     "name": "SDS_Score",
     "visible": false,
     "title": "SDS score",
     "expression": "{SDSIsAODUseOutOfControl} + {SDSDoesMissingFixMakeAnxious} + {SDSHowMuchDoYouWorryAboutAODUse}+{SDSDoYouWishToStop}+{SDSHowDifficultToStopOrGoWithout}"
    }
   ],
   "visible": false,
   "visibleIf": "{ClientType} = 'ownuse'",
   "title": "Severity of Dependence Scale",
   "description": "(in relation to Main Drug of Concern)"
  },
  {
   "name": "Smoking",
   "elements": [
    {
     "type": "radiogroup",
     "name": "DoYouSmoke",
     "title": "Do you smoke cigarettes or nicotine vapes?",
     "requiredIf": "{Program} anyof ['TSS', 'TEST']",
     "choices": [
      "Yes",
      "No"
     ]
    },
    {
     "type": "radiogroup",
     "name": "TobaccoAsSpin",
     "title": "Do you use tobacco as spin with your marijuana?",
     "requiredIf": "{Program} anyof ['TSS', 'TEST']",
     "choices": [
      {
       "value": "Alway",
       "text": "Yes- always"
      },
      {
       "value": "Sometimes",
       "text": "Yes- sometimes"
      },
      {
       "value": "Never",
       "text": "No - never"
      },
      {
       "value": "N/A",
       "text": "N/A - I don't smoke marijuana"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "MotivationToQuit",
     "visibleIf": "{AssessmentType} = 'ITSPReview' and {DoYouSmoke} = 'Yes'",
     "title": "How motivated are you to quit or reduce your smoking?",
     "requiredIf": "{DoYouSmoke} = 'Yes' and {Program} = 'TSS'",
     "choices": [
      {
       "value": "1",
       "text": "Not at all"
      },
      {
       "value": "2",
       "text": "A little "
      },
      {
       "value": "3",
       "text": "Willing to try"
      },
      {
       "value": "4",
       "text": "Quite motivated"
      },
      {
       "value": "5",
       "text": "Extremely motivated"
      }
     ],
     "colCount": 5
    },
    {
     "type": "matrix",
     "name": "MotivationtoQuit",
     "visibleIf": "{DoYouSmoke} = 'Yes' and {Program} = 'TSS'",
     "title": "How motivated are you to quit or reduce your smoking?",
     "columns": [
      {
       "value": "1",
       "text": "Not at all"
      },
      {
       "value": "2",
       "text": "A little"
      },
      {
       "value": "3",
       "text": "Willing to try"
      },
      {
       "value": "4",
       "text": "Quite motivated"
      },
      {
       "value": "5",
       "text": "Extremely motivated"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "ManagingQuitting",
     "visibleIf": "{DoYouSmoke} = 'Yes' and {MotivationToQuit} <> 1",
     "title": "How well are you managing in trying to quit or reduce your smoking?",
     "choices": [
      {
       "value": "1",
       "text": "Not well - I haven't been able to make any changes to my smoking"
      },
      {
       "value": "2",
       "text": "I'm really struggling"
      },
      {
       "value": "3",
       "text": "It's a challenge but I'm still trying "
      },
      {
       "value": "4",
       "text": "I'm making progress"
      },
      {
       "value": "5",
       "text": "I'm managing really well - successfully quitting or educing"
      }
     ],
     "otherText": "I'm making progress"
    }
   ],
   "visibleIf": "{Program} anyof ['TSS', 'TEST', 'ALONGSIDE']",
   "title": "Smoking"
  },
  {
   "name": "CDS5",
   "elements": [
    {
     "type": "radiogroup",
     "name": "CDS5RateAddictiontoCigarettes",
     "title": "Please rate your addiction to cigarettes on a scale of 1-100 (NOT addicted to cigarettes at all = 0 / Extremely addicted to cigarettes = 100)",
     "requiredIf": "{Program} = 'TSS'",
     "choices": [
      {
       "value": "1",
       "text": "0-20"
      },
      {
       "value": "2",
       "text": "21-40"
      },
      {
       "value": "3",
       "text": "41-60"
      },
      {
       "value": "4",
       "text": "61-80"
      },
      {
       "value": "5",
       "text": "81-100"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "CDS5HowManyCigarettesPerDay",
     "title": "On average, how many cigarettes do you smoke per day?",
     "requiredIf": "{Program} = 'TSS'",
     "choices": [
      {
       "value": "1",
       "text": "0-5"
      },
      {
       "value": "2",
       "text": "6-10"
      },
      {
       "value": "3",
       "text": "11-20"
      },
      {
       "value": "4",
       "text": "21-29"
      },
      {
       "value": "5",
       "text": "30+"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "CDS5HowSoonAfterWaking",
     "title": "Usually, how soon after waking up do you smoke your first cigarette?",
     "requiredIf": "{Program} = 'TSS'",
     "choices": [
      {
       "value": "5",
       "text": "0-5 minutes"
      },
      {
       "value": "4",
       "text": "6-15 minutes"
      },
      {
       "value": "3",
       "text": "16-30 minutes"
      },
      {
       "value": "2",
       "text": "31-60 minutes"
      },
      {
       "value": "1",
       "text": "61 + minutes"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "CDS5HowHardIsQuitting",
     "title": "For you, quitting smoking would be:",
     "requiredIf": "{Program} = 'TSS'",
     "choices": [
      {
       "value": "5",
       "text": "Impossible"
      },
      {
       "value": "4",
       "text": "Very Difficult"
      },
      {
       "value": "3",
       "text": "Fairly Difficult"
      },
      {
       "value": "2",
       "text": "Fairly Easy"
      },
      {
       "value": "1",
       "text": "Very Easy"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "CDS5HowStrongTheUrgeToSmoke",
     "title": "Do you agree with the following statement?                           \nAfter a few hours without smoking, I feel an irresistible urge to smoke",
     "requiredIf": "{Program} = 'TSS'",
     "choices": [
      {
       "value": "1",
       "text": "Totally disagree"
      },
      {
       "value": "2",
       "text": "Somewhat disagree"
      },
      {
       "value": "3",
       "text": "Neither agree nor disagree"
      },
      {
       "value": "4",
       "text": "Somewhat agree"
      },
      {
       "value": "5",
       "text": "Fully agree"
      }
     ]
    },
    {
     "type": "expression",
     "name": "CDS5_Score",
     "visible": false,
     "title": "CDS 5 ",
     "expression": "{CDS5RateAddictiontoCigarettes}+{CDS5HowManyCigarettesPerDay}+{CDS5HowSoonAfterWaking}+{CDS5HowHardIsQuitting}+{CDS5HowStrongTheUrgeToSmoke}"
    }
   ],
   "visibleIf": "{DoYouSmoke} = 'Yes' and {Program} anyof ['TSS', 'TEST', 'ALONGSIDE']",
   "requiredIf": "{DoYouSmoke} = 'Yes'",
   "title": "CDS-5",
   "description": "Cigarette Dependence Scale "
  },
  {
   "name": "impact",
   "elements": [
    {
     "type": "checkbox",
     "name": "Past4WkAodRisks",
     "title": "In the last 4 weeks, have you experienced any of the following risks?",
     "showCommentArea": true,
     "choices": [
      "Memory Loss",
      "Using Alone",
      "Using more than one drug at a time",
      "Violence / Assault",
      "Unsafe sex",
      "Blackouts",
      {
       "value": "Driving with drugs and/or alcohol in your system",
       "text": "Driving with drugs and/or alcohol in your system (DUI)"
      },
      "Sharing injecting equipment",
      "Overdose or hospitalisation from drinking / using drugs",
      "Attended by an ambulance or been in hospital"
     ],
     "otherText": "Other / Notes",
     "colCount": 2
    },
    {
     "type": "radiogroup",
     "name": "Past4WkAnyOtherAddictiveB",
     "visibleIf": "{Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "Are there any other behaviours that you find difficult to manage? Gaming, social media, porn, sex, gambling etc",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "BehavioursOfDependenceNotes",
     "title": "Other Behaviours  (Notes)",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "SubstanceUseITSPIssues",
     "title": "SUBSTANCE USE SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "SubstanceUseITSPGoals",
     "title": "SUBSTANCE USE GOALS - NOTES FOR ITSP ",
     "autoGrow": true
    }
   ],
   "visible": false,
   "visibleIf": "{ClientType} = 'ownuse'",
   "title": "Impact of Substance Use"
  },
  {
   "name": "everydayliving",
   "elements": [
    {
     "type": "radiogroup",
     "name": "Past4WkDailyLivingImpacted",
     "title": "Impact on Daily Living",
     "description": "During the last 4 weeks, how often has substance use (or other dependent behaviour) impacted on your work or other daily living activities (like: social, recreational. study, caring for family)?",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 5
    },
    {
     "type": "matrixdropdown",
     "name": "Past4WkEngagedInOtheractivities",
     "maxWidth": "900px",
     "title": "In the last 4 weeks, have you engaged in any of the following?",
     "columnMinWidth": "130px",
     "columns": [
      {
       "name": "Frequency",
       "cellType": "dropdown",
       "choices": [
        "Daily or almost daily",
        "Three or four times per week",
        "Once or twice per week",
        "Less than weekly",
        "Not at all"
       ]
      },
      {
       "name": "Days",
       "title": "How many days? (0-28)",
       "cellType": "dropdown",
       "choices": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
       ]
      }
     ],
     "horizontalScroll": true,
     "choices": [
      "0",
      "1-4",
      "5-9",
      "10-14",
      "15-19",
      "20-24",
      "25-28"
     ],
     "rows": [
      "Paid Work",
      "Voluntary Work",
      "Study - college, school or vocational education",
      "Looking after children",
      "Other caregiving activities"
     ]
    },
    {
     "type": "checkbox",
     "name": "HowDoYouSpendTime",
     "visibleIf": "{Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "Meaningful Use of Time",
     "description": "Is there anything you would like to spend more time on?",
     "choices": [
      {
       "value": "HobbiesSportsRecreation",
       "text": "Hobbies, Sport & Recreation"
      },
      {
       "value": "FamilyHome",
       "text": "Family & Home"
      },
      {
       "value": "MeTime",
       "text": "Me Time"
      },
      {
       "value": "OtherBehavioursDependence",
       "text": "Other Behaviours of Dependence (eg. gaming, social media)"
      },
      {
       "value": "WorkOrStudy",
       "text": "Work / Study"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "PrioritiseCare",
     "visibleIf": "({ClientType} = 'ownuse') or ({Program} = 'ALONGSIDE') or {Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "Daily Care of Self & Others",
     "description": "How well are you able to prioritise and maintain the care and wellbeing of yourself and/or others that you are caring for?",
     "choices": [
      "Very well",
      "Reasonably well",
      "Moderately well",
      "Not very well",
      "I'm unable to"
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "ManagingImpact",
     "visibleIf": "{ClientType} = 'othersuse'",
     "title": "Managing Impact",
     "description": "How well are you able to manage the impact of the other person's substance use on your life?",
     "choices": [
      "Very well",
      "Reasonably well",
      "Moderately well",
      "Not very well",
      "I'm unable to"
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "SetBoundariesPrioritiseWellbeing",
     "visibleIf": "{ClientType} = 'othersuse'",
     "title": "How well are you able to set boundaries and prioritise your own wellbeing?",
     "choices": [
      "Very well",
      "Reasonably well",
      "Moderately well",
      "Not very well",
      "I'm unable to"
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "CapableManaging",
     "visibleIf": "{Program} = 'ALONGSIDE'",
     "title": "How capable do you feel about managing your daily activities ?",
     "choices": [
      {
       "value": "Very",
       "text": "Very capable"
      },
      {
       "value": "Somewhat",
       "text": "Somewhat capable, but still need assistance"
      },
      {
       "value": "Little",
       "text": "A little capable but need lots of assistance"
      },
      {
       "value": "Notcapable",
       "text": "Not capable at all"
      }
     ]
    },
    {
     "type": "comment",
     "name": "EverydayLivingITSPIssues",
     "title": "EVERYDAY LIVING SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "EverydayLivingITSPGoals",
     "title": "EVERYDAY LIVING GOALS - NOTES FOR ITSP ",
     "autoGrow": true
    }
   ],
   "title": "Everyday Living"
  },
  {
   "name": "housingsafety",
   "elements": [
    {
     "type": "dropdown",
     "name": "UsualAccommodation",
     "title": "Usual Accommodation",
     "description": "(prior to treatment episode)",
     "choices": [
      "Private residence",
      "Boarding house/private hotel",
      "Informal housing",
      "None/homeless/public place",
      "Domestic-scale supported living facility",
      "Supported accommodation facility",
      "Short term crisis, emergency or transitional accommodation facility",
      "Acute hospital",
      "Psychiatric hospital",
      "Rehabilitation hospital",
      "Other hospital",
      "Residential aged care facility",
      "Mental health",
      "Alcohol and other drugs",
      "Other specialised community residential",
      "Prison/remand centre/youth training centre",
      "Other",
      "Unknown",
      "Not stated/inadequately described"
     ]
    },
    {
     "type": "dropdown",
     "name": "LivingArrangement",
     "title": "Living Arrangement",
     "description": "The people with whom the client is/was living just prior to the start of the treatment episode.",
     "choices": [
      "Alone",
      "Spouse/partner",
      "Alone with child(ren)",
      "Spouse/partner and child(ren)",
      "Parent(s)",
      "Other relative(s)",
      "Friend(s)",
      "Friend(s)/parent(s)/relative(s) and child(ren)",
      "Other",
      "Not known/inadequately described"
     ]
    },
    {
     "type": "dropdown",
     "name": "YourCurrentHousing",
     "title": "Your Current Housing",
     "commentText": "Notes",
     "choices": [
      "Stable permanent housing",
      "Some issues - but mostly ok",
      "At risk of eviction",
      "Temporary housing / couch surfing",
      "Homeless"
     ]
    },
    {
     "type": "radiogroup",
     "name": "Past4WkDifficultyFindingHousing",
     "title": "Housing Stability",
     "description": "In the past 4 weeks, have you had any difficulties with housing or finding somewhere stable to live? ",
     "commentText": "Notes",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "DoYouFeelSafeWhereYouLive",
     "title": "Physical Safety",
     "description": "Do you feel safe where you live?",
     "commentText": "Notes",
     "choices": [
      "Yes - Completely safe",
      "Mostly safe. Sometimes feel threatened",
      "Often feel unsafe / Occasionally experience violence",
      "Never feel safe / Constantly exposed to violence"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "HousingSafetyITSPIssues",
     "title": "HOUSING & SAFETY SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "HousingSafetyITSPGoals",
     "title": "HOUSING & SAFETY GOALS - NOTES FOR ITSP",
     "autoGrow": true
    }
   ],
   "title": "Housing & Safety"
  },
  {
   "name": "physicalhealth",
   "elements": [
    {
     "type": "matrix",
     "name": "Past4WkPhysicalHealth",
     "title": "How has your physical health been, in the last 4 weeks?",
     "description": "10 is the best possible",
     "columns": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
     ]
    },
    {
     "type": "radiogroup",
     "name": "Past4WkHowOftenPhysicalHealthCausedProblems",
     "title": "In the last 4 weeks, how often has your physical health caused problems in your daily life?",
     "commentText": "Notes",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "Past4WkBeenHospCallAmbulance",
     "visibleIf": "{Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "In the past 4 weeks have you been in hospital or needed to call an ambulance?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "Past4WkBeenHospCallAmbulanceNotes",
     "visibleIf": "{Past4WkBeenHospCallAmbulance} = 'Yes'",
     "title": "If Yes, please provide details",
     "requiredIf": "{Past4WkBeenHospCallAmbulance} = 'Yes'",
     "autoGrow": true
    },
    {
     "type": "radiogroup",
     "name": "AreYouCurrentlyTakingMeds",
     "title": "Are you currently taking any medications (for either physical or mental health issues)?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "MedicationsNotes",
     "visibleIf": "{AreYouCurrentlyTakingMeds} = 'Yes'",
     "title": "If Yes, please provide details",
     "requiredIf": "{AreYouCurrentlyTakingMeds} = 'Yes'",
     "autoGrow": true
    },
    {
     "type": "checkbox",
     "name": "HealthChecklist_STAFF",
     "title": "HEALTH CHECKLIST (for staff only)",
     "description": "Does the client need support/referral for any of the following ?",
     "choices": [
      {
       "value": "Vaccinations",
       "text": "Vaccinations (eg. Hep-C / Flu)"
      },
      {
       "value": "BBVScreening",
       "text": "BBV Screening"
      },
      {
       "value": "SexualHealth",
       "text": "Sexual Health (eg. STD Screening / Family Planning)"
      },
      "Dental"
     ]
    },
    {
     "type": "comment",
     "name": "PhysicalHealthITSPIssues",
     "title": "PHYSICAL HEALTH & WELLBEING SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "PhysicalHealthITSPGoals",
     "title": "PHYSICAL HEALTH & WELLBEING GOALS - NOTES FOR ITSP",
     "autoGrow": true
    }
   ],
   "title": "Physical Health & Wellbeing"
  },
  {
   "name": "mentalhealth",
   "elements": [
    {
     "type": "matrix",
     "name": "Past4WkMentalHealth",
     "title": "How has your psychological / mental health been, in the last 4 weeks?",
     "description": "Do you have moods, fears, emotions or other thoughts that concern you?\n(rate out of 10 ; 10 is the best possible)",
     "columns": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
     ]
    },
    {
     "type": "radiogroup",
     "name": "Past4WkHowOftenMentalHealthCausedProblems",
     "title": "In the last 4 weeks, how often has your mental health created problems in your daily life?",
     "commentText": "Notes",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "EverDiagnosedMentalHealthIssue",
     "title": "Have you ever been diagnosed with a mental health issue?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "dropdown",
     "name": "WhenMentalHealthDiagnosis",
     "visibleIf": "{EverDiagnosedMentalHealthIssue} = 'Yes'",
     "title": "When were you diagnosed?",
     "requiredIf": "{EverDiagnosedMentalHealthIssue} = 'Yes'",
     "showCommentArea": true,
     "commentText": "Please provide details of your diagnosis (including who diagnosed you and when)",
     "choices": [
      "Within last 3 months",
      "More than 3 months but less than 12 months ago",
      "More than 12 months ago"
     ]
    },
    {
     "type": "checkbox",
     "name": "MHRecentRiskIssues",
     "title": "Mental Health - Recent Risk Issues ",
     "description": "(occurring in last 4 weeks - IF DISCLOSED BY CLIENT)",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "Suicidal thoughts, ideation, planning, attempts (RISK ASSESSMENT)",
      "Mood or affect concerns, including profound, persistent hopelessness (RISK ASSESSMENT)",
      "Currently on PTO",
      "Emotional abuse",
      "Suicide of significant other",
      "Recent Loss",
      "Extreme stress",
      "Self Injury",
      "Impulsive and/or aggressive tendencies",
      "Withdrawn",
      "Recent sexual abuse",
      "Recent physical abuse",
      "Prison / custody / legal problems",
      "Thought content concerns, including delusional content",
      "Other traumatic event"
     ]
    },
    {
     "type": "checkbox",
     "name": "MHHistoricalRiskIssues",
     "title": "Mental Health - Historical & Contextual Risk Issues",
     "description": "(occurring prior to the last 4 weeks - ONLY IF DISCLOSED BY CLIENT)",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "History of mental health issues",
      "Serious, ongoing physical illness",
      "Past sexual abuse",
      "Past physical abuse",
      "Prison, custody, legal problems",
      "Suicide of significant other",
      "History of impulsive and/or aggressive actions",
      "Previously on PTO",
      "Emotional abuse",
      {
       "value": "Suicidal thoughts, ideation, planning, attempts (RISK ASSESSMENT)",
       "text": "Suicidal thoughts, ideation, planning, attempts (IS A RISK ASSESSMENT REQUIRED?)"
      }
     ],
     "otherText": "Other traumatic event"
    },
    {
     "type": "matrix",
     "name": "HowOftenNegativeFeelings",
     "visibleIf": "{Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "How often do you have negative feelings such as blue mood, despair, anxiety, depression?",
     "columns": [
      {
       "value": "1",
       "text": "Never"
      },
      {
       "value": "2",
       "text": "Seldom"
      },
      {
       "value": "3",
       "text": "Quite Often"
      },
      {
       "value": "4",
       "text": "Very Often"
      },
      {
       "value": "5",
       "text": "Always"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "doK10",
     "visibleIf": "{Program} anyof ['SAPPHIRE', 'EUROPATH', 'MONPATH', 'BEGAPATH', 'TEST']",
     "title": "K10 assessment for psychological distress?",
     "enableIf": "{Program} anyof ['SAPPHIRE', 'EUROPATH', 'MONPATH', 'BEGAPATH', 'TEST']",
     "defaultValue": "Yes",
     "choices": [
      "Yes",
      "No"
     ]
    },
    {
     "type": "radiogroup",
     "name": "K10Q01",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 1 -  In the last 4 weeks, about how often did you feel tired out for no good reason?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q02",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 2 - In the last 4 weeks, about how often did you feel nervous?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q03",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 3 - In the last 4 weeks, about how often did you feel so nervous that nothing could calm you down?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q04",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 4 - In the last 4 weeks, about how often did you feel hopeless?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q05",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 5 - In the last 4 weeks, about how often did you feel restless or fidgety?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q06",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 6 - In the last 4 weeks, about how often did you feel so restless you could not sit still?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q07",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 7 - In the last 4 weeks, about how often did you feel depressed?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q08",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 8 - In the last 4 weeks, about how often did you feel that everything was an effort?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q09",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 9 - In the last 4 weeks, about how often did you feel so sad that nothing could cheer you up?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "K10Q10",
     "visibleIf": "({doK10} = 'Yes') or ({Program} anyof ['MURMPP', 'MURMWIO', 'MURMICE', 'MURMHEAD', 'GOLBGNRL', 'GOLBICE', 'ALONGSIDE'])",
     "title": "K10 Question 10 - In the last 4 weeks, about how often did you feel worthless?",
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ],
     "colCount": 5
    },
    {
     "type": "expression",
     "name": "K10_Score",
     "visible": false,
     "expression": "{K10Q01}+{K10Q02}+{K10Q03}+{K10Q04}+{K10Q05}+{K10Q06}+{K10Q07}+{K10Q08}+{K10Q09}+{K10Q10}"
    },
    {
     "type": "radiogroup",
     "name": "K10Q11",
     "visibleIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "title": "K10+ Question 11 - In the last four weeks, how many days were you totally unable to work, study or manage your day to day activities because of these feelings?",
     "requiredIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "choices": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28"
     ]
    },
    {
     "type": "radiogroup",
     "name": "K10Q12",
     "visibleIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "title": "K10+ Question 12 - Aside from the days above, in the last 4 weeks, how many days were you able to work or study or manage your day to day activities, but had to cut down on what you did because of these feelings? ",
     "requiredIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "choices": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28"
     ]
    },
    {
     "type": "radiogroup",
     "name": "K10Q13",
     "visibleIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "title": "K10+ Question 13 - In the last 4 weeks, how many times  have you seen a doctor or any other health professional about these feelings?",
     "requiredIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "choices": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28"
     ]
    },
    {
     "type": "radiogroup",
     "name": "K10Q14",
     "visibleIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "title": "K10+ Question 14 - In the last 4 weeks, how often have physical  health problems been the main cause of these feelings?",
     "requiredIf": "{Program} anyof ['PSYCHNSW', 'PSYCHACT','ALONGSIDE']",
     "choices": [
      {
       "value": "1",
       "text": "None of the time"
      },
      {
       "value": "2",
       "text": "A little of the time"
      },
      {
       "value": "3",
       "text": "Some of the time"
      },
      {
       "value": "4",
       "text": "Most of the time"
      },
      {
       "value": "5",
       "text": "All of the time"
      }
     ]
    },
    {
     "type": "comment",
     "name": "MentalITSPIssues",
     "title": "MENTAL HEALTH & WELLBEING SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "MentalHealthITSPGoals",
     "title": "MENTAL HEALTH & WELLBEING GOALS - NOTES FOR ITSP",
     "autoGrow": true
    }
   ],
   "title": "Mental Health & Wellbeing"
  },
  {
   "name": "relationships",
   "elements": [
    {
     "type": "radiogroup",
     "name": "HaveAnySocialSupport",
     "title": "Do you have any positive family and/or social support around you?",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "A wide range",
      "Quite a lot",
      "Some",
      "A few",
      "None"
     ],
     "colCount": 5
    },
    {
     "type": "radiogroup",
     "name": "Past4WkUseLedToProblemsWithFamilyFriend",
     "title": "In the last 4 weeks, how often has substance use led to problems or arguments with family members or friends?",
     "commentText": "Notes",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "HaveDVOrFamilySafetyConcerns",
     "title": "Do you have any domestic violence or family safety concerns?",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "No",
      "Yes - in the past 4 weeks (risk assessment required)"
     ]
    },
    {
     "type": "radiogroup",
     "name": "Past4WkHaveYouViolenceAbusive",
     "title": "Have you used violence or been abusive towards anyone, over the last 4 weeks?",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "No",
      "Yes (risk assessment required)"
     ]
    },
    {
     "type": "radiogroup",
     "name": "Past4WkHadCaregivingResponsibilities",
     "visibleIf": "{Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "In the last 4 weeks, have you had any parenting / caregiving responsibilities?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "checkbox",
     "name": "PrimaryCaregiver",
     "visibleIf": "{Past4WkHadCaregivingResponsibilities} = 'Yes'",
     "title": "Are you the primary caregiver for, or living with, any children?",
     "showCommentArea": true,
     "commentText": "If Yes - is the children's care impacted by either your own, or another person's, substance use?",
     "choices": [
      "Yes - primary caregiver: children under 5 years old",
      "Yes - primary caregiver: children 5 - 15 years old",
      "Yes - primary caregiver: children 15 - 18 years old",
      "Yes - parenting responsibilities but children don't live with me",
      "Yes - parenting responsibilities for children other than my own",
      "Living with children other than my own, but no parental responsibility",
      "No"
     ]
    },
    {
     "type": "radiogroup",
     "name": "ChildProtectionConcerns",
     "title": "Are there any child protection concerns?",
     "description": "Have either DCJ (NSW) or OCYFS (ACT) been involved with your family?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "ChildProtectionDetails",
     "visibleIf": "{ChildProtectionConcerns} = 'Yes'",
     "title": "If Yes, please provide details",
     "requiredIf": "{ChildProtectionConcerns} = 'Yes'",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "RelationshipsITSPIssues",
     "title": "RELATIONSHIPS, PARENTING & SOCIAL WELLBEING SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "RelationshipsITSPGoals",
     "title": "RELATIONSHIPS, PARENTING & SOCIAL WELLBEING GOALS - NOTES FOR ITSP",
     "autoGrow": true
    }
   ],
   "title": "Relationships, Parenting & Social Wellbeing"
  },
  {
   "name": "legal",
   "elements": [
    {
     "type": "radiogroup",
     "name": "HaveYouServedCustodialSentenceInPast",
     "visibleIf": "{ClientType} = 'ownuse' and {Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "Have you served a custodial sentence in the past?",
     "showCommentArea": true,
     "commentText": "If Yes - please provide details",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "radiogroup",
     "name": "Past4WkBeenArrested",
     "visibleIf": "{ClientType} = 'ownuse' ",
     "title": "Have you been arrested in the last 4 weeks?",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "radiogroup",
     "name": "Past4WkHowOftenIllegalActivities",
     "visibleIf": "{ClientType} = 'ownuse' and {Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "In the last 4 weeks, how often have you been involved in any illegal activities? (eg. DUI, assault, shoplifting, supplying drugs)?",
     "commentText": "Notes",
     "choices": [
      "Not at all",
      "Less than weekly",
      "Once or twice per week",
      "Three or four times per week",
      "Daily or almost daily"
     ],
     "colCount": 3
    },
    {
     "type": "radiogroup",
     "name": "SubjectToCourtOrdersOrPendingCharges",
     "visibleIf": "{ClientType} = 'ownuse' ",
     "title": "Are you currently subject to court orders or have any charges pending?",
     "showCommentArea": true,
     "commentText": "If Yes - please provide details",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "radiogroup",
     "name": "LegalIssuesDueToOthersUse",
     "visibleIf": "{ClientType} = 'othersuse'",
     "title": "Have you experienced any legal issues as a result of another person's substance use?",
     "enableIf": "{ClientType} = 'othersuse'",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "radiogroup",
     "name": "NeedHelpWrkDevlpmntOrdrPayingOutstndngFines",
     "visibleIf": "{ClientType} = 'ownuse'",
     "title": "Do you need help with a Work Development Order to pay off any outstanding fines?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "comment",
     "name": "LegalITSPIssues",
     "title": "LEGAL SUMMARY - NOTES FOR ITSP",
     "autoGrow": true
    },
    {
     "type": "comment",
     "name": "LegalITSPGoals",
     "title": "LEGAL GOALS - NOTES FOR ITSP",
     "autoGrow": true
    }
   ],
   "title": "Legal"
  },
  {
   "name": "right now",
   "elements": [
    {
     "type": "radiogroup",
     "name": "HowImportantIsChangeToYou",
     "visibleIf": "{ClientType} = 'ownuse' {Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "How important is change to you?",
     "showCommentArea": true,
     "commentText": "Notes",
     "choices": [
      "Critical for me. I need to change",
      "Really important. I'd like to change",
      "Not really important. I don't really care if I change or not",
      "Not at all. I don't want to change"
     ],
     "colCount": 2
    },
    {
     "type": "matrix",
     "name": "HowCloseToManagingSubstanceUse",
     "visibleIf": "{ClientType} = 'ownuse'",
     "minWidth": "800px",
     "maxWidth": "",
     "title": "How close are you to where you want to be in managing your substance use?",
     "columns": [
      {
       "value": "1",
       "text": "Nowhere near"
      },
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      {
       "value": "10",
       "text": "Achieved my goals"
      }
     ]
    },
    {
     "type": "text",
     "name": "Notes-HowCloseToManagingSubstanceUse",
     "visibleIf": "{ClientType} = 'ownuse'",
     "title": "Notes",
     "hideNumber": true
    },
    {
     "type": "radiogroup",
     "name": "HowSatisfiedWithProgress",
     "visibleIf": "{ClientType} = 'ownuse' and {Program} <> 'PCS - Goulburn' or {Program} <> 'PCS - Bega' or {Program} <> 'PCS - Eurobodalla' or {Program} <> 'PCS - Murrumbidgee'",
     "title": "How satisfied are you with your progress towards achieving your goals?",
     "choices": [
      "Not at all",
      "Slightly",
      "Moderately",
      "Considerably",
      "Extremely"
     ],
     "colCount": 5
    },
    {
     "type": "matrix",
     "name": "HowCloseToManagingImpactOfOthersUse",
     "visibleIf": "{ClientType} = 'othersuse'",
     "minWidth": "800px",
     "maxWidth": "",
     "title": "How close are you to where you want to be in managing the impact of the other person's substance use? ",
     "columns": [
      {
       "value": "1",
       "text": "Nowhere near"
      },
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      {
       "value": "10",
       "text": "Achieved my goals"
      }
     ]
    },
    {
     "type": "text",
     "name": "Notes-HowCloseToManagingImpactOfOthersUse",
     "visibleIf": "{ClientType} = 'othersuse'",
     "title": "Notes",
     "hideNumber": true
    },
    {
     "type": "matrix",
     "name": "Past4WkQualityOfLifeScore",
     "minWidth": "800px",
     "maxWidth": "",
     "title": "So, now we've gone through everything, how would you rate your quality of life over the last 4 weeks? ",
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": "Poor Quality of Life"
      },
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      {
       "value": "10",
       "text": "Really Good Quality of Life"
      }
     ]
    },
    {
     "type": "text",
     "name": "Notes-Past4WkQualityOfLifeScore",
     "title": "Notes",
     "hideNumber": true
    },
    {
     "type": "radiogroup",
     "name": "AreYouAccessingOtherServices",
     "title": "Are you accessing support from any other services at the moment?",
     "choices": [
      "No",
      "Yes"
     ],
     "colCount": 2
    },
    {
     "type": "checkbox",
     "name": "SupportFromWhichOtherServices",
     "visibleIf": "{AreYouAccessingOtherServices} = 'Yes'",
     "title": "Which services?",
     "showCommentArea": true,
     "commentText": "Please provide details",
     "choices": [
      {
       "value": "Medical Practitioner",
       "text": "GP"
      },
      "Psychologist",
      "Lawyer",
      "Other alcohol and drug treatment service",
      "Mental health care service",
      {
       "value": "Other community health care service",
       "text": "Other community service"
      },
      "Correctional service",
      "Hospital",
      {
       "value": "item1",
       "text": "Housing"
      },
      "Other"
     ]
    }
   ],
   "title": "Where are you at, right now?"
  },
  {
   "name": "officeuse",
   "elements": [
    {
     "type": "checkbox",
     "name": "SupportTypeBestMatchesNeedsGoals",
     "title": "What type of support best matches client needs and goals?",
     "isRequired": true,
     "commentText": "Notes",
     "choices": [
      "Walk-In Support",
      "Information & Education",
      "AOD Brief Intervention (1-3 sessions, then review)",
      "AOD counselling & support (3 - 6 sessions, then review)",
      "Case Management",
      {
       "value": "Group participation - ADAPT / SMART Recovery / COMPASS / Butt it Out",
       "text": "Group participation - ADAPT / SMART Recovery / COMPASS"
      },
      {
       "value": "Arcadia Residential Service - Non-medicated Detox Program 1 week",
       "text": "Arcadia House Residential - Non-medicated Detox Program 1 week"
      },
      {
       "value": "Arcadia Residential Service - 12 week Transition Program",
       "text": "Arcadia House Residential Rehab "
      },
      {
       "value": "Arcadia Residential Service - 12 week Day Program",
       "text": "Arcadia House  Day Program"
      },
      {
       "value": "Althea GP",
       "text": "GP"
      },
      {
       "value": "Althea Nurse",
       "text": "Nurse"
      },
      "Psychologist / Mental Health Worker",
      {
       "value": "Althea Pharmacist",
       "text": "Pharmacist"
      },
      {
       "value": "Althea Psychiatrist",
       "text": "Psychiatrist"
      },
      "Support, information and/or counselling as a family member or friend of a person with a substance use issues",
      "Supported Home Detox",
      "Aboriginal Health Worker",
      "Primary Health Support",
      {
       "value": "Butt it Out Smoking Cessation",
       "text": "ACT - Butt it Out"
      },
      {
       "value": "Alongside",
       "text": "ACT Alongside Psychosocial Support Program"
      }
     ]
    },
    {
     "type": "checkbox",
     "name": "ExternalReferrals",
     "title": "External referrals required to match client needs and goals",
     "showCommentArea": true,
     "commentText": "Notes / Details",
     "choices": [
      "Substance Use",
      "Housing & Safety",
      "Everyday Living",
      "Physical Health",
      "Mental Health",
      "Relationships / Parenting / Social Wellbeing",
      "Legal",
      "Other"
     ]
    },
    {
     "type": "checkbox",
     "name": "RiskAssessmentChecklist",
     "title": "RISK ASSESSMENT CHECKLIST",
     "isRequired": true,
     "choices": [
      {
       "value": "IndicationMHRisks",
       "text": "Any indication of mental health risks?"
      },
      {
       "value": "IndicationSuicide",
       "text": "Any indication of suicidal ideation?"
      },
      {
       "value": "IndicationDV",
       "text": "Any indication of domestic / family violence?"
      },
      {
       "value": "PotentialOD",
       "text": "Any potential risk of overdose?"
      },
      {
       "value": "NoRiskIndication",
       "text": "No Indications of risk"
      }
     ]
    },
    {
     "type": "comment",
     "name": "RiskAssessmentNotes",
     "title": "Risk Assessment Notes",
     "autoGrow": true
    },
    {
     "type": "checkbox",
     "name": "FinalChecklist",
     "title": "CHECKLIST",
     "isRequired": true,
     "choices": [
      {
       "value": "RiskAssessmentsCompleted",
       "text": "Risk Assessments Completed (if indicated)"
      },
      {
       "value": "ConsentToShareInfo",
       "text": "Client Consent to Share Information - signed"
      },
      {
       "value": "ProvidedWithRightsResponsibilities",
       "text": "Client provided with Rights and Responsibilities"
      },
      {
       "value": "ProvidedFeedbackComplaintsProc",
       "text": "Client provided with Feedback and Complaints process"
      },
      {
       "value": "FeedbackToReferrer",
       "text": "Feedback provided to referrer, if required"
      },
      {
       "value": "BriefInterventionOptionExplained",
       "text": "Brief Intervention Treatment option explained to client"
      },
      {
       "value": "WalkInExplained",
       "text": "'Walk-in' explained to client "
      }
     ]
    }
   ],
   "title": "OFFICE USE ONLY:",
   "description": "DIRECTIONS / PATHWAYS SERVICES \n"
  }
 ],
 "triggers": [
  {
   "type": "setvalue",
   "expression": "{Program} anyof ['SAPPHIRE', 'EUROPATH', 'MONPATH', 'COCO', 'TSS', 'BEGAPATH', 'TEST']",
   "setToName": "doK10",
   "setValue": "Yes"
  }
 ],
 "showTitle": false,
 "showCompletedPage": false,
 "navigateToUrl": "/#/completed",
 "progressBarType": "questions",
 "clearInvisibleValues": "onHiddenContainer",
 "autoGrowComment": true,
 "showPreviewBeforeComplete": "showAllQuestions"
}