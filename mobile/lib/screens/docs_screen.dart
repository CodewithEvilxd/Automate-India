import 'package:flutter/material.dart';
import '../services/user_state_service.dart';
import '../theme/app_theme.dart';

class DocsScreen extends StatefulWidget {
  const DocsScreen({Key? key}) : super(key: key);

  @override
  State<DocsScreen> createState() => _DocsScreenState();
}

class _DocsScreenState extends State<DocsScreen> with SingleTickerProviderStateMixin {
  final UserStateService _userState = UserStateService();
  late TabController _tabController;
  int? _expandedFaqIndex;
  String _faqSearch = '';

  final List<Map<String, dynamic>> _faqs = [
    {
      'cat': 'Platform Overview',
      'q': 'What is CircularChain and how is it different from traditional scrap portals?',
      'a': 'CircularChain is India\'s first Autonomous Agent-Driven Circular Economy Protocol. Unlike classified directories, CircularChain orchestrates 6 autonomous AI agents that grade quality via computer vision (Agent 01), calculate deterministic EPA WARM carbon credits (Agent 02), fetch live MCX commodity prices (Agent 03), accept colloquial voice listings in 5 Indic languages (Agent 04), block wash-trading fraud cryptographically (Agent 05), and auto-generate CPCB EPR compliance certificates under MoEFCC PWM Rules 2026 (Agent 06). All transactions settle on Polygon Amoy (Chain ID 80002).',
    },
    {
      'cat': 'Kabadiwala Inclusion',
      'q': 'How does CircularChain onboard illiterate or semi-literate scrap aggregators?',
      'a': 'Through Agent 04: Indic Voice NLP Bridge. Collectors do not need to read, write, or fill forms. They simply tap the mic and speak naturally in Hindi, Marathi, Tamil, Telugu, or Bengali (e.g. "Bhaiya 200 kilo tamba hai Andheri se"). Agent 04 parses speech into structured JSON listings in under 2 seconds, while Agent 01 grades material purity from camera photos.',
    },
    {
      'cat': 'AI Vision & Grading',
      'q': 'How does Agent 01\'s Optical Quality Vision grade scrap purity?',
      'a': 'Agent 01 runs multi-modal semantic segmentation analyzing pixel contouring, surface oxidation patina, PVC label contamination, and material thickness. It assigns ISO 9001 quality grades (Grade A >95% purity, Grade B 85-95%, Grade C 70-85%, Grade D <70% reject) with visual heatmaps in <2.0s.',
    },
    {
      'cat': 'Carbon Math & EPA',
      'q': 'How are carbon credits calculated and why is there zero hallucination?',
      'a': 'Agent 02 uses deterministic EPA WARM (Waste Reduction Model) life-cycle emissions factors: Secondary Aluminum 6063 = 9.13 kg CO₂e/kg, Copper Wire = 2.81 kg CO₂e/kg, PET Flakes = 1.48 kg CO₂e/kg, HDPE Granules = 1.22 kg CO₂e/kg, and Steel HMS = 1.67 kg CO₂e/kg. These are mathematical calculations, not LLM predictions, making them 100% auditable.',
    },
    {
      'cat': 'Blockchain & Web3',
      'q': 'Why Polygon Amoy and how do smart contracts operate?',
      'a': 'Polygon Amoy (Chain ID 80002) offers sub-cent gas fees (<₹0.01/tx), 2-second block finality, 99.95% lower energy consumption, and EVM compatibility. ScrapTransfer.sol records material provenance, EPRCertificate.sol mints statutory compliance tokens, CarbonCredit.sol tokenizes Scope 3 GHG offsets, and FraudGuard.sol blocks double-claiming.',
    },
    {
      'cat': 'CPCB & EPR Compliance',
      'q': 'What statutory penalties does Agent 06 help corporations avoid?',
      'a': 'Under MoEFCC PWM Rules 2026, PIBOs (Producers, Importers & Brand Owners) face strict CPCB penalties for non-compliance: ₹15,000/MT for rigid plastics, ₹25,000/MT for multi-layered plastics and non-ferrous metals, and ₹35,000/MT for e-waste. Agent 06 automates quarterly filings and audit-ready digital certificates with QR codes.',
    },
    {
      'cat': 'Fraud Prevention',
      'q': 'What fraud patterns does Agent 05 Cryptographic Radar detect?',
      'a': 'Agent 05 blocks wash-trading (circular trades between colluding wallets within 30 days), double-claiming (re-submitting identical visual or weighbridge hashes), mass inflation (discrepancy between visual volume and declared weight >20%), and velocity anomalies.',
    },
    {
      'cat': 'Pricing & Logistics',
      'q': 'How does Agent 03 fetch MCX prices and optimize transport routes?',
      'a': 'Agent 03 continuously polls Multi Commodity Exchange (MCX) spot rates and applies secondary discount curves (e.g. Alum 6063 at 82% of primary MCX). It calculates Haversine transit distances to minimize transport carbon (0.12 kg CO₂e/ton-km).',
    },
    {
      'cat': 'Offline & Low Tech',
      'q': 'Does the app work in areas with poor internet connectivity?',
      'a': 'Yes. Local on-device classification caches material recognition models, while offline queues sync listings and transactions once connectivity is restored. Voice recordings are stored locally and transcribed with fallback SMS integration.',
    },
    {
      'cat': 'Enterprise Integration',
      'q': 'Can enterprises connect CircularChain with ERP systems (SAP/Oracle)?',
      'a': 'Yes. CircularChain exposes REST APIs and Webhooks for automated ingestion into SAP MM/EHS, Oracle SCM, Microsoft Dynamics, and ESG reporting platforms (GRI 301/305/306, TCFD, BRSR Core).',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _userState.isDarkMode;
    final bg = AppTheme.getBackground(isDark);
    final textMain = AppTheme.getTextMain(isDark);
    final textMuted = AppTheme.getTextMuted(isDark);
    final border = AppTheme.getBorder(isDark);

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: bg,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'FIELD GUIDE & WHITEPAPER',
              style: AppTheme.fontSans(
                fontSize: 14,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                color: textMain,
              ),
            ),
            Text(
              'ARCHITECTURAL BLUEPRINT v2.4',
              style: AppTheme.fontMono(
                fontSize: 9,
                color: AppTheme.emerald,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: AppTheme.emerald,
          unselectedLabelColor: textMuted,
          indicatorColor: AppTheme.emerald,
          indicatorWeight: 3,
          labelStyle: AppTheme.fontSans(fontSize: 11.5, fontWeight: FontWeight.w700),
          unselectedLabelStyle: AppTheme.fontSans(fontSize: 11.5, fontWeight: FontWeight.w500),
          tabs: const [
            Tab(text: '6-Agent Core'),
            Tab(text: 'EPA & CPCB Math'),
            Tab(text: 'Smart Contracts'),
            Tab(text: 'FAQ Accordion'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildAgentsTab(isDark, textMain, textMuted, border),
          _buildMathTab(isDark, textMain, textMuted, border),
          _buildContractsTab(isDark, textMain, textMuted, border),
          _buildFaqTab(isDark, textMain, textMuted, border),
        ],
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // TAB 1: 6-AGENT AUTONOMOUS CORE
  // ---------------------------------------------------------------------------
  Widget _buildAgentsTab(bool isDark, Color textMain, Color textMuted, Color border) {
    final agents = [
      {
        'id': 'AGENT 01',
        'name': 'Optical Quality Vision',
        'badge': 'AI Computer Vision',
        'color': AppTheme.emerald,
        'icon': Icons.remove_red_eye,
        'desc': 'Multi-modal semantic segmentation detecting surface oxidation, PVC label impurities, and assigning ISO 9001 quality grades.',
        'metrics': ['Pixel Contouring: 97.4%', 'Inference: 1.8s', 'ISO 9001 Grade A-D'],
      },
      {
        'id': 'AGENT 02',
        'name': 'EPA WARM Carbon Math',
        'badge': 'Deterministic LCA',
        'color': AppTheme.teal,
        'icon': Icons.scale,
        'desc': 'Deterministic life-cycle carbon math (9.13 kg CO₂e for Alum, 2.81 for Copper) with zero generative AI hallucination.',
        'metrics': ['Alum Factor: 9.13', 'Copper: 2.81', 'Hallucination: 0.0%'],
      },
      {
        'id': 'AGENT 03',
        'name': 'MCX & Logistics Oracle',
        'badge': 'Price & Route Oracle',
        'color': AppTheme.orange,
        'icon': Icons.trending_up,
        'desc': 'Continuous Multi Commodity Exchange spot price discovery paired with Haversine transport carbon optimization.',
        'metrics': ['MCX Spot Live', 'Haversine Transit', 'Optimal Hub Match'],
      },
      {
        'id': 'AGENT 04',
        'name': 'Indic Voice NLP Bridge',
        'badge': 'Speech-to-JSON',
        'color': AppTheme.amber,
        'icon': Icons.mic,
        'desc': 'Multi-lingual ASR recognizing colloquial Hindi, Marathi, Tamil, Telugu, and Bengali into structured listings.',
        'metrics': ['5 Languages', 'Zero Literacy Req', 'Mandi Dialect Filter'],
      },
      {
        'id': 'AGENT 05',
        'name': 'Cryptographic Fraud Radar',
        'badge': 'Anti-Sybil Sentinel',
        'color': AppTheme.red,
        'icon': Icons.security,
        'desc': 'Pre-execution wash-trading detection, visual fingerprint double-claim blocker, and anomalous mass inflation audits.',
        'metrics': ['Wash-Trade Blocker', 'Double-Claim Reject', 'Mass Verification'],
      },
      {
        'id': 'AGENT 06',
        'name': 'CPCB Statutory EPR Shield',
        'badge': 'Regulatory Compliance',
        'color': AppTheme.purple,
        'icon': Icons.account_balance,
        'desc': 'Automated MoEFCC PWM Rules 2026 quota fulfillment, digital certificate generation, and avoided penalty calculators.',
        'metrics': ['PWM Rules 2026', '₹25k/MT Penalty Shield', 'QR Audit Seal'],
      },
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Notebook Header Note
        _buildWashiHeader('6-AGENT AUTONOMOUS CORE TOPOLOGY', 'Decentralized Multi-Agent AI System', isDark, AppTheme.emerald),
        const SizedBox(height: 14),

        ...agents.map((ag) {
          final color = ag['color'] as Color;
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.getSurfaceRaised(isDark),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: color.withOpacity(0.18),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(ag['icon'] as IconData, color: color, size: 16),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          ag['id'] as String,
                          style: AppTheme.fontMono(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: color,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: color.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: color.withOpacity(0.3)),
                      ),
                      child: Text(
                        ag['badge'] as String,
                        style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.bold, color: color),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  ag['name'] as String,
                  style: AppTheme.fontSans(fontSize: 14, fontWeight: FontWeight.w800, color: textMain),
                ),
                const SizedBox(height: 4),
                Text(
                  ag['desc'] as String,
                  style: AppTheme.fontSans(fontSize: 11, color: textMuted, height: 1.4),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: (ag['metrics'] as List<String>).map((m) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2.5),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1E2433) : const Color(0xFFEBE5DC),
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Text(
                        m,
                        style: AppTheme.fontMono(fontSize: 9, color: textMain, fontWeight: FontWeight.w600),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }

  // ---------------------------------------------------------------------------
  // TAB 2: MATHEMATICAL MODELS & EPA WARM / CPCB TABLES
  // ---------------------------------------------------------------------------
  Widget _buildMathTab(bool isDark, Color textMain, Color textMuted, Color border) {
    final factors = [
      {'mat': 'Secondary Aluminum 6063', 'factor': '9.13 kg CO₂e', 'mcx': '₹242.5/kg', 'cpcb': '70% Target', 'penalty': '₹25,000/MT'},
      {'mat': 'Berry Copper Scrap', 'factor': '2.81 kg CO₂e', 'mcx': '₹875.0/kg', 'cpcb': '80% Target', 'penalty': '₹35,000/MT'},
      {'mat': 'Hot-Washed PET Flakes', 'factor': '1.48 kg CO₂e', 'mcx': '₹78.0/kg', 'cpcb': '60% Target', 'penalty': '₹15,000/MT'},
      {'mat': 'Rigid HDPE Granules', 'factor': '1.22 kg CO₂e', 'mcx': '₹94.0/kg', 'cpcb': '60% Target', 'penalty': '₹15,000/MT'},
      {'mat': 'Heavy Melting Steel (HMS 1/2)', 'factor': '1.67 kg CO₂e', 'mcx': '₹46.5/kg', 'cpcb': '75% Target', 'penalty': '₹18,000/MT'},
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildWashiHeader('DETERMINISTIC CARBON & STATUTORY FORMULAS', 'EPA WARM & MoEFCC PWM Rules 2026', isDark, AppTheme.teal),
        const SizedBox(height: 14),

        // Formula 1: Carbon Math
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.getSurfaceRaised(isDark),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('EPA WARM Scope 3 Avoided Emissions Formula', style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.bold, color: textMain)),
              const SizedBox(height: 6),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF090A0F) : const Color(0xFFF3EFEA),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppTheme.teal.withOpacity(0.3)),
                ),
                child: Text(
                  'Scope 3 GHG Avoided (tCO₂e) = [ Mass(MT) × EPA_Factor ] - [ Transport_Dist(km) × 0.12 kg/ton-km ]',
                  style: AppTheme.fontMono(fontSize: 10, color: AppTheme.teal, fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),

        // Formula 2: CPCB Penalty
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.getSurfaceRaised(isDark),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('CPCB Environmental Compensation Liability Formula', style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.bold, color: textMain)),
              const SizedBox(height: 6),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF090A0F) : const Color(0xFFF3EFEA),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppTheme.orange.withOpacity(0.3)),
                ),
                child: Text(
                  'Liability (INR) = [ Declared_Consumption(MT) × Mandated_Target% - Recycled_Volume(MT) ] × Penalty_Rate',
                  style: AppTheme.fontMono(fontSize: 10, color: AppTheme.orange, fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Material Factors Table
        Text(
          'MATERIAL EMISSIONS & PENALTY COEFFICIENT TABLE',
          style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
        ),
        const SizedBox(height: 8),

        ...factors.map((f) {
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppTheme.getSurfaceRaised(isDark),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        f['mat']!,
                        style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.w800, color: textMain),
                      ),
                    ),
                    Text(
                      f['factor']!,
                      style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.w900, color: AppTheme.emerald),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('MCX: ${f['mcx']}', style: AppTheme.fontMono(fontSize: 10, color: AppTheme.orange, fontWeight: FontWeight.bold)),
                    Text('Target: ${f['cpcb']}', style: AppTheme.fontMono(fontSize: 10, color: textMuted)),
                    Text('Penalty: ${f['penalty']}', style: AppTheme.fontMono(fontSize: 10, color: AppTheme.red, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }

  // ---------------------------------------------------------------------------
  // TAB 3: SMART CONTRACTS
  // ---------------------------------------------------------------------------
  Widget _buildContractsTab(bool isDark, Color textMain, Color textMuted, Color border) {
    final contracts = [
      {
        'name': 'ScrapTransfer.sol',
        'address': '0x8A14f8615A6305aD0B3459c0C1e59273f5546e55',
        'desc': 'Core asset provenance, visual quality hashes, and bilateral multi-sig escrow settlement.',
        'role': 'Asset Ownership & Ledger',
      },
      {
        'name': 'EPRCertificate.sol',
        'address': '0x992B19F23E4D4665421A938C2652B5aE10255c27',
        'desc': 'MoEFCC PWM Rules 2026 digital certificate minting with CPCB QR verification links.',
        'role': 'Statutory Quotas',
      },
      {
        'name': 'CarbonCredit.sol',
        'address': '0x1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D',
        'desc': 'Deterministic EPA WARM tokenization minting verifiable Scope 3 GHG carbon offset tokens.',
        'role': 'Scope 3 Carbon Mint',
      },
      {
        'name': 'FraudGuard.sol',
        'address': '0x7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F',
        'desc': 'Pre-execution anti-wash trading radar and visual hash collision rejector.',
        'role': 'Anti-Sybil Sentinel',
      },
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildWashiHeader('POLYGON AMOY SMART CONTRACT TOPOLOGY', 'EVM Chain ID: 80002 · Solidity 0.8.24', isDark, AppTheme.purple),
        const SizedBox(height: 14),

        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.getSurfaceRaised(isDark),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: border),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.purple.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.hub, color: AppTheme.purple, size: 20),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Network: Polygon Amoy Testnet', style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain)),
                    Text('RPC: https://rpc-amoy.polygon.technology', style: AppTheme.fontMono(fontSize: 9.5, color: textMuted)),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        ...contracts.map((c) {
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.getSurfaceRaised(isDark),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      c['name']!,
                      style: AppTheme.fontMono(fontSize: 13, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.purple.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        c['role']!,
                        style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.bold, color: AppTheme.purple),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  c['desc']!,
                  style: AppTheme.fontSans(fontSize: 11, color: textMuted, height: 1.3),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF090A0F) : const Color(0xFFF3EFEA),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.code, size: 12, color: AppTheme.orange),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          c['address']!,
                          style: AppTheme.fontMono(fontSize: 9.5, color: textMain),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }

  // ---------------------------------------------------------------------------
  // TAB 4: INTERACTIVE FAQ ACCORDION
  // ---------------------------------------------------------------------------
  Widget _buildFaqTab(bool isDark, Color textMain, Color textMuted, Color border) {
    final filteredFaqs = _faqs.where((f) {
      if (_faqSearch.isEmpty) return true;
      final q = f['q']!.toLowerCase();
      final a = f['a']!.toLowerCase();
      final cat = f['cat']!.toLowerCase();
      final s = _faqSearch.toLowerCase();
      return q.contains(s) || a.contains(s) || cat.contains(s);
    }).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildWashiHeader('FREQUENTLY ASKED QUESTIONS', '10 Comprehensive In-App Architectural Q&As', isDark, AppTheme.orange),
        const SizedBox(height: 12),

        // Search Bar
        TextField(
          onChanged: (val) => setState(() => _faqSearch = val),
          style: AppTheme.fontSans(color: textMain, fontSize: 12),
          decoration: InputDecoration(
            hintText: 'Search questions, agents, CPCB laws, carbon...',
            hintStyle: AppTheme.fontSans(color: textMuted, fontSize: 11),
            prefixIcon: Icon(Icons.search, color: textMuted, size: 18),
            filled: true,
            fillColor: AppTheme.getSurfaceRaised(isDark),
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppTheme.emerald, width: 1.5),
            ),
          ),
        ),
        const SizedBox(height: 14),

        ...List.generate(filteredFaqs.length, (idx) {
          final f = filteredFaqs[idx];
          final isExpanded = _expandedFaqIndex == idx;

          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            decoration: BoxDecoration(
              color: isExpanded
                  ? (isDark ? const Color(0xFF131924) : Colors.white)
                  : AppTheme.getSurfaceRaised(isDark),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: isExpanded ? AppTheme.emerald : border,
                width: isExpanded ? 1.5 : 1,
              ),
            ),
            child: Theme(
              data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
              child: ExpansionTile(
                initiallyExpanded: isExpanded,
                onExpansionChanged: (exp) {
                  setState(() => _expandedFaqIndex = exp ? idx : null);
                },
                leading: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: isExpanded
                        ? AppTheme.emerald.withOpacity(0.2)
                        : AppTheme.orange.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    Icons.help_outline,
                    color: isExpanded ? AppTheme.emerald : AppTheme.orange,
                    size: 16,
                  ),
                ),
                title: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      f['cat']!.toUpperCase(),
                      style: AppTheme.fontMono(
                        fontSize: 8.5,
                        fontWeight: FontWeight.bold,
                        color: isExpanded ? AppTheme.emerald : textMuted,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      f['q']!,
                      style: AppTheme.fontSans(
                        fontSize: 12.5,
                        fontWeight: FontWeight.bold,
                        color: textMain,
                      ),
                    ),
                  ],
                ),
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
                    child: Text(
                      f['a']!,
                      style: AppTheme.fontSans(
                        fontSize: 11.5,
                        color: textMuted,
                        height: 1.5,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildWashiHeader(String title, String subtitle, bool isDark, Color accent) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF131824) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: accent.withOpacity(0.35), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: accent.withOpacity(0.08),
            blurRadius: 15,
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: accent.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(Icons.menu_book, color: accent, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.w900, color: AppTheme.getTextMain(isDark), letterSpacing: 0.5),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: AppTheme.fontMono(fontSize: 9.5, color: accent, fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
