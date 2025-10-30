# 🎲 D&D Combat Tracker - Multiplayer Setup

Real-time multiplayer D&D Combat Tracker s oddělenými DM a Player views.

## 🚀 Rychlý Start

### 1. Instalace

Nainstalujte Node.js (pokud ještě nemáte): https://nodejs.org/

Pak v adresáři projektu spusťte:

```bash
npm install
```

### 2. Spuštění serveru

```bash
node server.js
```

nebo

```bash
npm start
```

Server se spustí a vypíše přístupové adresy:

```
========================================
🎲 D&D Combat Tracker Server Running
========================================

📍 DM Access (full control):
   http://localhost:3000?mode=dm

👥 Player Access (simplified view):
   http://192.168.1.XXX:3000?mode=player

⚠️  Make sure all devices are on the same Wi-Fi network
========================================
```

### 3. Připojení

**DM (hlavní počítač):**
- Otevřete: `http://localhost:3000?mode=dm`
- Máte plnou kontrolu - přidávání postav, databáze monster, statblocky, atd.

**Hráči (tablet/telefon na stejné Wi-Fi):**
- Otevřete: `http://[IP-DM-počítače]:3000?mode=player`
- IP adresa se zobrazí v konzoli serveru
- Příklad: `http://192.168.1.105:3000?mode=player`

## 🎮 Rozdíly mezi DM a Player view

### DM Mode (🎲 Plná kontrola)
✅ Vidí **přesné HP všech** postav i monster
✅ Může přidávat/mazat postavy a monstra
✅ Vidí statblocky monster
✅ Vidí Power u monster
✅ Přístup k databázi monster
✅ Ovládá combat flow (start/end)
✅ Exportuje/importuje data

### Player Mode (👥 Zjednodušený pohled)
✅ Vidí **přesné HP hráčských postav**
✅ Můžou měnit HP u **všech** hráčských postav
✅ Vidí a můžou přidávat **efekty ke všem** postavám
✅ Vidí **AC všech** postav
✅ Vidí pořadí iniciativy, kolo, kdo je na tahu

❌ U monster vidí jen **barevný indikátor** zdraví:
   - 🟢 Zdravý (>66% HP)
   - 🟡 Zraněný (33-66% HP)
   - 🔴 Kritický (<33% HP)

❌ Nemohou měnit HP u monster
❌ Nevidí statblocky monster
❌ Nevidí Power u monster
❌ Nemohou přidávat/mazat postavy
❌ Nemají přístup k databázi monster

## 🔧 Řešení problémů

### Hráči se nemohou připojit

1. **Zkontrolujte, že jste na stejné Wi-Fi síti**
2. **Firewall** - možná blokuje port 3000
   - Windows: Otevřete Windows Defender Firewall → Povolit aplikaci
   - Mac: System Preferences → Security & Privacy → Firewall → Firewall Options
3. **Použijte správnou IP adresu** - tu, kterou vypíše server při startu

### Server se ukončí při zavření terminálu

Použijte `pm2` nebo `forever` pro běh na pozadí:

```bash
npm install -g pm2
pm2 start server.js
pm2 logs  # zobrazit logy
pm2 stop server  # zastavit server
```

### Změny se nesynchronizují

1. Zkontrolujte connection status v pravém horním rohu:
   - 🟢 Connected = OK
   - 🔴 Disconnected = problém

2. Obnovte stránku (F5)

3. Restartujte server

## 📱 Doporučený setup

**Ideální konfigurace:**
- **DM:** Laptop/PC s DM view
- **Hráči:** Jeden společný tablet s Player view, který si hráči předávají nebo mají na stole

**Alternativně:**
- Každý hráč má vlastní zařízení s Player view

## 🔐 Bezpečnost

⚠️ **Server je určen pouze pro lokální síť (Wi-Fi doma)!**

Nepoužívejte ho na veřejném internetu bez:
- Autentizace
- HTTPS
- Firewallu

Pro lokální hru s přáteli je to bezpečné.

## 🐛 Známé problémy

- Monster database se nesynchronizuje mezi klienty (planned feature)
- Při odpojení a reconnectu se neobnoví historie (undo stack)

## 📝 Technické detaily

**Stack:**
- Frontend: Vanilla JavaScript
- Backend: Node.js + Express
- Real-time: Socket.io (WebSocket)
- Storage: Server drží stav v paměti (při restartu se ztratí)

**Synchronizace:**
- Všechny změny HP, efektů, iniciativy se okamžitě posílají všem klientům
- Anti-loop mechanismus zabraňuje infinite sync cycles
- DM má autoritu - jeho změny přepíšou vše ostatní

## 💡 Tipy

1. **DM by měl vždy spustit server první** a počkat na připojení hráčů
2. **Obnovte stránku (F5)** pokud vidíte starý stav
3. **Jeden tablet pro hráče** funguje nejlépe - méně zařízení = méně sync problémů
4. **LocalStorage funguje jen pro DM** - hráči se spoléhají na server
5. **Export combat state** funguje jen v DM mode

## 🎉 Užijte si hru!

Máte nápad na vylepšení? Našli jste bug? Vytvořte Issue na GitHubu!
