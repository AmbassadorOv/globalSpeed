import os
import requests
import json

class SovereignMaintenance:
    def __init__(self, repo_name="the-nagid-vault"):
        self.base_url = "https://www.sefaria.org/api/texts/"
        self.vault_size = 21
        self.repo_name = repo_name

    def extract_gemara_to_vaults(self, tractate):
        """
        Fetches a tractate and divides it into 21 vaults according to the Nagid's patterns.
        """
        print(f"[*] Starting maintenance on tractate: {tractate}")

        response = requests.get(f"{self.base_url}{tractate}")
        if response.status_code == 200:
            data = response.json()
            text_content = data.get('he', [])

            # Divide into 21 vaults (Logic of the 21 Patterns)
            vaults = {f"Vault_{i+1}": [] for i in range(self.vault_size)}

            for index, segment in enumerate(text_content):
                # Assign to vault based on modulo (Nagid's order)
                vault_id = f"Vault_{(index % self.vault_size) + 1}"
                vaults[vault_id].append(segment)

            return vaults
        else:
            print(f"[!] Error fetching data: {response.status_code}")
        return None

    def save_vaults(self, tractate, vaults):
        if not vaults:
            return

        base_dir = f"vaults/{tractate}"
        os.makedirs(base_dir, exist_ok=True)

        for vault_id, content in vaults.items():
            filepath = os.path.join(base_dir, f"{vault_id}.json")
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(content, f, ensure_ascii=False, indent=2)

        print(f"[+] Vaults for {tractate} saved to {base_dir}")

if __name__ == "__main__":
    agent = SovereignMaintenance()
    tractate = "Berakhot"
    vault_data = agent.extract_gemara_to_vaults(tractate)
    if vault_data:
        agent.save_vaults(tractate, vault_data)
