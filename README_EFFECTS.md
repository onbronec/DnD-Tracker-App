# 🎭 Formát a architektura D&D Efektů (Conditions)

V moderní verzi **DnD Companion** již nejsou efekty a stavy pevně zadrátovány v HTML/JS na klientovi. Místo toho funguje plně dynamický, serverem synchronizovaný a databázově orientovaný systém efektů a stavů.

---

## 📍 Kde jsou efekty uloženy a definovány

1. **Výchozí šablony (Presets)**:
   Výchozí D&D 5e a domovské (homebrew) efekty jsou definovány na serveru v souboru [server/conditionPresets.js](file:///server/conditionPresets.js). Tyto stavy slouží jako výchozí semínko (seed) pro databázi při prvním spuštění nebo migraci.

2. **Databáze stavů (`conditionDatabase`)**:
   Stavy jsou uloženy v serverovém stavu (state) v poli `conditionDatabase`. Tato databáze se ukládá do autosavu (`dnd-tracker-autosave.json`).

3. **Správa přes UI**:
   DM (Dungeon Master) může stavy v databázi plně spravovat (přidávat, mazat, upravovat) na stránce **Databases** v sekci **Conditions**. Hráči si mohou stavy prohlížet a vyhledávat v nich.

---

## 📋 Struktura efektu v databázi (`conditionDatabase`)

Každý stav v databázi má následující schéma:

```json
{
  "id": "condition_unique_id",
  "name": "Název Stavu",
  "kind": "buff | debuff | neutral",
  "description": "Detailní popis toho, co stav mechanicky dělá.",
  "hasLevels": false,        // Určuje, zda stav může mít úrovně (např. Exhaustion 1-6)
  "maxLevel": 0,             // Maximální možná úroveň stavu
  "hasDice": false,          // Určuje, zda stav obsahuje kostky poškození (např. Burning)
  "defaultDiceCount": 0,     // Výchozí počet kostek (např. 2 pro 2d4)
  "defaultDiceSides": 0,     // Výchozí počet stěn kostky (např. 4 pro 2d4)
  "defaultDamageType": "",   // Výchozí typ poškození (např. "fire")
  "tags": [],                // Kategoriální tagy pro vyhledávání
  "source": "5e | homebrew"  // Původ stavu
}
```

---

## 🎨 Typy efektů (Kind) a jejich chování

Efekty se v rozhraní vizuálně odlišují podle pole `kind`:
- **`buff`** - Pozitivní efekty (zelené pozadí) 🟢
- **`debuff`** - Negativní efekty (červené pozadí) 🔴
- **`neutral`** - Neutrální/situační efekty (modré pozadí) 🔵

---

## ⚡ Speciální mechanické stavy (Stat Adjustments)

Aplikace podporuje speciální stavy, které jsou napojeny přímo na výpočetní logiku postav (Character Sheets). Tyto stavy **neupravují permanentně základní hodnoty** v editoru postavy, ale aplikují se jako dočasné modifikátory:

1. **`Ability Score Set`** (neutral): Dočasně nastaví vybranou vlastnost na konkrétní hodnotu (např. síla na 19 při nasazení *Gauntlets of Ogre Power*).
2. **`Ability Score Increased`** (buff): Dočasně zvýší vlastnost o zadanou hodnotu.
3. **`Ability Score Reduced`** (debuff): Dočasně sníží vlastnost o zadanou hodnotu.
4. **`Armor Class Increased`** (buff): Dočasně zvýší AC (třídu zbroje) postavy.
5. **`Armor Class Reduced`** (debuff): Dočasně sníží AC postavy.

*Poznámka: AC, iniciativu, spell attack a spell DC lze dále ovlivňovat přes trvalé i dočasné bonusy `sheetBonuses`.*

---

## 🎲 Kostkové a úrovňové stavy (Dice & Levels)

- **Úrovňové efekty (Exhaustion, Insanity, Penance)**: V rozhraní trackeru se zobrazují s číslem úrovně. V modalu správy stavu u postavy lze úroveň zvyšovat, snižovat nebo stav zcela odebrat.
- **Kostkové efekty (Burning, Venombound)**: Přenášejí metadata o poškození. V trackeru se pak zobrazuje specifický text, např. `Burning 2d4 fire`.

---

## 🖥️ Interakce v UI (Combat Tracker & Character Sheet)

1. **Rychlé odebrání**:
   Kliknutím na jednoduchý stav (který nemá úrovně, kostky ani úpravu vlastností) na kartě postavy se stav **okamžitě odstraní** (odesláním serverové akce `effect.remove`). Tato akce je plně vratná (Undo/Redo).

2. **Modal správy stavů**:
   Kliknutím na jméno postavy se otevře modal pro správu stavů. Pokud kliknete na složitější stav (úrovňový, vlastnostní, kostkový), otevře se tento modal, kde můžete upravit parametry stavu (úroveň, hodnotu vlastnosti, kostky).

3. **Vyhledávání stavů**:
   Při přidávání nového stavu v modalu se používá komponenta `SearchPicker` (nikoli klasický select). Ta dynamicky prohledává `conditionDatabase` na serveru.
   - *Tip*: Pokud zadáte hledaný výraz do uvozovek (např. `"Blinded"`), vyhledávání probíhá pouze v názvu stavu a ignoruje dlouhé popisy.

4. **Zobrazení popisu (Tooltip)**:
   Při najetí myší (hover) na tag stavu u postavy se zobrazí uložený popis stavu přímo z databáze.

---

## 📝 Jak přidat nový stav do hry

### Možnost A: Dynamicky přes běžící aplikaci (Doporučeno)
1. Přihlaste se jako DM (`?mode=dm&token=<token>`).
2. Přejděte na stránku **Databases** -> záložka **Conditions**.
3. Otevřete panel **Database actions** a klikněte na **Add Condition**.
4. Vyplňte formulář a uložte. Nový stav se okamžitě synchronizuje všem připojeným zařízením a uloží se do autosavu.

### Možnost B: Přidání výchozího stavu do kódu (Pro vývojáře)
1. Otevřete soubor [server/conditionPresets.js](file:///server/conditionPresets.js).
2. Přidejte nový stav do pole `DEFAULT_CONDITIONS`:
   ```javascript
   {
     name: 'My_Cool_Condition',
     kind: 'debuff',
     description: 'Popis nového super stavu.',
     source: 'homebrew'
   }
   ```
3. Restartujte server. Při migraci/spuštění se nový stav automaticky naimportuje do `conditionDatabase`.