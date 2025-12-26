import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://localhost:3000";

  static Future<Map<String, dynamic>?> reportDisaster({
    required String message,
    required String location,
    required int peopleAffected,
  }) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/sos"),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "message": message,
          "location": location,
          "peopleAffected": peopleAffected,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print("API Error: $e");
    }

    return null;
  }
}



