# 🐉 DnD Combat Tracker

Jednoduchá aplikace pro sledování hit pointů, iniciativy a "Moci" během D&D bojů.

## 🚀 Spuštění aplikace

### Nejjednodušší způsob:
1. Stáhněte si soubor `dnd-tracker.html`
2. Otevřete jej v libovolném moderním webovém prohlížeči (Chrome, Firefox, Safari, Edge)
3. Aplikace je připravena k použití!

**Žádná instalace není potřeba** - aplikace běží kompletně v prohlížeči.

## 📋 Funkce aplikace

### ✨ Nové funkce

#### 💾 Automatické ukládání
- **LocalStorage auto-save**: Data se automaticky ukládají každých 30 sekund a při zavření stránky
- Žádná ztráta postupu při nečekaném zavření prohlížeče
- Aplikace automaticky obnoví stav při opětovném otevření
- **Uložit stav boje**: Nové tlačítko pro uložení probíhajícího boje včetně kola, tahu a iniciativy do JSON souboru

#### ↩️ Historie a vrácení změn
- **Undo systém**: Vraťte se zpět až 20 akcí pomocí Backspace klávesy
- Historie sleduje všechny změny HP, efektů, iniciativy a tahů
- Perfektní pro opravu chyb při zadávání

#### ⌨️ Klávesové zkratky
- **Space nebo PageUp**: Další tah (během boje)
- **PageDown**: Předchozí tah (během boje)
- **Backspace**: Vrátit poslední akci (undo)

#### 🔄 Pokročilá kontrola tahů
- **Předchozí tah**: Tlačítko a zkratka pro návrat o tah zpět
- Automatická aktualizace stavu kola a hráčů

#### 🎯 Drag & Drop iniciativy
- Přesouvejte karty postav myší pro změnu pořadí iniciativy během boje
- Automatická aktualizace pořadí a aktuální postavy na tahu

#### 🛡️ AC (Armor Class)
- Sledování AC u všech postav a monster
- Zobrazení v statistikách karty

#### 🎭 Pokročilé efekty
- **Efekty zůstávají i mimo boj**: Důležité efekty jako Exhaustion, Max HP změny, nebo Restrained persistují i po ukončení boje
- **Efekty s levely**: Exhaustion a další efekty podporují levely 1-6
- **Ovládání levelů**: Tlačítka +/- pro zvyšování/snižování levelu efektů přímo v UI
- Vizuální zobrazení levelů u efektů (např. "Exhaustion 3")

### 🎲 Základní funkce

 (výchozí 0)
- **Max Moc**: Maximální počet bodů "Moci" (výchozí 0)
- **AC**: Armor Class (výchozí 10)

### 💾 Správa dat
- **Uložit data**: Stáhne JSON soubor s aktuálními postavami včetně současných HP a efektů
- **Načíst data (kumulativně)**: Přidá postavy ze souboru k existujícím (nepřepíše)
- **Vymazat vše**: Smaže všechny postavy a monstra

### ⚔️ Bojový systém

#### Před bojem:
- Přidejte všechny účastníky boje
- Můžete ručně nastavit iniciativu některým postavám
- Klikněte na "Zahájit boj"

#### Zahájení boje:
- Aplikace automaticky hodí iniciativou všem, kteří ji nemají nastavenou
- Hodí se 1d20 + bonus na iniciativu
- Všichni účastníci se seřadí podle iniciativy (nejvyšší první)

#### Během boje:
- **Aktuální postava na tahu** je zvýrazněna oranžově
- **Postavy, které už hrály** v aktuálním kole jsou zobrazeny šedě
- Kliknutím na "Další tah" přejdete k další postavě
- Po posledním účastníkovi začne nové kolo

#### Sledování stavu:
- **HP**: Upravujte tlačítky +1, +10, -1, -10 nebo vlastní hodnoty
- **HP bar**: Vizuální zobrazení zbývajících HP (zelená → žlutá → červená)
- **Moc**: Pouze pro monstra - upravujte tlačítky +1, -1 nebo přímým zadáním
- **Efekty**: Kliknutím na jméno postavy přidávejte D&D efekty (Poisoned, Paralyzed, atd.)
- **Duplikace monster**: Tlačítko + u monster vytvoří číslovanou kopii

### 🎮 Ovládání během boje

#### Horní panel:
- Zobrazuje aktuální kolo a postavu na tahu
- Ukazuje pořadí iniciativy s barevným označením

