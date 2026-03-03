# SOC Lab - Student Handleiding

## Welkom bij het SOC Lab!

Deze handleiding helpt je om aan de slag te gaan met het SOC Lab en de verschillende oefeningen te voltooien.

## 📚 Inhoudsopgave

1. [Introductie](#introductie)
2. [Platform Overzicht](#platform-overzicht)
3. [Eerste Stappen](#eerste-stappen)
4. [Lab Oefeningen](#lab-oefeningen)
5. [Tips & Tricks](#tips--tricks)
6. [Veelgestelde Vragen](#veelgestelde-vragen)

## Introductie

Het SOC Lab is een virtuele omgeving waarin je kunt leren werken met professionele cybersecurity tools die ook in echte Security Operations Centers (SOCs) worden gebruikt. Je kunt hier veilig experimenteren, oefenen en je skills ontwikkelen.

### Wat ga je leren?

- **SIEM (Security Information and Event Management)** - Log analyse en correlatie
- **NIDS (Network Intrusion Detection)** - Netwerkverkeer analyseren
- **DFIR (Digital Forensics and Incident Response)** - Incident onderzoek
- **Threat Intelligence** - Informatie verzamelen over dreigingen
- **SOAR (Security Orchestration, Automation and Response)** - Automatisering

## Platform Overzicht

### Toegang tot het Lab

1. Open je webbrowser
2. Ga naar: `http://[lab-ip]:5500`
3. Je ziet nu het SOC Lab Portal

### Portal Navigatie

Het Portal heeft 4 hoofdsecties:

1. **Dashboard** - Overzicht van alle tools en statistieken
2. **Tools** - Directe toegang tot alle security tools
3. **Lab Oefeningen** - Praktische oefeningen met instructies
4. **Documentatie** - Handleidingen en referentiemateriaal

### Tool Categorieën

#### SIEM & Monitoring
- **Wazuh** - Centrale log verzameling en analyse
- **Suricata** - Netwerk monitoring
- **EveBox** - Alert management

#### DFIR & Forensics
- **Velociraptor** - Endpoint onderzoek
- **Arkime** - Netwerk capture analyse
- **Wireshark** - Protocol analyse

#### Threat Intelligence
- **MISP** - Threat sharing platform
- **MITRE Navigator** - Attack framework

#### SOAR & Automation
- **Shuffle** - Workflow automatisering
- **TheHive** - Case management
- **Cortex** - Analyse engine

## Eerste Stappen

### 1. Inloggen op Tools

De meeste tools gebruiken deze standaard credentials:
- **Gebruikersnaam:** `admin`
- **Wachtwoord:** `admin` of `soclab`

Raadpleeg het Portal onder "Documentatie" voor de exacte credentials per tool.

### 2. Verken de Omgeving

1. Start met het **Dashboard** in het Portal
2. Bekijk alle beschikbare **Tools**
3. Lees de **Documentatie**
4. Start met een eenvoudige **Lab Oefening**

### 3. Eerste Oefening: SIEM Log Analyse

Deze oefening introduceert je in Wazuh:

1. Open het Portal
2. Ga naar "Lab Oefeningen"
3. Klik op "SIEM Log Analyse"
4. Volg de instructies

**Doel:** Leer hoe je logs bekijkt, filtert en verdachte activiteiten identificeert.

## Lab Oefeningen

### Oefening 1: SIEM Log Analyse (Beginner)

**Duur:** 45 minuten  
**Tools:** Wazuh

#### Leerdoelen
- Navigeren door de Wazuh interface
- Logs bekijken en filteren
- Alerts begrijpen
- Baseline activiteit herkennen

#### Opdrachten
1. Log in op Wazuh Dashboard
2. Bekijk de "Security Events" module
3. Identificeer 3 verschillende types alerts
4. Maak een custom dashboard

#### Tips
- Gebruik de tijd-filter om naar specifieke periodes te kijken
- Klik op alerts voor meer details
- Gebruik de zoekfunctie om specifieke events te vinden

---

### Oefening 2: Network Traffic Analysis (Intermediate)

**Duur:** 60 minuten  
**Tools:** Suricata, Arkime

#### Leerdoelen
- Netwerkverkeer capturen en analyseren
- Protocols herkennen
- Anomalies detecteren
- PCAP bestanden analyseren

#### Opdrachten
1. Start Suricata monitoring
2. Genereer wat testverkeer
3. Bekijk de captures in Arkime
4. Identificeer verdachte patronen

#### Tips
- Let op ongebruikelijke poorten
- Zoek naar grote data transfers
- Analyseer DNS queries

---

### Oefening 3: Endpoint Forensics (Advanced)

**Duur:** 90 minuten  
**Tools:** Velociraptor

#### Leerdoelen
- Endpoint data verzamelen
- Artefacten analyseren
- Timeline reconstructie
- IOCs zoeken

#### Opdrachten
1. Deploy Velociraptor agent
2. Run een hunt op het systeem
3. Analyseer de resultaten
4. Maak een rapport

#### Tips
- Start met bekende artefacten
- Documenteer je bevindingen
- Gebruik VQL voor custom queries

---

### Oefening 4: Threat Intelligence Investigation (Intermediate)

**Duur:** 50 minuten  
**Tools:** MISP

#### Leerdoelen
- IOCs zoeken en analyseren
- Threat feeds gebruiken
- Informatie delen
- Correlaties vinden

#### Opdrachten
1. Log in op MISP
2. Zoek naar bekende malware IOCs
3. Analyseer een threat event
4. Exporteer IOCs voor gebruik

#### Tips
- Gebruik verschillende zoektermen
- Bekijk gerelateerde events
- Controleer de bron van informatie

---

### Oefening 5: Automated Incident Response (Advanced)

**Duur:** 75 minuten  
**Tools:** Shuffle, TheHive

#### Leerdoelen
- Workflows bouwen
- Integraties configureren
- Automatisering toepassen
- Cases beheren

#### Opdrachten
1. Maak een Shuffle workflow
2. Koppel TheHive aan Shuffle
3. Bouw een automatisering
4. Test de workflow

#### Tips
- Start met een eenvoudige workflow
- Test elke stap apart
- Documenteer de logica

---

### Oefening 6: Malware Analysis (Intermediate)

**Duur:** 55 minuten  
**Tools:** YARA, CyberChef

#### Leerdoelen
- YARA rules begrijpen
- Bestanden analyseren
- Encoded data decoderen
- Indicators extracten

#### Opdrachten
1. Bestudeer YARA rules
2. Run een scan op sample bestanden
3. Gebruik CyberChef voor decoding
4. Documenteer bevindingen

#### Tips
- Begin met simpele YARA rules
- Gebruik CyberChef recipes
- Vergelijk met bekende samples

## Tips & Tricks

### Algemeen

1. **Documenteer alles** - Houd een lab notebook bij
2. **Screenshots** - Maak screenshots van belangrijke bevindingen
3. **Experimenteer** - De omgeving is veilig, probeer dingen uit
4. **Vraag hulp** - Wees niet bang om vragen te stellen

### Per Tool

#### Wazuh
- Gebruik bookmarks voor veelgebruikte zoekopdrachten
- Maak custom visualizations
- Stel alerts in voor specifieke events

#### Velociraptor
- Start met de ingebouwde artefacten
- Test queries eerst op een kleine subset
- Gebruik de notebook functie

#### MISP
- Volg relevante threat feeds
- Gebruik tags voor organisatie
- Deel relevante informatie

### Tijd Management

- Lees de opdracht volledig door voordat je begint
- Verdeel grotere opdrachten in kleinere stappen
- Neem pauzes bij complexe onderwerpen

## Veelgestelde Vragen

### Q: Wat als een tool niet start?
A: Controleer eerst of alle services draaien:
```bash
docker-compose ps
```
Bekijk de logs voor specifieke errors:
```bash
docker-compose logs [tool-naam]
```

### Q: Kan ik meerdere oefeningen tegelijk doen?
A: Ja, maar het wordt aanbevolen om één oefening tegelijk te doen voor betere focus.

### Q: Wat als ik per ongeluk iets kapot maak?
A: Geen probleem! Je kunt services herstarten of opnieuw installeren. Vraag je instructeur om hulp.

### Q: Kan ik mijn eigen tools installeren?
A: Ja, in de meeste gevallen kun je extra containers toevoegen aan de docker-compose.yml.

### Q: Hoe sla ik mijn voortgang op?
A: Documenteer je bevindingen in een apart document. Sommige tools hebben export functies.

### Q: Kan ik thuis verder werken?
A: Ja, als je toegang hebt tot het lab vanaf huis. Vraag je instructeur om de juiste connectiegegevens.

## Aanvullende Bronnen

### Online Training
- [Wazuh Documentation](https://documentation.wazuh.com/)
- [Velociraptor Training](https://docs.velociraptor.app/training/)
- [MISP User Guide](https://www.circl.lu/doc/misp/)

### Certificeringen
- CompTIA Security+
- Certified SOC Analyst (CSA)
- GIAC Security Operations Certified (GSOC)

### Communities
- [r/cybersecurity](https://reddit.com/r/cybersecurity)
- [Security Blue Team](https://securityblueteam.net)

## Feedback

Heb je suggesties voor verbeteringen of nieuwe oefeningen? Laat het ons weten!

- 📝 Vul de feedback formulier in
- 📧 Stuur een email naar: feedback@jouw-organisatie.nl
- 💬 Praat met je instructeur

---

**Succes met je SOC Lab ervaring! 🎓**

*Deze handleiding wordt regelmatig bijgewerkt. Laatste update: 2025-02-25*
