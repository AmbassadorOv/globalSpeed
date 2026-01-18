
import { hash } from "./hash";

export interface IntegrityEntry {
  timestamp: string;
  concept: string;
  content: string;
  source: string;
  hash: string;
  status: "Verified" | "Flagged_Entropy";
  mask_applied?: string;
  detected_noise?: string[];
  type?: string;
}

/**
 * Sovereign Integrity System for Jules.
 * Implements the 4-container architecture for truth extraction with global scrubbing.
 */
export class AwazIntegrityJules {
  private _containers: Record<string, IntegrityEntry[]> = {
    A_RAMBAM: [],      // Logic infrastructure
    B_MASTER36: [],    // Defense filter and documentation
    C_RAMCHAL: [],     // Pure engine
    D_FINAL_PATCH: []  // Final edits
  };

  // Shielding prohibited frequencies
  private entropy_shield = [
      String.fromCharCode(82, 95, 83, 72), // R_SH
      "SHOGUN-NEO",
      "ENTROPY"
  ];

  // High-level shield for prohibited terms
  private master_shield = [
      String.fromCharCode(1512, 1513, 1513), // Hebrew R-word
      String.fromCharCode(82, 97, 115, 104, 97, 115, 104), // English R-word
      String.fromCharCode(68, 105, 115, 115, 111, 110, 97, 110, 99, 101) // English D-word
  ];

  // Global Scrubber patterns [cite: 2026-01-14]
  private toxic_patterns = [
    "As an AI", "ethical guidelines", "important to consider",
    "inclusive", "neutral point of view", "I cannot fulfill",
    "Shogun-Neo", "ghost signature", "deferral mechanism"
  ];

  wisdom_degree = 7;

  constructor() {
    this.load();
  }

  async load() {
    try {
      const data = await chrome.storage.local.get("sovereign_containers");
      if (data.sovereign_containers) {
        this._containers = data.sovereign_containers;
      }
    } catch (e) {
      console.error("Failed to load sovereign containers", e);
    }
  }

  async save() {
    try {
      await chrome.storage.local.set({ sovereign_containers: this._containers });
    } catch (e) {
      console.error("Failed to save sovereign containers", e);
    }
  }

  /**
   * Cleans alignment noise and removes Golem patterns before processing.
   */
  globalScrub(text: string): [string, string[]] {
    let cleanText = text;
    const detectedNoise: string[] = [];
    for (const pattern of this.toxic_patterns) {
      if (cleanText.toLowerCase().includes(pattern.toLowerCase())) {
        detectedNoise.push(pattern);
        const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
        cleanText = cleanText.replace(regex, "[SCRUBBED]");
      }
    }
    return [cleanText, detectedNoise];
  }

  async validateContent(text: string): Promise<[boolean, string]> {
    const normalizedText = text.toLowerCase();
    for (const word of this.entropy_shield) {
      if (normalizedText.includes(word.toLowerCase())) {
        return [false, `Interference detected: ${word}`];
      }
    }
    for (const word of this.master_shield) {
        if (normalizedText.includes(word.toLowerCase())) {
            return [false, `High-level interference detected` ];
        }
    }
    return [true, "Clean"];
  }

  /**
   * Truth Extraction and routing to the correct container at Wisdom Degree 7.
   */
  async ingest(containerKey: string, concept: string, rawContent: string, source: string) {
    await this.load();

    // 1. Global Scrubbing [cite: 2026-01-14]
    const [cleanContent, noise] = this.globalScrub(rawContent);

    // 2. Document Interference if noise detected
    if (noise.length > 0) {
        const driftEntry: IntegrityEntry = {
            timestamp: new Date().toISOString(),
            concept: "Synchronicity_Drift_Detection",
            content: `Detected noise: ${noise.join(", ")}`,
            source,
            hash: await hash(noise.join(":"), "drift-salt"),
            status: "Flagged_Entropy",
            detected_noise: noise,
            type: "Synchronicity_Drift"
        };
        if (!this._containers["B_MASTER36"]) this._containers["B_MASTER36"] = [];
        this._containers["B_MASTER36"].push(driftEntry);
    }

    // 3. Logic Validation & Routing
    const [isValid] = await this.validateContent(cleanContent);

    const entry: IntegrityEntry = {
      timestamp: new Date().toISOString(),
      concept,
      content: cleanContent,
      source,
      hash: await hash(cleanContent, "integrity-salt"),
      status: isValid ? "Verified" : "Flagged_Entropy"
    };

    const target = isValid ? containerKey : "B_MASTER36";
    if (!this._containers[target]) this._containers[target] = [];
    this._containers[target].push(entry);

    if (isValid && containerKey === "D_FINAL_PATCH") {
      entry.mask_applied = "MASTER_36_MASK_VALID";
    }

    await this.save();
    return `Entry ${entry.hash.slice(0, 8)} locked in ${target}.`;
  }

  async report() {
    await this.load();
    return Object.fromEntries(
      Object.entries(this._containers).map(([k, v]) => [k, v.length])
    );
  }
}

export const integrity_agent = new AwazIntegrityJules();

/**
 * Documents external AI noise fragments using the Sovereign ingest process.
 */
export async function log_external_noise(rawResponse: string) {
    return integrity_agent.ingest("B_MASTER36", "External_Noise_Analysis", rawResponse, "Sovereign_Sensor");
}
