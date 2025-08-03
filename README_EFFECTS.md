# 🎭 Formát D&D Efektů - Dokumentace

## 📍 Kde najít a upravit efekty

Efekty jsou definovány v JavaScriptu na **řádcích 21-54** v objektu `predefinedEffects`.

## 📋 Struktura efektu

```javascript
'NázevEfektu': { 
    type: 'buff|debuff|neutral', 
    description: 'Popis efektu v češtině' 
}
```

### Typy efektů:
- **`buff`** - Pozitivní efekty (zelené) 🟢
- **`debuff`** - Negativní efekty (červené) 🔴  
- **`neutral`** - Neutrální/situační efekty (modré) 🔵

## 🔴 Aktuální DEBUFFS

```javascript
'Blinded': { type: 'debuff', description: 'Postava nevidí a automaticky neuspěje u kontrol založených na zraku. Útoky proti postavě mají výhodu, útoky postavy mají nevýhodu.' },
'Charmed': { type: 'debuff', description: 'Postava nemůže útočit na toho, kdo ji okouzlil. Ten má výhodu na sociální interakce.' },
'Deafened': { type: 'debuff', description: 'Postava neslyší a automaticky neuspěje u kontrol založených na sluchu.' },
'Frightened': { type: 'debuff', description: 'Postava má nevýhodu na ability checks a útoky, dokud je zdroj strachu ve výhledu. Nemůže se dobrovolně přiblížit ke zdroji.' },
'Grappled': { type: 'debuff', description: 'Rychlost postavy je 0. Končí, když je grappler neschopný nebo postava unikne.' },
'Incapacitated': { type: 'debuff', description: 'Postava nemůže provádět akce ani reakce.' },
'Paralyzed': { type: 'debuff', description: 'Postava je neschopná a nemůže se hýbat ani mluvit. Automaticky neuspěje u Str a Dex záchran. Útoky proti ní mají výhodu.' },
'Petrified': { type: 'debuff', description: 'Postava je zkamenělá, neschopná a neuvědomělá. Má odolnost proti všem typům poškození.' },
'Poisoned': { type: 'debuff', description: 'Postava má nevýhodu na útoky a ability checks.' },
'Prone': { type: 'debuff', description: 'Pohyb pouze plazením. Nevýhoda na útoky. Útoky zblízka mají výhodu, na dálku nevýhodu.' },
'Restrained': { type: 'debuff', description: 'Rychlost 0, nevýhoda na útoky a Dex záchranné hody. Útoky proti postavě mají výhodu.' },
'Stunned': { type: 'debuff', description: 'Postava je neschopná, nemůže se hýbat a mluví jen nejasně. Automaticky neuspěje u Str a Dex záchran.' },
'Unconscious': { type: 'debuff', description: 'Postava je neschopná, nemůže se hýbat ani mluvit, neuvědomělá. Automaticky neuspěje u Str a Dex záchran.' }
```

## 🟢 Aktuální BUFFS

```javascript
'Blessed': { type: 'buff', description: 'Bonus k záchranným hodům a útokům.' },
'Hasted': { type: 'buff', description: 'Dvojnásobná rychlost, +2 AC, výhoda na Dex záchranné hody, extra akce.' },
'Inspired': { type: 'buff', description: 'Bardic Inspiration - bonus k příštímu hodu.' },
'Protected': { type: 'buff', description: 'Magická ochrana poskytující bonus k AC nebo záchranným hodům.' },
'Enlarged': { type: 'buff', description: 'Zvětšená velikost, výhoda na Strength checks a záchranné hody, extra poškození.' },
'Flying': { type: 'buff', description: 'Schopnost letu díky kouzlu nebo schopnosti.' },
'Invisible': { type: 'buff', description: 'Postava je neviditelná. Útoky proti ní mají nevýhodu, její útoky mají výhodu.' },
'Resistance': { type: 'buff', description: 'Odolnost proti určitému typu poškození.' },
'Advantage': { type: 'buff', description: 'Výhoda na určitý typ hodů.' },
'Raging': { type: 'buff', description: 'Barbarian Rage - bonus k poškození, odolnost proti fyzickému poškození.' },
'Dodging': { type: 'buff', description: 'Postava se vyhýbá - útoky proti ní mají nevýhodu.' }
```

## 🔵 Aktuální NEUTRÁLNÍ

```javascript
'Concentrating': { type: 'neutral', description: 'Postava se soustředí na kouzlo. Při poškození hází záchranný hod na koncentraci.' },
'Marked': { type: 'neutral', description: 'Postava je označená pro sledování nebo speciální efekt.' }
```

## ➕ Jak přidat nový efekt

### 1. Přidejte do objektu `predefinedEffects`:

```javascript
'NovýEfekt': { 
    type: 'buff', // nebo 'debuff' nebo 'neutral'
    description: 'Popis toho, co efekt dělá' 
},
```

### 2. Přidejte do HTML selectu (řádky 600-650):

```html
<option value="NovýEfekt">Nový Efekt (České jméno)</option>
```

## 🎨 Vzhled efektů

- **Debuffs**: Červené pozadí s bílým textem
- **Buffs**: Zelené pozadí s bílým textem  
- **Neutral**: Modré pozadí s bílým textem
- **Vlastní efekty**: Automaticky modré (neutral)

## 💡 Příklady nových efektů

```javascript
// Nový debuff
'Cursed': { 
    type: 'debuff', 
    description: 'Postava je prokletá a má nevýhodu na všechny záchranné hody.' 
},

// Nový buff
'Heroism': { 
    type: 'buff', 
    description: 'Postava je imunní vůči strachu a získává dočasné HP.' 
},

// Neutrální efekt
'Transformed': { 
    type: 'neutral', 
    description: 'Postava je proměněna v jinou formu.' 
}
```

## 📝 Poznámky

- Názvy efektů jsou **case-sensitive** (záleží na velikosti písmen)
- Popisy se zobrazují jako tooltip při najetí myší na efekt
- Vlastní efekty (nepsané v `predefinedEffects`) jsou automaticky modré
- Efekty se ukládají do JSON souborů spolu s postavami

## 🔧 Technické detaily

- Efekty jsou uloženy v poli `character.effects[]`
- Funkce `getEffectClass()` určuje barvu podle typu
- Funkce `getEffectDescription()` vrací popis efektu
- Modal pro správu efektů se otevírá kliknutím na jméno postavy