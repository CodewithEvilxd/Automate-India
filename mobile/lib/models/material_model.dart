class MaterialItem {
  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final String? ipfsHash;
  final String category;
  final double estimatedWeightKg;
  final double co2SavedKg;
  final String condition;
  final String location;
  final String ownerWallet;
  final String? ownerName;
  final String status;
  final DateTime createdAt;
  final double purityPercentage;
  final String contaminationType;
  final double contaminationPercentage;
  final String recyclabilityGrade;
  final String moistureLevel;
  final int? estimatedLotValueInr;
  final double? unitPriceInrPerKg;
  final List<dynamic>? transactions;

  // Convenience Getters
  double get weightKg => estimatedWeightKg;
  String get verificationStatus => status;
  Map<String, dynamic> get aiAnalysis => {
    'purity_percentage': purityPercentage,
    'contamination_percentage': contaminationPercentage,
    'contamination_type': contaminationType,
    'recyclability_grade': recyclabilityGrade,
    'moisture_level': moistureLevel,
  };

  MaterialItem({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    this.ipfsHash,
    required this.category,
    required this.estimatedWeightKg,
    required this.co2SavedKg,
    required this.condition,
    required this.location,
    required this.ownerWallet,
    this.ownerName,
    required this.status,
    required this.createdAt,
    this.purityPercentage = 97.4,
    this.contaminationType = "Minor surface dust and oxidation",
    this.contaminationPercentage = 2.6,
    this.recyclabilityGrade = "Grade A+ (Remelt Quality)",
    this.moistureLevel = "Low (<1%)",
    this.estimatedLotValueInr,
    this.unitPriceInrPerKg,
    this.transactions,
  });

  factory MaterialItem.fromJson(Map<String, dynamic> json) {
    final cat = (json['category'] ?? 'aluminum').toString().toLowerCase();
    final weight = (json['estimated_weight_kg'] as num?)?.toDouble() ?? 100.0;
    
    // MCX Price Index lookup
    final Map<String, double> priceMap = {
      'aluminum': 215.0,
      'steel': 42.5,
      'copper': 760.0,
      'plastic_pet': 48.0,
      'plastic_hdpe': 58.0,
      'plastic_pp': 52.0,
      'paper': 14.5,
      'glass': 3.8,
      'electronic': 340.0,
      'textile': 22.0,
      'mixed': 18.0,
    };
    final unitPrice = priceMap[cat] ?? 25.0;
    final estimatedValue = (unitPrice * weight).round();

    return MaterialItem(
      id: json['id']?.toString() ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['image_url'] ?? '',
      ipfsHash: json['ipfs_hash'],
      category: json['category'] ?? 'aluminum',
      estimatedWeightKg: weight,
      co2SavedKg: (json['co2_saved_kg'] as num?)?.toDouble() ?? 0.0,
      condition: json['condition'] ?? 'Good',
      location: json['location'] ?? 'Noida, UP',
      ownerWallet: json['owner_wallet'] ?? '',
      ownerName: json['owner_name'],
      status: json['status'] ?? 'listed',
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'].toString()) ?? DateTime.now()
          : DateTime.now(),
      purityPercentage: (json['purity_percentage'] as num?)?.toDouble() ?? 97.4,
      contaminationType: json['contamination_type'] ?? "Minor surface dust and light oxidation",
      contaminationPercentage: (json['contamination_percentage'] as num?)?.toDouble() ?? 2.6,
      recyclabilityGrade: json['recyclability_grade'] ?? "Grade A+ (Remelt Quality)",
      moistureLevel: json['moisture_level'] ?? "Low (<1%)",
      estimatedLotValueInr: json['estimated_lot_value_inr'] ?? estimatedValue,
      unitPriceInrPerKg: (json['unit_price_inr_per_kg'] as num?)?.toDouble() ?? unitPrice,
      transactions: json['transactions'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'image_url': imageUrl,
      'ipfs_hash': ipfsHash,
      'category': category,
      'estimated_weight_kg': estimatedWeightKg,
      'co2_saved_kg': co2SavedKg,
      'condition': condition,
      'location': location,
      'owner_wallet': ownerWallet,
      'owner_name': ownerName,
      'status': status,
      'created_at': createdAt.toIso8601String(),
      'purity_percentage': purityPercentage,
      'contamination_type': contaminationType,
      'contamination_percentage': contaminationPercentage,
      'recyclability_grade': recyclabilityGrade,
      'moisture_level': moistureLevel,
      'estimated_lot_value_inr': estimatedLotValueInr,
      'unit_price_inr_per_kg': unitPriceInrPerKg,
      'transactions': transactions,
    };
  }
}

class OrganizationItem {
  final String walletAddress;
  final String orgName;
  final String location;
  final int reputationScore;
  final double totalCo2AbatedKg;
  final double totalMassRecycledKg;
  final int totalLotsListed;
  final int completedTransfers;
  final bool isTrustedPartner;
  final String eprRegistrationNo;
  final List<String> verifiedCategories;

  // Convenience Getters
  String get name => orgName;
  String get type => isTrustedPartner ? 'Certified Recycler' : 'Registered Aggregator';
  double get complianceScore => reputationScore.toDouble();
  double get totalRecycledKg => totalMassRecycledKg;
  double get totalCO2SavedKg => totalCo2AbatedKg;
  String get state => location;

  OrganizationItem({
    required this.walletAddress,
    required this.orgName,
    required this.location,
    required this.reputationScore,
    required this.totalCo2AbatedKg,
    required this.totalMassRecycledKg,
    required this.totalLotsListed,
    required this.completedTransfers,
    required this.isTrustedPartner,
    required this.eprRegistrationNo,
    required this.verifiedCategories,
  });

  factory OrganizationItem.fromJson(Map<String, dynamic> json) {
    return OrganizationItem(
      walletAddress: json['wallet_address'] ?? '',
      orgName: json['org_name'] ?? '',
      location: json['location'] ?? '',
      reputationScore: (json['reputation_score'] as num?)?.toInt() ?? 80,
      totalCo2AbatedKg: (json['total_co2_abated_kg'] as num?)?.toDouble() ?? 0.0,
      totalMassRecycledKg: (json['total_mass_recycled_kg'] as num?)?.toDouble() ?? 0.0,
      totalLotsListed: (json['total_lots_listed'] as num?)?.toInt() ?? 0,
      completedTransfers: (json['completed_transfers'] as num?)?.toInt() ?? 0,
      isTrustedPartner: json['is_trusted_partner'] ?? false,
      eprRegistrationNo: json['epr_registration_no'] ?? '',
      verifiedCategories: List<String>.from(json['verified_categories'] ?? []),
    );
  }
}
