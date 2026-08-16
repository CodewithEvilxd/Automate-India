import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/material_model.dart';

class ApiService {
  // Configurable base URL: Android emulator (10.0.2.2), iOS/Web (localhost)
  static const String baseUrl = "http://10.0.2.2:3000/api";

  // 1. Fetch All Materials
  Future<List<MaterialItem>> getMaterials() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/materials'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => MaterialItem.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      print("Error fetching materials: $e");
      return [];
    }
  }

  // 2. Fetch Single Material by ID
  Future<MaterialItem?> getMaterialById(String id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/materials/$id'));
      if (response.statusCode == 200) {
        return MaterialItem.fromJson(json.decode(response.body));
      }
      return null;
    } catch (e) {
      print("Error fetching material $id: $e");
      return null;
    }
  }

  // 3. AI Camera Image Analysis (Agent 1)
  Future<Map<String, dynamic>> analyzeImageBase64(String base64Image) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/analyze'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'image': 'data:image/jpeg;base64,$base64Image'}),
      );
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
      throw Exception('Failed AI classification: ${response.body}');
    } catch (e) {
      print("Error analyzing image: $e");
      rethrow;
    }
  }

  // 4. Verify and Transfer (Agent 2 + Blockchain Signer + Agent 4 Certificate)
  Future<Map<String, dynamic>> verifyAndTransfer(String materialId, String buyerWallet) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/verify-transfer'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'materialId': materialId,
          'buyerWallet': buyerWallet,
        }),
      );
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
      throw Exception('Transfer verification failed: ${response.body}');
    } catch (e) {
      print("Error verifying transfer: $e");
      rethrow;
    }
  }
}
