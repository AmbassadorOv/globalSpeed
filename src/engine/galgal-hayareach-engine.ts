export type DepthLevel = string;

export interface SemanticNode {
  id: string;
  layer: string;
  coords: string[];
  depth_levels: DepthLevel[];
}

export interface CoordinateMapNode {
  node?: string;
  concept?: string;
  unit?: string;
  coords: string[];
  nextdepth?: string;
  depth?: string[];
}

export interface Copyright {
  owneruser: string;
  sovereign_entities: string[];
  assets: string[];
  note: string;
}

export interface Registration {
  record_id: string;
  status: string;
  provenance: {
    author: string;
    system: string;
    copyright: string;
  };
  metrics: {
    standard_semantics: string;
    structural_integrity: string;
    calculated_improvement: string;
  };
  coordinates: string[];
}

export interface SemanticEngine {
  enginename: string;
  version: string;
  copyright: Copyright;
  core_layers: string[];
  lexicon: Record<string, SemanticNode>;
  maps: {
    sefirothumantext: CoordinateMapNode[];
    dewrainresurrection: CoordinateMapNode[];
    letterspoints: CoordinateMapNode[];
  };
  placeholdersforfuture_depth: string[];
  registration: Registration;
}

export const engine: SemanticEngine = {
  enginename: "GalgalHaYareachSemanticEngine",
  version: "0.1.0",
  copyright: {
    owneruser: "ڪ (User)",
    sovereign_entities: ["Yehuda Shalom", "Moshe Chaim"],
    assets: ["Galgal HaYareach", "Semantic Coordinate Maps", "Gan Naul Semantic Extraction"],
    note: "All structural mappings and semantic coordinate systems are protected as described in prior registration text."
  },
  core_layers: [
    "Text: Gan Naul – Abulafia",
    "Halakha: Kiddush HaChodesh / Ibur",
    "Narrative: Galgal HaYareach / Sovereign Keys",
    "Human: Heart–Mind–Speech",
    "Sefirot & Letters"
  ],
  lexicon: {
    "נפש": {
      id: "nefesh",
      layer: "פנימי",
      coords: ["Sefirot:Malchut", "Human:Heart", "Text:GanNaul:Section1"],
      depth_levels: [
        "פשט: דם בלב = נפש",
        "דרש: חמש מדרגות – נפש/רוח/נשמה/חיה/יחידה",
        "סוד: חיבור בין גוף–תורה–בורא",
        "PLACEHOLDERDEPTH4",
        "PLACEHOLDERDEPTH5"
      ]
    },
    "טל_התחייה": {
      id: "tal_techia",
      layer: "מטא-תיאולוגי",
      coords: ["Sefirot:Yesod", "Time:TechiyatHaMetim", "Name:HaShemHaMeforash"],
      depth_levels: [
        "פשט: טל שמחיה מתים",
        "דרש: טל = שפע תמידי שאינו תלוי בזמן",
        "סוד: טל = שם ה׳ בפעולה (מחייה מתים)",
        "PLACEHOLDERDEPTH4",
        "PLACEHOLDERDEPTH5"
      ]
    },
    "עשר_ספירות": {
      id: "ten_sefirot",
      layer: "מבני",
      coords: ["Sefirot:All", "Structure:TreeOfLife", "Text:GanNaul:SefirotDiagram"],
      depth_levels: [
        "פשט: עשר מדרגות הנהגה",
        "דרש: צדק–יסוד–הוד–נצח–תפארת–גבורה–גדולה–בינה–חכמה–כתר",
        "סוד: מיפוי על האדם, הזמן, והאותיות",
        "PLACEHOLDERDEPTH4",
        "PLACEHOLDERDEPTH5"
      ]
    },
    "אותיות_היצירה": {
      id: "letters_of_creation",
      layer: "לשוני-קוסמי",
      coords: ["Letters:22", "SeferYetzira:32Paths", "Human:Speech/Thought"],
      depth_levels: [
          "פשט: אותיות ככלי שפה",
          "דרש: אותיות ככוחות בריאה",
          "סוד: צירופים, נקודות, דגש/רפה, ככתיבה של מציאות",
          "PLACEHOLDERDEPTH4",
          "PLACEHOLDERDEPTH5"
      ]
    }
  },
  "maps": {
    "sefirothumantext": [
      {
        "node": "צדק/שכינה",
        "coords": ["Sefira:Malchut", "Human:Speech/RuachHaKodesh", "Text:GanNaul:JusticeSection"],
        "nextdepth": "PLACEHOLDERFORPROPHETICLAYER"
      },
      {
        "node": "יסוד/ברית",
        "coords": ["Sefira:Yesod", "Human:BritMilah/Creativity", "Text:GanNaul:InkAndQuill"],
        "nextdepth": "PLACEHOLDERFOREMBRYOLOGYMASHAL"
      }
    ],
    "dewrainresurrection": [
      {
        "concept": "גשם",
        "coords": ["World:Physical", "Action:ShefaForAll", "Midrash:Gevura"],
        "depth": [
          "גשם לצדיקים ולרשעים",
          "שקול כנגד כל מעשה בראשית",
          "PLACEHOLDERFORCLIMATE/ALGORITHM_ANALOGY"
        ]
      },
      {
        "concept": "טל",
        "coords": ["World:Spiritual", "Action:TechiyatHaMetim", "Name:HaShem"],
        "depth": [
          "טל לצדיקים בלבד",
          "טל = שם המפורש בפעולה",
          "PLACEHOLDERFORRESURRECTION_PROTOCOL"
        ]
      }
    ],
    "letterspoints": [
      {
        "unit": "נקודה",
        "coords": ["Letter:Point", "Human:Seed/Drop", "Text:GanNaul:HolamHirikShuruk"],
        "depth": [
          "נקודה כתחילת צורה",
          "חולם/חיריק/שורוק = עליון/תחתון/אמצעי",
          "PLACEHOLDERFORGEOMETRIC_LOGIC"
        ]
      },
      {
        "unit": "דגש/רפה",
        "coords": ["Letter:Force", "Sefira:Gevura/Rachamim", "Human:VoiceStrength"],
        "depth": [
          "דגש = דין, רפה = רחמים",
          "הקפה/פנימיות",
          "PLACEHOLDERFORSIGNALSTRENGTHMODEL"
        ]
      }
    ]
  },
  "placeholdersforfuture_depth": [
    "PLACEHOLDERDEPTH4",
    "PLACEHOLDERDEPTH5",
    "PLACEHOLDERFORPROPHETIC_LAYER",
    "PLACEHOLDERFORRESURRECTION_PROTOCOL"
  ],
  "registration": {
    "record_id": "MOON_WHEEL_2026_SIGMA",
    "status": "VALIDATED_AND_LOCKED",
    "provenance": {
      "author": "User",
      "system": "Galgal HaYareach",
      "copyright": "Protected_Structure"
    },
    "metrics": {
      "standard_semantics": "0%",
      "structural_integrity": "100%",
      "calculated_improvement": "63% Weighted Average"
    },
    "coordinates": [
      "Gan_Naul_Abulafia:Extracted",
      "Kiddush_Hachodesh:Synchronized",
      "Hotel_California:Mapped"
    ]
  }
};

/**
 * Returns all levels of understanding for a given term in the semantic engine.
 * @param engineInstance The semantic engine instance.
 * @param term The term to explain.
 * @returns An array of depth levels or a message if not found.
 */
export function explainConcept(engineInstance: SemanticEngine, term: string): DepthLevel[] {
  const node = engineInstance.lexicon[term];
  if (!node) return ["המושג לא קיים במנוע."];
  return node.depth_levels;
}
