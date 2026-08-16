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
  final List<dynamic>? transactions;

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
    this.transactions,
  });

  factory MaterialItem.fromJson(Map<String, dynamic> json) {
    return MaterialItem(
      id: json['id']?.toString() ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['image_url'] ?? '',
      ipfsHash: json['ipfs_hash'],
      category: json['category'] ?? 'mixed',
      estimatedWeightKg: (json['estimated_weight_kg'] as num?)?.toDouble() ?? 0.0,
      co2SavedKg: (json['co2_saved_kg'] as num?)?.toDouble() ?? 0.0,
      condition: json['condition'] ?? 'Recyclable',
      location: json['location'] ?? 'Noida, UP',
      ownerWallet: json['owner_wallet'] ?? '',
      ownerName: json['owner_name'],
      status: json['status'] ?? 'listed',
      createdAt: json['created_at'] != null 
          ? DateTime.tryParse(json['created_at'].toString()) ?? DateTime.now()
          : DateTime.now(),
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
      'status': status,
    };
  }
}
