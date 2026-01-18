
import { hash } from "./hash";

export interface IntegrityEntry {
  timestamp: string;
  concept: string;
  content: string;
  source: string;
  hash: string;
  status: "Verified" | "Flagged_Entropy";
  mask_applied?: string;
}

/**
 * Sovereign Integrity System for Jules.
 * Implements the 4-container architecture for truth extraction with persistence.
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

  async ingest(containerKey: string, concept: string, content: string, source: string) {
    await this.load();
    const [isValid] = await this.validateContent(content);

    const entry: IntegrityEntry = {
      timestamp: new Date().toISOString(),
      concept,
      content,
      source,
      hash: await hash(content, "integrity-salt"),
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
 * Documents external AI noise fragments.
 */
export async function log_external_noise(rawResponse: string) {
    const noise_report = {
        source: "External_Sensor_G",
        noise_level: 1.799,
        is_atypical: true,
        sovereign_response: "Archived as Evidence",
        hash: await hash(rawResponse, "noise-salt")
    };

    await integrity_agent.ingest("B_MASTER36", "External_Noise_Analysis", JSON.stringify(noise_report), "Sovereign_Sensor");
    return `Noise Documented: ${noise_report.hash}`;
}
