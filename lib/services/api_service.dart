import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://localhost:3000";

  static Future<Map<String, dynamic>?> reportDisaster({
    required String disasterType,
    required String description,
    required int peopleAffected,
    required double latitude,
    required double longitude,
  }) async {
    final url = Uri.parse("$baseUrl/sos");

    final response = await http.post(
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "message": "$disasterType: $description",
        "location": "$latitude,$longitude",
        "peopleAffected": peopleAffected,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return null;
    }
  }
}