#### Karty postav:
- **Oranžový rámeček**: Postava na tahu
- **Šedé pozadí**: Postava už hrála v tomto kole
- **Bílé pozadí**: Postava ještě nehrála

#### Tlačítka:
- **Zahájit boj**: Spustí bojový režim
- **Další tah**: Přejde k další postavě v pořadí
- **Ukončit boj**: Ukončí boj a obnoví všechny HP/Moc/efekty
- **Uzavřit boj**: Ukončí boj, obnoví hráče a odstraní všechna monstra

## 📁 Formát uložených dat

Aplikace ukládá data ve formátu JSON:

```json
{
  "characters": [
    {
      "name": "Aragorn",
      "type": "player",
      "maxHp": 45,
      "currentHp": 32,
      "initBonus": 3,
      "maxPower": 0,
      "currentPower": 0,
      "effects": ["Blessed"]
    },
    {
      "name": "1. Ork válečník", 
      "type": "monster",
      "maxHp": 15,
      "currentHp": 8,
      "initBonus": 1,
      "maxPower": 3,
      "currentPower": 2,
      "effects": ["Frightened"]
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 💡 Tipy pro použití

### Příprava boje:
1. Vytvořte si databázi monster s jejich statistikami
2. Uložte si hráčské postavy
3. Před každým bojem načtěte hráče a pak potřebná monstra (kumulativně)

### Během hry:
- Upravujte HP pomocí rychlých tlačítek nebo vlastních hodnot pro poškození/léčení
- Kliknutím na jméno přidávejte efekty jako Poisoned, Frightened, Paralyzed
- Pro více stejných monster použijte tlačítko + pro vytvoření očíslovaných kopií
- Sledujte body Moci u monster pro speciální schopnosti
- Používejte vizuální HP bar pro rychlý přehled stavu

### Po boji:
- **Ukončit boj**: Pro pokračování se stejnými postavami později
- **Uzavřít boj**: Pro kompletní vyčištění monster a start nového dobrodružství

## 🔧 Technické informace

- **Technologie**: HTML5, CSS3, JavaScript
- **Kompatibilita**: Všechny moderní prohlížeče
- **Ukládání**: Lokální soubory (JSON)
- **Velikost**: Cca 20 KB

## 🐛 Řešení problémů

### Aplikace se nenačte:
- Zkontrolujte, že používáte moderní prohlížeč
- Ujistěte se, že je JavaScript povolen

### Nelze načíst soubor:
- Zkontrolujte, že je soubor ve formátu JSON
- Ověřte, že byl vytvořen touto aplikací

### Ztracené údaje:
- Data se ukládají pouze do souborů, nezapomeňte pravidelně ukládat
- Po zavření prohlížeče se všechna neuložená data ztratí

## 📝 Verze a změny

## 🆕 Nové funkce

### 🔄 Kumulativní načítání
- Načítání souborů přidává postavy k existujícím místo přepsání
- Ideální pro kombinování hráčů a různých skupin monster

### 🎭 Systém efektů
- Kliknutím na jméno postavy otevřete správu efektů
- Přidávejte D&D stavy jako Poisoned, Paralyzed, Frightened, Blessed
- Efekty jsou vizuálně zobrazeny jako barevné tagy

### 🐺 Duplikace monster
- Tlačítko + u monster vytvoří očíslovanou kopii
- Všechna monstra se stejným jménem se automaticky přečíslují
- Ideální pro skupiny goblinů, orků atd.

### ⚔️ Pokročilé HP managementy
- Tlačítka pro +/-1 a +/-10 HP
- Vlastní pole pro zadání konkrétního poškození
- Vlastní pole pro zadání konkrétního léčení
- Pole pro zadání dočasných HP (odebírají se jako první při poškození)
- Pole pro dočasnou změnu maximálních HP včetně automatického buffu/debuffu

### 🔒 Uzavření boje
- Nové tlačítko "Uzavřít boj" odstraní všechna monstra
- Hráči zůstávají s obnoveným stavem
- Ideální pro konec dungeonu nebo dobrodružství

### v1.1
- Kumulativní načítání dat
- Systém efektů a stavů
- Duplikace monster s automatickým číslováním  
- Pokročilé HP ovládání (+/-1, +/-10, vlastní hodnoty)
- Uzavření boje s odstraněním monster
- Uložení aktuálních HP a efektů
- Oddělení Moci pouze pro monstra

---

**Vytvořeno pro D&D 5e, ale použitelné i pro jiné RPG systémy** 🎲